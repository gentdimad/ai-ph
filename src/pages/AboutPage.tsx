import Page from '../components/layout/Page'
import { site } from '../config/site'

export default function AboutPage() {
  return (
    <Page>
      <h1 className='font-bold text-3xl text-app-text'>About {site.siteName}</h1>
      <p className="italic text-app-muted max-w-[70ch] mt-4">
        {site.description}
      </p>
      <div className='block mt-6'>
        <p>
          This is a community dedicated to help AI adoption in the Philippines by providing guidance through blog posts and tutorials to aspiring software developers and non-technical workers.
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
