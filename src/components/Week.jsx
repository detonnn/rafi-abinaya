import { useState } from 'react'
import { DAYS, COL, dot, mins, byTime, todayIdx } from '../utils'
export default function Week({ S, setS }) {
  const [f, setF] = useState({ n: '', d: '', h: 0, a: '08:00', b: '09:40', c: 'lime' })
  const [err, setErr] = useState('')
  const set = k => e => setF({ ...f, [k]: e.target.value })
  const submit = e => {
    e.preventDefault()
    if (mins(f.b) <= mins(f.a)) return setErr('Jam selesai harus setelah jam mulai.')
    const h = +f.h
    const x = S.sched.find(s => s.h === h && mins(f.a) < mins(s.b) && mins(f.b) > mins(s.a))
    if (x) return setErr('Bentrok dengan ' + x.n + ' (' + dot(x.a) + ' - ' + dot(x.b) + ').')
    setErr('')
    setS({ ...S, sched: [...S.sched, { id: 's' + Date.now(), n: f.n.trim(), d: f.d.trim(), h, a: f.a, b: f.b, c: f.c }] })
    setF({ ...f, n: '', d: '' })
  }
  const ti = todayIdx()
  return (
    <section className="view">
      <h2>Jadwal mingguan</h2>
      <form className="f box pad" onSubmit={submit}>
        <label>Kegiatan<input required maxLength="60" placeholder="Kuliah Algoritma" value={f.n} onChange={set('n')} /></label>
        <label>Dosen (opsional)<input maxLength="60" value={f.d} onChange={set('d')} /></label>
        <label>Hari<select value={f.h} onChange={set('h')}>{DAYS.map((d, i) => <option key={i} value={i}>{d}</option>)}</select></label>
        <label>Mulai<input type="time" required value={f.a} onChange={set('a')} /></label>
        <label>Selesai<input type="time" required value={f.b} onChange={set('b')} /></label>
        <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
          <legend style={{ fontWeight: 700, fontSize: 12, textTransform: 'uppercase', marginBottom: 4 }}>Warna</legend>
          <div className="sw">{Object.keys(COL).map(k => (
            <label key={k}><input type="radio" name="col" aria-label={k} checked={f.c === k} onChange={() => setF({ ...f, c: k })} /><span style={{ background: COL[k] }} /></label>
          ))}</div>
        </fieldset>
        <button className="btn lime" type="submit">Tambah jadwal</button>
        <div className="err" role="alert">{err}</div>
      </form>
      <div className="grid week stg">
        {DAYS.map((d, i) => {
          const l = S.sched.filter(s => s.h === i).sort(byTime)
          const tot = l.reduce((a, s) => a + mins(s.b) - mins(s.a), 0)
          return (
            <div key={d} className={'day' + (i === ti ? ' today' : '')} style={{ '--i': i }}>
              <h3>{d} <small>{l.length ? l.length + ' matkul' : ''}</small></h3>
              <div className="bar" title="Beban hari ini"><i style={{ width: Math.min(100, tot / 6) + '%' }} /></div>
              {l.length ? l.map(s => (
                <div key={s.id} className="cls pop" style={{ background: COL[s.c] || '#fff' }}>
                  <b>{s.n}</b>{dot(s.a)} - {dot(s.b)}{s.d && <><br />{s.d}</>}
                  <button className="btn sm x" aria-label={'Hapus ' + s.n} onClick={() => setS({ ...S, sched: S.sched.filter(z => z.id !== s.id) })}>X</button>
                </div>
              )) : <div className="free">Kosong</div>}
            </div>
          )
        })}
      </div>
    </section>
  )
}
