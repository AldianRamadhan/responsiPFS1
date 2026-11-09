function Navbar({ onToggleSidebar, totalData }) {
  return (
    <header className="navbar-custom sticky-top shadow-sm">
      <div className="container-fluid d-flex align-items-center justify-content-between py-3 px-3 px-md-4">
        <div className="d-flex align-items-center gap-3">
          <button
            type="button"
            className="btn btn-outline-secondary d-lg-none"
            onClick={onToggleSidebar}
            aria-label="Buka menu"
          >
            ☰
          </button>
          <div>
            <h1 className="h5 fw-bold mb-0">Dashboard Akademik</h1>
            <small className="text-muted d-none d-sm-block">Kelola data mahasiswa</small>
          </div>
        </div>

        <span className="badge bg-primary rounded-pill px-3 py-2">
          Total: {totalData}
        </span>
      </div>
    </header>
  );
}

export default Navbar;
