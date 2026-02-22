import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { searchPosts } from '../../services/filteringService'

const DEBOUNCE_MS = 250
const MAX_RESULTS = 8

export default function SearchBar() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [results, setResults] = useState<{ title: string; slug: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)

  const runSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([])
      setLoading(false)
      return
    }
    setLoading(true)
    try {
      const matches = await searchPosts(query, MAX_RESULTS)
      setResults(matches)
      setHighlightedIndex(-1)
    } catch (error) {
      console.error('Search failed:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!searchQuery.trim()) return
    const debounceTimer = setTimeout(() => runSearch(searchQuery), DEBOUNCE_MS)
    return () => clearTimeout(debounceTimer)
  }, [searchQuery, runSearch])

  const moveSelectionDown = (e: React.KeyboardEvent) => {
    e.preventDefault()
    setHighlightedIndex(index => (index < results.length - 1 ? index + 1 : 0))
  }

  const moveSelectionUp = (e: React.KeyboardEvent) => {
    e.preventDefault()
    setHighlightedIndex(index => (index > 0 ? index - 1 : results.length - 1))
  }

  const confirmSelection = (e: React.KeyboardEvent) => {
    if (highlightedIndex >= 0 && results[highlightedIndex]) {
      e.preventDefault()
      navigate(`/post/${results[highlightedIndex].slug}`)
    }
  }

  const closeDropdown = () => {
    setOpen(false)
    setHighlightedIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open || results.length === 0) {
      if (e.key === 'Escape') setOpen(false)
      return
    }

    switch (e.key) {
      case 'ArrowDown': return moveSelectionDown(e)
      case 'ArrowUp':   return moveSelectionUp(e)
      case 'Enter':     return confirmSelection(e)
      case 'Escape':    return closeDropdown()
    }
  }

  return (
    <div className="relative w-full">
      <input
        aria-label="Search posts"
        aria-expanded={open}
        aria-autocomplete="list"
        role="combobox"
        value={searchQuery}
        onChange={e => {
          setSearchQuery(e.target.value)
          if (!e.target.value.trim()) {
            setResults([])
            setOpen(false)
            return
          }
          setOpen(true)
        }}
        onFocus={() => searchQuery && setOpen(true)}
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
            results.map((result, index) => (
              <div
                key={result.slug}
                className={`py-1.5 px-1.5 rounded ${index === highlightedIndex ? 'bg-[var(--color-bg-soft)]' : ''}`}
              >
                <Link to={`/post/${result.slug}`}>{result.title}</Link>
              </div>
            ))
          ) : searchQuery.trim() ? (
            <div className="py-2 px-1.5 text-sm text-[color:var(--color-muted)]">
              No posts found.
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
