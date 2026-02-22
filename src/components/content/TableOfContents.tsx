import type { Heading } from '../../data/types'

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  if (!headings?.length) return null

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = e.target as HTMLAnchorElement
    const id = target.href.split('#')[1]
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="sticky top-20 pl-5 border-l border-dashed border-[color:var(--color-border)] text-[color:var(--color-muted)]" aria-label="Table of contents">
      <strong className="text-[color:var(--color-text)]">On this page</strong>
      <ul className="list-none pl-0 mt-2">
        {headings.filter(h => h.depth <= 3).map(h => (
          <li key={h.id} className="mt-1">
            <a className="text-[color:var(--color-muted)] hover:underline cursor-pointer" 
            onClick={handleClick}
            href={`#${h.id}`}
            >
            {h.text}
            </a>
          </li>
        ))}
        </ul>
      </nav>
    );
  }
