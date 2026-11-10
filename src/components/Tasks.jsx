import { useState } from 'react'
import { ST, dLeft, isLate } from '../utils'
export default function Tasks({ S, setS }) {
  const mk = [...new Set(S.sched.map(s => s.n))]
  const [f, setF] = useState({ n: '', m: 'Umum', dl: new Date().toISOString().slice(0, 10) })
  const set = k => e => setF({ ...f, [k]: e.target.value })
  const submit = e => {
    e.preventDefault()
    setS({ ...S, tasks: [...S.tasks, { id: 't' + Date.now(), n: f.n.trim(), m: f.m, dl: f.dl, s: 0 }] })
    setF({ ...f, n: '' })
  }
  const upd = (id, fn) => setS({ ...S, tasks: S.tasks.map(t => t.id === id ? fn(t) : t) })
  const l = [...S.tasks].sort((a, b) => a.dl.localeCompare(b.dl))
  return (
    <section className="view">
      <h2>Tugas &amp; deadline</h2>
      <form className="f box pad" onSubmit={submit}>
        <label>Tugas<input required maxLength="80" placeholder="Makalah Pancasila" value={f.n} onChange={set('n')} /></label>
        <label>Mata kuliah<select value={f.m} onChange={set('m')}><option value="Umum">Umum</option>{mk.map(m => <option key={m}>{m}</option>)}</select></label>
        <label>Deadline<input type="date" required value={f.dl} onChange={set('dl')} /></label>
        <button className="btn lime" type="submit">Tambah tugas</button>
      </form>
      {l.length ? l.map(t => (
        <div key={t.id} className={'task pop' + (isLate(t) ? ' late' : '') + (t.s === 2 ? ' done' : '')}>
          <div className="n"><b>{t.n}</b><br /><small>{t.m} · {new Date(t.dl + 'T00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} · {t.s < 2 ? dLeft(t) : 'Beres'}</small></div>
          <button className="btn sm st" onClick={() => upd(t.id, x => ({ ...x, s: (x.s + 1) % 3 }))}>{ST[t.s]}</button>
          <button className="btn sm" aria-label={'Hapus ' + t.n} onClick={() => setS({ ...S, tasks: S.tasks.filter(x => x.id !== t.id) })}>Hapus</button>
        </div>
      )) : <div className="empty">Belum ada tugas. Tambah satu di atas, nanti deadline yang mepet otomatis jadi merah.</div>}
    </section>
  )
}
