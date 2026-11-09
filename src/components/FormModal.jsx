import { useState } from 'react';
import ModalBase from './ModalBase';
import { PROGRAM_STUDI_LIST, STATUS_OPTIONS } from '../data/initialData';
import { validateMahasiswa } from '../utils/mahasiswaUtils';

const EMPTY_FORM = {
  nim: '',
  nama: '',
  prodi: PROGRAM_STUDI_LIST[0],
  ipk: '',
  status: 'Aktif',
};

function FormModal({ initialData, existingData, onSave, onClose }) {
  const isEdit = Boolean(initialData);

  const [form, setForm] = useState(
    isEdit ? { ...initialData, ipk: String(initialData.ipk) } : EMPTY_FORM
  );
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateMahasiswa(form, existingData, initialData?.id);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave({
      id: initialData?.id,
      nim: form.nim.trim(),
      nama: form.nama.trim(),
      prodi: form.prodi,
      ipk: Number(form.ipk),
      status: form.status,
    });
  };

  return (
    <ModalBase onClose={onClose}>
      <form onSubmit={handleSubmit} noValidate>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="h5 fw-bold mb-0">
            {isEdit ? 'Edit Data Mahasiswa' : 'Tambah Mahasiswa Baru'}
          </h3>
          <button
            type="button"
            className="btn-close"
            aria-label="Tutup"
            onClick={onClose}
          />
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="nim" className="form-label fw-semibold">NIM</label>
            <input
              id="nim"
              name="nim"
              type="text"
              className={`form-control ${errors.nim ? 'is-invalid' : ''}`}
              value={form.nim}
              onChange={handleChange}
              placeholder="Contoh: 2511501001"
            />
            <div className="invalid-feedback">{errors.nim}</div>
          </div>

          <div className="col-md-6">
            <label htmlFor="nama" className="form-label fw-semibold">Nama Mahasiswa</label>
            <input
              id="nama"
              name="nama"
              type="text"
              className={`form-control ${errors.nama ? 'is-invalid' : ''}`}
              value={form.nama}
              onChange={handleChange}
              placeholder="Nama lengkap"
            />
            <div className="invalid-feedback">{errors.nama}</div>
          </div>

          <div className="col-12">
            <label htmlFor="prodi" className="form-label fw-semibold">Program Studi</label>
            <select
              id="prodi"
              name="prodi"
              className={`form-select ${errors.prodi ? 'is-invalid' : ''}`}
              value={form.prodi}
              onChange={handleChange}
            >
              {PROGRAM_STUDI_LIST.map((prodi) => (
                <option key={prodi} value={prodi}>{prodi}</option>
              ))}
            </select>
            <div className="invalid-feedback">{errors.prodi}</div>
          </div>

          <div className="col-md-6">
            <label htmlFor="ipk" className="form-label fw-semibold">IPK</label>
            <input
              id="ipk"
              name="ipk"
              type="number"
              step="0.01"
              min="0"
              max="4"
              className={`form-control ${errors.ipk ? 'is-invalid' : ''}`}
              value={form.ipk}
              onChange={handleChange}
              placeholder="0.00 - 4.00"
            />
            <div className="invalid-feedback">{errors.ipk}</div>
          </div>

          <div className="col-md-6">
            <label htmlFor="status" className="form-label fw-semibold">Status</label>
            <select
              id="status"
              name="status"
              className={`form-select ${errors.status ? 'is-invalid' : ''}`}
              value={form.status}
              onChange={handleChange}
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <div className="invalid-feedback">{errors.status}</div>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 mt-4">
          <button type="button" className="btn btn-light" onClick={onClose}>
            Batal
          </button>
          <button type="submit" className="btn btn-primary px-4">
            {isEdit ? 'Simpan Perubahan' : 'Tambah Data'}
          </button>
        </div>
      </form>
    </ModalBase>
  );
}

export default FormModal;
