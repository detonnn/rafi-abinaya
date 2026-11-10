const LINKS = [['beranda', 'Beranda'], ['jadwal', 'Jadwal Mingguan'], ['tugas', 'Tugas']]
export default function Nav({ view, go, onFokus }) {
  return (
    <nav aria-label="Navigasi utama">
      <div className="brand">{'</>'} JADWALIN</div>
      <div className="links">
        {LINKS.map(([k, l]) => (
          <button key={k} className={view === k ? 'on' : ''} onClick={() => go(k)}>{l}</button>
        ))}
      </div>
      <button className="cta" onClick={onFokus}>Mode Fokus</button>
    </nav>
  )
}
