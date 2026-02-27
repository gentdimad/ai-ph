import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { createRoot } from 'react-dom/client'
import Page from '../components/layout/Page'
import Prose from '../components/content/Prose'
import TableOfContents from '../components/content/TableOfContents'
import SocialShare from '../components/content/SocialShare'
import TagList from '../components/content/TagList'
import OnlinePythonCompiler from '../components/content/OnlinePythonCompiler'
import { loadAllPosts } from '../data/index'
import type { Post } from '../data/types'

export default function PostPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState<Post | null>(null)

  useEffect(() => {
    loadAllPosts().then(all => setPost(all.find(p => p.slug === slug) || null))
  }, [slug])

  // Hydration for custom components like Python Compiler
  useEffect(() => {
    if (!post?.html) return

    const roots: any[] = []
    const container = document.querySelector('.prose')
    if (!container) return

    // Find all compiler roots
    const compilerElements = container.querySelectorAll('.python-compiler-root')

    compilerElements.forEach((el) => {
      const base64Code = el.getAttribute('data-code') || ''
      let decodedCode = ''
      try {
        decodedCode = decodeURIComponent(escape(atob(base64Code)))
      } catch (e) {
        decodedCode = base64Code // Fallback
      }

      const root = createRoot(el)
      root.render(<OnlinePythonCompiler initialCode={decodedCode} />)
      roots.push(root)
    })

    return () => {
      roots.forEach(root => {
        // Use a small timeout to ensure React bit is done rendering before unmounting
        setTimeout(() => root.unmount(), 0)
      })
    }
  }, [post?.html])

  if (!post) return <Page><p>Loading…</p></Page>

  const hasToc = (post.headings?.length || 0) > 0

  return (
    <Page fluid>
      <article>
        <header className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-app-muted hover:text-app-text mb-4 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back
          </button>
          <h1 className="text-app-text">{post.title}</h1>
          <p className="text-app-muted">{new Date(post.date).toLocaleDateString()} • {post.readingTime} min read</p>
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
