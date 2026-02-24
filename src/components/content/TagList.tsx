import { Link } from 'react-router-dom'

export default function TagList({ tags }: { tags: string[] }) {
  if (!tags?.length) return null
  return (
    <ul className="list-none p-0 mt-2 flex flex-wrap gap-2" aria-label="Post tags">
      {tags.map(t => (
        <li key={t}><Link className="text-app-muted hover:underline" to={`/tag/${encodeURIComponent(t)}`}>#{t}</Link></li>
      ))}
    </ul>
  )
}
