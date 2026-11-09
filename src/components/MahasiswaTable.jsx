import { useEffect, useRef } from 'react';
import $ from 'jquery';

function MahasiswaTable({
  data,
  totalAll,
  search,
  onSearchChange,
  onAdd,
  onEdit,
  onDelete,
}) {
  const tableWrapRef = useRef(null);

  useEffect(() => {
    $(tableWrapRef.current).stop(true, true).fadeTo(150, 0.4).fadeTo(200, 1);
  }, [search, data.length]);

  return (
    <section className="card border-0 shadow-sm rounded-4 mt-4">
      <div className="card-header bg-white border-0 pt-4 px-3 px-md-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <h2 className="h5 fw-bold mb-1">Daftar Mahasiswa</h2>
            <p className="text-muted small mb-0">
              Menampilkan {data.length} dari {totalAll} data
            </p>
          </div>
          <button type="button" className="btn btn-primary rounded-pill px-4" onClick={onAdd}>
            + Tambah Mahasiswa
          </button>
        </div>

        <div className="mt-3 mb-3">
          <input
            type="search"
            className="form-control rounded-pill"
            placeholder="Cari berdasarkan NIM, nama, atau program studi..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Cari mahasiswa"
          />
        </div>
      </div>

      <div className="card-body px-0 pb-0">
        <div ref={tableWrapRef} className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th scope="col">No</th>
                <th scope="col">NIM</th>
                <th scope="col">Nama Mahasiswa</th>
                <th scope="col" className="d-none d-md-table-cell">Program Studi</th>
                <th scope="col" className="text-center">IPK</th>
                <th scope="col" className="text-center">Status</th>
                <th scope="col" className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-5">
                    Data tidak ditemukan
                  </td>
                </tr>
              ) : (
                data.map((m, index) => (
                  <tr key={m.id}>
                    <td>{index + 1}</td>
                    <td>{m.nim}</td>
                    <td className="fw-semibold">{m.nama}</td>
                    <td className="d-none d-md-table-cell">{m.prodi}</td>
                    <td className="text-center">{Number(m.ipk).toFixed(2)}</td>
                    <td className="text-center">
                      <span
                        className={`badge rounded-pill ${
                          m.status === 'Aktif'
                            ? 'bg-success-subtle text-success-emphasis'
                            : 'bg-secondary-subtle text-secondary-emphasis'
                        }`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="text-center text-nowrap">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary me-1"
                        onClick={() => onEdit(m)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onDelete(m)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default MahasiswaTable;
