import Page from '../components/layout/Page'
import { site } from '../config/site'

export default function AboutPage() {
  return (
    <Page>
      <h1 className='font-bold text-3xl'>About {site.siteName}</h1>
      <p className="italic text-[color:var(--color-muted)] max-w-[70ch] mt-4">
        {site.description}
      </p>
        <div className='block mt-6'>
      <p>
        This is a minimalist, Medium-style blog template built with React + Vite. Customize everything from a single
        configuration file at <code>src/config/site.ts</code> including colors, site name, and contact info.
      </p>
        </div>
        <div className='block mt-6'>
      <p>
        Built by {site.developer.name}. Find more at <a href={site.developer.website} target="_blank" rel="noreferrer">{site.developer.website}</a>.
      </p>
        </div>
    </Page>
  )
}
