import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { searchPosts } from '../../services/filteringService'

const DEBOUNCE_MS = 250
const MAX_RESULTS = 8

export default function SearchBar() {
  const navigate = useNavigate()
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
    try {
      const out = await searchPosts(val, MAX_RESULTS)
      setResults(out)
      setHighlightedIndex(-1)
    } catch (err) {
      console.error('Search failed:', err)
      setResults([])
    } finally {
      setLoading(false)
    }
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
      navigate(`/post/${results[highlightedIndex].slug}`)
    } else if (e.key === 'Escape') {
      setOpen(false)
      setHighlightedIndex(-1)
    }
  }

  return (
    <div className="relative w-full">
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
        className="w-full bg-transparent text-[color:var(--color-text)] border border-[color:var(--color-border)] rounded-full py-1.5 px-3 outline-none box-border"
      />
      {open && (
        <div className="absolute top-full left-0 mt-1.5 w-full max-h-80 overflow-y-auto z-50 border border-[color:var(--color-border)] bg-[var(--color-elev)] rounded-lg p-1.5">
          {loading ? (
            <div className="py-2 px-1.5 text-sm text-[color:var(--color-muted)]">
              Searching…
            </div>
          ) : results.length > 0 ? (
            results.map((r, i) => (
              <div
                key={r.slug}
                className={`py-1.5 px-1.5 rounded ${i === highlightedIndex ? 'bg-[var(--color-bg-soft)]' : ''}`}
              >
                <Link to={`/post/${r.slug}`}>{r.title}</Link>
              </div>
            ))
          ) : q.trim() ? (
            <div className="py-2 px-1.5 text-sm text-[color:var(--color-muted)]">
              No posts found.
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
