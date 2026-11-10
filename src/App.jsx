import { useState, useEffect } from 'react'
import { load } from './utils'
import Nav from './components/Nav'
import Home from './components/Home'
import Week from './components/Week'
import Tasks from './components/Tasks'

export default function App() {
  const [S, setS] = useState(load)
  const [view, setView] = useState('beranda')
  useEffect(() => { try { localStorage.setItem('jadwalin-v1', JSON.stringify(S)) } catch (e) {} }, [S])
  const fokus = () => {
    setView('beranda')
    setTimeout(() => document.getElementById('fokus')?.scrollIntoView({ behavior: 'smooth' }), 80)
  }
  return (
    <div className="wrap">
      <Nav view={view} go={setView} onFokus={fokus} />
      <main key={view}>
        {view === 'beranda' && <Home S={S} go={setView} />}
        {view === 'jadwal' && <Week S={S} setS={setS} />}
        {view === 'tugas' && <Tasks S={S} setS={setS} />}
      </main>
      <footer>Jadwalin · React · data disimpan di browser, tanpa login.</footer>
    </div>
  )
}
