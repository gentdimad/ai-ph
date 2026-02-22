import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { searchPosts } from '../../services/filteringService'

const DEBOUNCE_MS = 250
const MAX_RESULTS = 8

export default function SearchBar() {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [results, setResults] = useState<{ title: string; slug: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)

  const runSearch = useCallback(async (val: string) => {
    if (!val.trim()) {
      setResults([])
      setLoading(false)
      return
    }
    setLoading(true)
    const out = await searchPosts(val, MAX_RESULTS)
    setResults(out)
    setLoading(false)
    setHighlightedIndex(-1)
  }, [])

  useEffect(() => {
    if (!q.trim()) return
    const t = setTimeout(() => runSearch(q), DEBOUNCE_MS)
    return () => clearTimeout(t)
  }, [q, runSearch])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open || results.length === 0) {
      if (e.key === 'Escape') setOpen(false)
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex(i => (i < results.length - 1 ? i + 1 : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex(i => (i > 0 ? i - 1 : results.length - 1))
    } else if (e.key === 'Enter' && highlightedIndex >= 0 && results[highlightedIndex]) {
      e.preventDefault()
      window.location.href = `/post/${results[highlightedIndex].slug}`
    } else if (e.key === 'Escape') {
      setOpen(false)
      setHighlightedIndex(-1)
    }
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <input
        aria-label="Search posts"
        aria-expanded={open}
        aria-autocomplete="list"
        role="combobox"
        value={q}
        onChange={e => {
          const val = e.target.value
          setQ(val)
          if (!val.trim()) {
            setResults([])
            setOpen(false)
            return
          }
          setOpen(true)
        }}
        onFocus={() => q && setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={handleKeyDown}
        placeholder="Search posts…"
        style={{
          background: 'transparent',
          color: 'var(--color-text)',
          border: '1px solid var(--color-border)',
          borderRadius: 999,
          padding: '0.4rem 0.8rem',
          width: '100%',
          outline: 'none',
        }}
      />
      {open && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            marginTop: '6px',
            width: '100%',
            maxHeight: 320,
            overflowY: 'auto',
            zIndex: 50,
            border: '1px solid var(--color-border)',
            background: 'var(--color-elev)',
            borderRadius: 8,
            padding: '0.4rem',
          }}
        >
          {loading ? (
            <div style={{ padding: '0.5rem 0.4rem', color: 'var(--color-muted)', fontSize: '0.9rem' }}>
              Searching…
            </div>
          ) : results.length > 0 ? (
            results.map((r, i) => (
              <div
                key={r.slug}
                style={{
                  padding: '0.35rem 0.4rem',
                  background: i === highlightedIndex ? 'var(--color-bg-soft)' : undefined,
                  borderRadius: 4,
                }}
              >
                <Link to={`/post/${r.slug}`}>{r.title}</Link>
              </div>
            ))
          ) : q.trim() ? (
            <div style={{ padding: '0.5rem 0.4rem', color: 'var(--color-muted)', fontSize: '0.9rem' }}>
              No posts found.
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}