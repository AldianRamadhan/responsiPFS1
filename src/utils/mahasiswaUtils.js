import { PROGRAM_STUDI_LIST, STATUS_OPTIONS } from '../data/initialData';

export function filterMahasiswa(data, keyword) {
  const query = keyword.trim().toLowerCase();
  if (!query) return data;

  return data.filter(
    (m) =>
      m.nim.toLowerCase().includes(query) ||
      m.nama.toLowerCase().includes(query) ||
      m.prodi.toLowerCase().includes(query)
  );
}

export function computeStats(data) {
  const total = data.length;
  const aktif = data.filter((m) => m.status === 'Aktif').length;
  const totalIpk = data.reduce((sum, m) => sum + Number(m.ipk), 0);
  const avgIpk = total > 0 ? (totalIpk / total).toFixed(2) : '0.00';

  return {
    total,
    aktif,
    nonAktif: total - aktif,
    avgIpk,
  };
}

export function validateMahasiswa(form, existingData, currentId) {
  const errors = {};
  const nim = form.nim.trim();
  const nama = form.nama.trim();
  const ipk = Number(form.ipk);

  if (!nim) {
    errors.nim = 'NIM wajib diisi';
  } else if (!/^\d{6,15}$/.test(nim)) {
    errors.nim = 'NIM harus berupa angka 6–15 digit';
  } else if (existingData.some((m) => m.nim === nim && m.id !== currentId)) {
    errors.nim = 'NIM sudah terdaftar';
  }

  if (!nama) {
    errors.nama = 'Nama wajib diisi';
  }

  if (!form.prodi) {
    errors.prodi = 'Pilih program studi';
  } else if (!PROGRAM_STUDI_LIST.includes(form.prodi)) {
    errors.prodi = 'Pilih program studi yang valid';
  }

  if (form.ipk === '' || Number.isNaN(ipk)) {
    errors.ipk = 'IPK wajib diisi';
  } else if (ipk < 0 || ipk > 4) {
    errors.ipk = 'IPK harus antara 0.00 – 4.00';
  }

  if (!STATUS_OPTIONS.includes(form.status)) {
    errors.status = 'Pilih status yang valid';
  }

  return errors;
}
