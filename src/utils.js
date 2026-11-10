export const DAYS = ['Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu']
export const COL = { lime:'#c4f04d', pink:'#ff7a9c', orange:'#ffa84d', blue:'#7cc4ff', yellow:'#ffe14d' }
export const ST = ['Belum dikerjain','Lagi dikerjain','Selesai']

export const seed = [
  ['Pancasila','Dr. Hj. Sri Utaminingsih',1,'07:10','08:50','lime'],
  ['Kalkulus','Elfi Fauziah',1,'08:50','10:30','pink'],
  ['Basic English for International Communication','Neneng Misliyah',1,'10:30','12:10','blue'],
  ['Logika Informatika','Sartika Lina Mulani Sitio',2,'08:50','10:30','orange'],
  ['Pengantar Teknologi Informasi','Mochamad Adhari Adiguna',2,'13:00','14:40','lime'],
  ['Agama Islam',"Abu Bakar Dja'far",2,'14:40','16:20','yellow'],
  ['Arsitektur dan Organisasi Komputer','Alvino Octaviano',4,'07:10','08:50','blue'],
  ['Algoritma dan Pemrograman Dasar','Nurhasanah',4,'08:50','10:30','pink'],
].map((a, i) => ({ id: 's' + i, n: a[0], d: a[1], h: a[2], a: a[3], b: a[4], c: a[5] }))

export const load = () => {
  try {
    const p = JSON.parse(localStorage.getItem('jadwalin-v1'))
    if (p && Array.isArray(p.sched) && Array.isArray(p.tasks)) return p
  } catch (e) {}
  return { sched: seed, tasks: [] }
}
export const dot = t => t.replace(':', '.')
export const mins = t => { const [h, m] = t.split(':').map(Number); return h * 60 + m }
export const byTime = (x, y) => mins(x.a) - mins(y.a)
// getDay(): 0=Minggu, jadi geser agar Senin=0 (ikut hari asli dari jam device)
export const todayIdx = () => (new Date().getDay() + 6) % 7
export const dayDiff = t => Math.ceil((new Date(t.dl + 'T23:59:59') - new Date()) / 864e5)
export const dLeft = t => { const d = dayDiff(t); return d < 0 ? 'Lewat ' + (-d) + ' hr' : d === 0 ? 'Hari ini' : 'H-' + d }
export const isLate = t => t.s < 2 && dayDiff(t) <= 2
