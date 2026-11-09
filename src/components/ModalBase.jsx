import { useEffect, useRef } from 'react';
import $ from 'jquery';

function ModalBase({ children, onClose }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    $(overlayRef.current).hide().fadeIn(200);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-box">{children}</div>
    </div>
  );
}

export default ModalBase;
