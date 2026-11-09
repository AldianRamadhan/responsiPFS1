import { useEffect, useMemo, useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import StatsCards from './components/StatsCards';
import MahasiswaTable from './components/MahasiswaTable';
import FormModal from './components/FormModal';
import ConfirmDialog from './components/ConfirmDialog';
import { initialMahasiswa, PROGRAM_STUDI_LIST } from './data/initialData';
import { filterMahasiswa, computeStats } from './utils/mahasiswaUtils';

const STORAGE_KEY = 'dashboard-mahasiswa-v2';

function loadInitialData() {
  const fallbackData = initialMahasiswa;

  try {
    localStorage.removeItem('dashboard-mahasiswa-v1');

    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return fallbackData;

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fallbackData));
      return fallbackData;
    }

    const isValidData = parsed.every(
      (item) =>
        item &&
        typeof item === 'object' &&
        typeof item.nim === 'string' &&
        typeof item.nama === 'string' &&
        typeof item.prodi === 'string' &&
        PROGRAM_STUDI_LIST.includes(item.prodi)
    );

    if (!isValidData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fallbackData));
      return fallbackData;
    }

    return parsed;
  } catch (error) {
    console.warn('Gagal membaca localStorage:', error);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fallbackData));
    return fallbackData;
  }
}

function App() {
  const [mahasiswa, setMahasiswa] = useState(loadInitialData);
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formState, setFormState] = useState({ open: false, data: null });
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mahasiswa));
  }, [mahasiswa]);

  const filteredData = useMemo(() => filterMahasiswa(mahasiswa, search), [mahasiswa, search]);
  const stats = useMemo(() => computeStats(mahasiswa), [mahasiswa]);

  const openAddForm = () => setFormState({ open: true, data: null });
  const openEditForm = (item) => setFormState({ open: true, data: item });
  const closeForm = () => setFormState({ open: false, data: null });

  const handleSave = (formData) => {
    if (formData.id) {
      setMahasiswa((prev) => prev.map((m) => (m.id === formData.id ? formData : m)));
    } else {
      setMahasiswa((prev) => [...prev, { ...formData, id: Date.now() }]);
    }
    closeForm();
  };

  const handleDelete = () => {
    setMahasiswa((prev) => prev.filter((m) => m.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="app-layout">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="main-content">
        <Navbar
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          totalData={mahasiswa.length}
        />

        <main className="content-area container-fluid">
          <StatsCards stats={stats} />

          <MahasiswaTable
            data={filteredData}
            totalAll={mahasiswa.length}
            search={search}
            onSearchChange={setSearch}
            onAdd={openAddForm}
            onEdit={openEditForm}
            onDelete={setDeleteTarget}
          />
        </main>
      </div>

      {formState.open && (
        <FormModal
          initialData={formState.data}
          existingData={mahasiswa}
          onSave={handleSave}
          onClose={closeForm}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Hapus Data Mahasiswa?"
          message={`Data ${deleteTarget.nama} (${deleteTarget.nim}) akan dihapus secara permanen.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}

export default App;
