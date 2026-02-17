import { useState } from 'react'
import { loadAllPosts } from '../../data/index'
import { Link } from 'react-router-dom'

export default function SearchBar() {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [results, setResults] = useState<{ title: string; slug: string }[]>([])

  async function onChange(val: string) {
    setQ(val)
    if (!val) { setResults([]); setOpen(false); return }
    const posts = await loadAllPosts()
    const out = posts
      .filter(p => p.title.toLowerCase().includes(val.toLowerCase()))
      .slice(0, 5)
      .map(p => ({ title: p.title, slug: p.slug }))
    setResults(out)
    setOpen(true)
  }

  return (
    <div style={{ position: 'relative' }}>
      <input
        aria-label="Search posts"
        value={q}
        onChange={e => onChange(e.target.value)}
        onFocus={() => q && setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder="Search…"
        style={{
          background: 'transparent', color: 'var(--color-text)', border: '1px solid var(--color-border)',
          borderRadius: 999, padding: '0.4rem 0.8rem', width: 200
        }}
      />
      {open && results.length > 0 && (
        <div style={{ position: 'absolute', top: '2.2rem', right: 0, width: 260, border: '1px solid var(--color-border)', background: 'var(--color-elev)', borderRadius: 8, padding: '0.4rem' }}>
          {results.map(r => (
            <div key={r.slug} style={{ padding: '0.3rem 0.4rem' }}>
              <Link to={`/post/${r.slug}`}>{r.title}</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
