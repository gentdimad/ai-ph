import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Page from '../components/layout/Page'
import Prose from '../components/content/Prose'
import TableOfContents from '../components/content/TableOfContents'
import SocialShare from '../components/content/SocialShare'
import TagList from '../components/content/TagList'
import { loadAllPosts } from '../data/index'
import type { Post } from '../data/types'

export default function PostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState<Post | null>(null)

  useEffect(() => {
    loadAllPosts().then(all => setPost(all.find(p => p.slug === slug) || null))
  }, [slug])

  if (!post) return <Page><p>Loading…</p></Page>

  const hasToc = (post.headings?.length || 0) > 0

  return (
    <Page>
      <article>
        <header className="mb-6">
          <h1>{post.title}</h1>
          <p className="text-[color:var(--color-muted)]">{new Date(post.date).toLocaleDateString()} • {post.readingTime} min read</p>
          <TagList tags={post.tags} />
        </header>
        <div className={`grid gap-8 ${hasToc ? 'lg:grid-cols-[1fr_minmax(200px,280px)]' : ''}`}>
          <Prose>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </Prose>
          {hasToc && (
            <aside className="hidden lg:block">
              <TableOfContents headings={post.headings} />
            </aside>
          )}
        </div>
        <footer className="mt-8">
          <SocialShare title={post.title} />
        </footer>
      </article>
    </Page>
  )
}
