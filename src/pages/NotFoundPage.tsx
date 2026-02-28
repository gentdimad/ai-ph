import Page from '../components/layout/Page'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <Page>
      <h1>404 – Not Found</h1>
      <p className="text-[color:var(--color-muted)]">We couldn't find that page. Try the homepage or use the search.</p>
      <Link
        className="inline-flex items-center gap-2 bg-transparent text-[color:var(--color-text)] border border-[color:var(--color-border)] rounded-full px-3 py-2 mt-2 hover:border-[color:var(--color-text)]"
        to="/home"
      >
        Go home
      </Link>
    </Page>
  )
}
