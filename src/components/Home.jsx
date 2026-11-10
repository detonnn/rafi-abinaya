import Timer from './Timer'
import { COL, dot, byTime, todayIdx, dLeft } from '../utils'
export default function Home({ S, go }) {
  const l = S.sched.filter(s => s.h === todayIdx()).sort(byTime)
  const near = S.tasks.filter(t => t.s < 2).sort((a, b) => a.dl.localeCompare(b.dl)).slice(0, 3)
  const date = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })
  return (
    <section className="view">
      <div className="grid hero box">
        <div className="l">
          <span className="tag">KELAS 01TPLP021 · UNPAM</span>
          <h1>Susun jadwal kuliah, tanpa pusing.</h1>
          <p>Jadwal hari ini, deadline tugas, dan timer belajar ada di satu halaman. Data tersimpan di browser kamu.</p>
          <p style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn lime" onClick={() => go('jadwal')}>Atur jadwal</button>
            <button className="btn" onClick={() => go('tugas')}>Catat tugas</button>
          </p>
        </div>
        <div className="r">
          <div><b>{date}</b><div className="big">{l.length ? l.length + ' matkul' : 'Kosong'}</div></div>
          <div>{l.length ? dot(l[0].a) + ' - ' + dot(l[l.length - 1].b) : 'Hari ini nggak ada kelas.'}</div>
        </div>
      </div>
      <div className="grid cols">
        <div className="box pad"><h2>Jadwal hari ini</h2>
          <div className="stg">
            {l.length ? l.map((s, i) => (
              <div key={s.id} className="item" style={{ background: COL[s.c] || '#fff', '--i': i }}>
                <div className="t">{dot(s.a)}<br />{dot(s.b)}</div>
                <div className="b"><b>{s.n}</b><small>{s.d}</small></div>
              </div>
            )) : <div className="empty">Tidak ada jadwal hari ini. Waktunya nyicil tugas atau pakai mode fokus.</div>}
          </div>
        </div>
        <div style={{ display: 'grid', gap: 18 }}>
          <Timer />
          <div className="box dl"><h2>Deadline dekat</h2>
            <div className="stg">
              {near.length ? near.map((t, i) => (
                <div key={t.id} className="item" style={{ '--i': i }}>
                  <div className="t">{dLeft(t)}</div><div className="b"><b>{t.n}</b><small>{t.m}</small></div>
                </div>
              )) : <div className="empty">Belum ada tugas aktif.</div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
