import { site } from '../../config/site'
import Container from './Container'

export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--color-border)] py-6 text-[color:var(--color-muted)]" aria-label="Site footer">
      <Container>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-[color:var(--color-text)]">&copy; {new Date().getFullYear()} {site.siteName}</div>
            <div>Built by {site.developer.name}</div>
          </div>
          <div>
            <a className="hover:underline" href={`mailto:${site.contact.email}`}>Contact</a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
