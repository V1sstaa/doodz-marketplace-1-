import { useState, useEffect, useMemo } from 'react'
import { products, categories } from './data/products'
import { T } from './i18n'

const peso = (n) => '₱' + n.toLocaleString()
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } }
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch { /* storage unavailable */ } }
const PLACEHOLDER = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="#e5e7eb"/><text x="50%" y="50%" fill="#9ca3af" font-family="sans-serif" font-size="28" text-anchor="middle" dominant-baseline="middle">Doodz</text></svg>')

function Img({ src, alt, className }) {
  return <img src={src} alt={alt} loading="lazy" className={className}
    onError={(e) => { if (e.currentTarget.src !== PLACEHOLDER) e.currentTarget.src = PLACEHOLDER }} />
}

/* ---------- LOGIN ---------- */
function Login({ t, onLogin, lang, setLang }) {
  const [mode, setMode] = useState('login')
  const [f, setF] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [show, setShow] = useState(false)
  const submit = (e) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(f.email.trim()) || f.password.length < 6) return setError(t.err)
    onLogin({ name: f.name.trim() || f.email.trim().split('@')[0], email: f.email.trim() })
  }
  const input = 'w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand'
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:block relative">
        <Img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=70" alt="Store shelves" className="absolute inset-0 w-full h-full object-cover bg-gray-300" />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-10 text-white">
          <h1 className="text-5xl font-extrabold">Doodz</h1><p className="mt-2 text-lg">{t.tagline}</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-6 fade-in">
        <form onSubmit={submit} noValidate className="w-full max-w-sm space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-extrabold text-brand md:hidden">Doodz</h2>
            <button type="button" onClick={() => setLang(lang === 'en' ? 'fil' : 'en')} className="ml-auto text-sm underline">{lang === 'en' ? 'Filipino' : 'English'}</button>
          </div>
          <div className="flex border-b">
            {['login', 'signup'].map((m) => (
              <button type="button" key={m} onClick={() => { setMode(m); setError('') }}
                className={`flex-1 py-2 font-semibold ${mode === m ? 'border-b-2 border-brand text-brand' : 'text-gray-500'}`}>{t[m]}</button>
            ))}
          </div>
          {mode === 'signup' && <input className={input} placeholder={t.name} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />}
          <input className={input} type="email" placeholder={t.email} value={f.email} onChange={(e) => { setF({ ...f, email: e.target.value }); setError('') }} />
          <div className="relative">
            <input className={input} type={show ? 'text' : 'password'} placeholder={t.password} value={f.password} onChange={(e) => { setF({ ...f, password: e.target.value }); setError('') }} />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-3 text-sm text-gray-500">{show ? 'Hide' : 'Show'}</button>
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button className="w-full bg-brand text-white font-semibold py-3 rounded-lg hover:opacity-90 transition">{t[mode]}</button>
        </form>
      </div>
    </div>
  )
}

/* ---------- CART DRAWER ---------- */
function CartDrawer({ t, cart, setCart, close, onCheckout }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const change = (id, d) => setCart(cart.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + d) } : i)))
  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-black/40" onClick={close}>
      <aside className="bg-white w-full max-w-md h-full p-5 overflow-y-auto fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between mb-4"><h3 className="text-xl font-bold">{t.cart}</h3><button onClick={close}>✕</button></div>
        {cart.length === 0 && <p className="text-gray-500">{t.empty}</p>}
        {cart.map((i) => (
          <div key={i.id} className="flex gap-3 py-3 border-b">
            <Img src={i.img} alt={i.name} className="w-16 h-16 object-cover rounded" />
            <div className="flex-1">
              <p className="font-semibold text-sm">{i.name}</p><p className="text-brand">{peso(i.price)}</p>
              <div className="flex items-center gap-2 mt-1">
                <button onClick={() => change(i.id, -1)} className="w-6 h-6 border rounded">-</button>{i.qty}
                <button onClick={() => change(i.id, 1)} className="w-6 h-6 border rounded">+</button>
                <button onClick={() => setCart(cart.filter((x) => x.id !== i.id))} className="ml-auto text-xs text-red-600">{t.remove}</button>
              </div>
            </div>
          </div>
        ))}
        {cart.length > 0 && (<>
          <p className="flex justify-between font-bold text-lg mt-4"><span>{t.total}</span><span>{peso(total)}</span></p>
          <button onClick={onCheckout} className="w-full mt-4 bg-brand text-white py-3 rounded-lg font-semibold">{t.checkout}</button>
        </>)}
      </aside>
    </div>
  )
}

/* ---------- CONTACT ---------- */
function Contact({ t }) {
  const [sent, setSent] = useState(false)
  const input = 'w-full border rounded-lg px-4 py-3'
  return (
    <section id="contact" className="bg-gray-100 py-12 px-4">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl font-extrabold mb-1">{t.contact}</h2>
        <p className="mb-4 text-gray-600">{t.email}: <a className="text-brand underline" href="mailto:doodz05@gmail.com">doodz05@gmail.com</a> · {t.page}: <b>doodz</b></p>
        <form onSubmit={(e) => { e.preventDefault(); e.currentTarget.reset(); setSent(true) }} className="space-y-3">
          <input required className={input} placeholder={t.name} />
          <input required type="email" className={input} placeholder={t.email} />
          <textarea required rows="4" className={input} placeholder={t.message} />
          <button className="bg-brand text-white px-6 py-3 rounded-lg font-semibold">{t.send}</button>
          {sent && <p className="text-green-700">{t.sent}</p>}
        </form>
      </div>
    </section>
  )
}

/* ---------- APP ---------- */
export default function App() {
  const [lang, setLang] = useState(() => { const l = load('lang', 'en'); return T[l] ? l : 'en' })
  const [user, setUser] = useState(() => load('user', null))
  const [cart, setCart] = useState(() => { const c = load('cart', []); return Array.isArray(c) ? c : [] })
  const [wish, setWish] = useState(() => { const w = load('wish', []); return Array.isArray(w) ? w : [] })
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')
  const [sort, setSort] = useState('default')
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState('')
  const t = T[lang]

  useEffect(() => { save('lang', lang) }, [lang])
  useEffect(() => { save('user', user) }, [user])
  useEffect(() => { save('cart', cart) }, [cart])
  useEffect(() => { save('wish', wish) }, [wish])
  useEffect(() => { if (!toast) return; const id = setTimeout(() => setToast(''), 2200); return () => clearTimeout(id) }, [toast])
  const say = (m) => setToast(m)

  const list = useMemo(() => {
    let r = products.filter((p) => (cat === 'All' || p.cat === cat) && p.name.toLowerCase().includes(q.toLowerCase()))
    if (sort === 'low') r = [...r].sort((a, b) => a.price - b.price)
    if (sort === 'high') r = [...r].sort((a, b) => b.price - a.price)
    return r
  }, [cat, q, sort])

  const add = (p) => {
    setCart((c) => (c.find((i) => i.id === p.id) ? c.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i)) : [...c, { ...p, qty: 1 }]))
    say(p.name + ' ✓')
  }
  const toggleWish = (id) => setWish((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]))

  if (!user) return <Login t={t} onLogin={setUser} lang={lang} setLang={setLang} />

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="sticky top-0 z-30 bg-white shadow">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3 p-3">
          <h1 className="text-2xl font-extrabold text-brand">Doodz</h1>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.search} className="flex-1 min-w-[160px] border rounded-full px-4 py-2" />
          <button onClick={() => setLang(lang === 'en' ? 'fil' : 'en')} className="text-sm underline">{lang === 'en' ? 'FIL' : 'EN'}</button>
          <a href="#contact" className="text-sm hidden sm:block">{t.contact}</a>
          <button onClick={() => setOpen(true)} className="relative bg-brand text-white px-4 py-2 rounded-full">
            {t.cart} ({cart.reduce((s, i) => s + i.qty, 0)})
          </button>
          <button onClick={() => setUser(null)} className="text-sm text-gray-500">{t.logout} ({user.name})</button>
        </div>
      </header>

      <section className="relative h-64 md:h-80">
        <Img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1600&q=70" alt="Shopping" className="absolute inset-0 w-full h-full object-cover bg-gray-300" />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center px-4">
          <h2 className="text-3xl md:text-5xl font-extrabold">{t.hero}</h2>
        </div>
      </section>

      <main className="max-w-7xl mx-auto p-4">
        <div className="flex gap-2 overflow-x-auto pb-3">
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`whitespace-nowrap px-4 py-2 rounded-full border ${cat === c ? 'bg-brand text-white border-brand' : 'bg-white'}`}>{c}</button>
          ))}
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="ml-auto border rounded-full px-3">
            <option value="default">{t.sort}</option><option value="low">{t.low}</option><option value="high">{t.high}</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
          {list.map((p) => (
            <article key={p.id} className="card-hover border rounded-xl overflow-hidden bg-white fade-in">
              <div className="relative">
                <Img src={p.img} alt={p.name} className="w-full h-44 object-cover bg-gray-200" />
                {p.old && <span className="absolute top-2 left-2 bg-brand text-white text-xs px-2 py-1 rounded">-{Math.round((1 - p.price / p.old) * 100)}%</span>}
                <button onClick={() => toggleWish(p.id)} aria-label="wishlist" className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 shadow">{wish.includes(p.id) ? '♥' : '♡'}</button>
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-500">{p.cat}</p>
                <h3 className="font-semibold text-sm h-10">{p.name}</h3>
                <p className="text-yellow-500 text-sm">{'★'.repeat(Math.round(p.rating))} <span className="text-gray-400">{p.rating}</span></p>
                <p className="font-bold text-brand">{peso(p.price)} {p.old && <s className="text-gray-400 text-xs font-normal">{peso(p.old)}</s>}</p>
                <button onClick={() => add(p)} className="w-full mt-2 bg-gray-900 text-white py-2 rounded-lg text-sm hover:bg-brand transition">{t.add}</button>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Contact t={t} />
      <footer className="bg-gray-900 text-gray-300 text-center p-6 text-sm">© 2026 Doodz Marketplace · doodz05@gmail.com</footer>

      {open && <CartDrawer t={t} cart={cart} setCart={setCart} close={() => setOpen(false)} onCheckout={() => { setCart([]); setOpen(false); say(t.placed) }} />}
      {toast && <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-black text-white px-5 py-3 rounded-full z-50 fade-in">{toast}</div>}
    </div>
  )
}
