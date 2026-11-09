const CARD_VARIANTS = {
  primary: 'text-primary',
  success: 'text-success',
  secondary: 'text-secondary',
  warning: 'text-warning',
};

function StatsCards({ stats }) {
  const cards = [
    { label: 'Total Mahasiswa', value: stats.total, variant: 'primary' },
    { label: 'Mahasiswa Aktif', value: stats.aktif, variant: 'success' },
    { label: 'Non-Aktif', value: stats.nonAktif, variant: 'secondary' },
    { label: 'Rata-rata IPK', value: stats.avgIpk, variant: 'warning' },
  ];

  return (
    <section className="row g-3 g-md-4" aria-label="Statistik ringkas">
      {cards.map((card) => (
        <div key={card.label} className="col-6 col-xl-3">
          <div className="card stat-card border-0 shadow-sm rounded-4 h-100">
            <div className="card-body p-3 p-md-4">
              <p className="text-muted small mb-1">{card.label}</p>
              <h2 className={`h3 fw-bold mb-0 ${CARD_VARIANTS[card.variant]}`}>
                {card.value}
              </h2>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default StatsCards;
