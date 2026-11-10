import { useState, useEffect } from 'react'
export default function Timer() {
  const [focus, setFocus] = useState(true)
  const [left, setLeft] = useState(1500)
  const [run, setRun] = useState(false)
  const total = focus ? 1500 : 300
  useEffect(() => { if (!run) return; const id = setInterval(() => setLeft(l => l - 1), 1000); return () => clearInterval(id) }, [run])
  useEffect(() => { if (left <= 0) { setFocus(f => !f); setLeft(focus ? 300 : 1500) } }, [left])
  const clock = String(Math.floor(left / 60)).padStart(2, '0') + ':' + String(left % 60).padStart(2, '0')
  useEffect(() => { document.title = run ? clock + ' · Jadwalin' : 'Jadwalin · Jadwal Kuliah UNPAM' }, [run, clock])
  const mode = f => { setFocus(f); setLeft(f ? 1500 : 300); setRun(false) }
  return (
    <div className={'box timer' + (run ? ' running' : '')} id="fokus">
      <h2>Mode fokus</h2>
      <div aria-live="polite">{focus ? 'Belajar 25 menit' : 'Istirahat 5 menit'}</div>
      <div className="big" key={focus}>{clock}</div>
      <div className="prog"><i style={{ width: ((total - left) / total * 100) + '%' }} /></div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button className="btn lime" onClick={() => setRun(!run)}>{run ? 'Jeda' : 'Mulai'}</button>
        <button className="btn" onClick={() => mode(focus)}>Reset</button>
        <button className="btn pink" onClick={() => mode(!focus)}>Ganti mode</button>
      </div>
    </div>
  )
}
