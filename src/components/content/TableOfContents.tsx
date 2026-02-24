import type { Heading } from '../../data/types'

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  if (!headings?.length) return null

  return (
    <nav className="sticky top-20 pl-5 border-l border-dashed border-app-border text-app-muted" aria-label="Table of contents">
      <strong className="text-app-text">On this page</strong>
      <ul className="list-none pl-0 mt-2">
        {headings.filter(h => h.depth <= 3).map(h => (
          <li key={h.id} className="mt-1">
            <a className="text-app-muted hover:underline" href={`#${h.id}`}>{h.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
