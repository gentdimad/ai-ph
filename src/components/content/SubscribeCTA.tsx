import { site } from '../../config/site'

export default function SubscribeCTA() {
  return (
    <section className="p-5 border border-[color:var(--color-border)] rounded-[var(--radius)] bg-[var(--color-elev)]" aria-label="Subscribe">
      <h3 className="mt-0 text-lg font-semibold">Stay up to date</h3>
      <p className="text-[color:var(--color-muted)]">Subscribe to {site.siteName} to get the latest articles in your inbox.</p>
      <a
        className="inline-flex items-center gap-2 bg-transparent text-[color:var(--color-text)] border border-[color:var(--color-border)] rounded-full px-3 py-2 mt-2 hover:border-[color:var(--color-text)]"
        href={`mailto:${site.contact.email}?subject=Subscribe%20to%20${encodeURIComponent(site.siteName)}`}
      >
        Subscribe via Email
      </a>
    </section>
  )
}
