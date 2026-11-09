import { useEffect, useRef } from 'react';
import $ from 'jquery';

const MENU_ITEMS = [
  { label: 'Dashboard', active: false },
  { label: 'Data Mahasiswa', active: true },
  { label: 'Program Studi', active: false },
  { label: 'Laporan IPK', active: false },
  { label: 'Pengaturan', active: false },
];

function Sidebar({ open, onClose }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    const $overlay = $(overlayRef.current);
    if (open) {
      $overlay.stop(true).fadeIn(200);
    } else {
      $overlay.stop(true).fadeOut(200);
    }
  }, [open]);

  return (
    <>
      <div ref={overlayRef} className="sidebar-overlay" onClick={onClose} />

      <aside className={`sidebar ${open ? 'open' : ''}`} aria-label="Menu navigasi">
        <div className="sidebar-brand mb-4">
          <h2 className="h5 fw-bold text-white mb-0">🎓 AkademikKu</h2>
          <small className="text-white-50">Admin Panel</small>
        </div>

        <nav>
          <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
            {MENU_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href="#"
                  className={`sidebar-link ${item.active ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
