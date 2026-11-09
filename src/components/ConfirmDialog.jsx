import ModalBase from './ModalBase';

function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <ModalBase onClose={onCancel}>
      <h3 className="h5 fw-bold text-danger mb-2">{title}</h3>
      <p className="text-muted mb-0">{message}</p>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <button type="button" className="btn btn-light" onClick={onCancel}>
          Batal
        </button>
        <button type="button" className="btn btn-danger" onClick={onConfirm}>
          Ya, Hapus
        </button>
      </div>
    </ModalBase>
  );
}

export default ConfirmDialog;
