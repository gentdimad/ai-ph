import { Link } from 'react-router-dom'
import type { Post } from '../../data/types'

export default function FeaturedPost({ post }: { post: Post }) {
  // Extract a preview from the HTML content
  const plainText = post.html.replace(/<[^>]+>/g, ' ').substring(0, 450) + '...'

  return (
    <article className="bg-app-bg border border-app-border rounded-2xl overflow-hidden max-w-4xl">
      <div className="p-10">
        <div className="text-app-muted text-xs font-medium mb-4 uppercase tracking-[0.2em]">
          FEATURED POST
        </div>

        <h2 className="text-6xl font-bold mb-6 text-app-text leading-tight">
          <Link to={`/post/${post.slug}`}>{post.title}</Link>
        </h2>

        <div className="text-app-muted text-sm leading-[1.6] mb-8 line-clamp-6">
          {plainText}
        </div>

        <Link
          to={`/post/${post.slug}`}
          className="inline-flex items-center gap-2 text-2xl text-app-text font-medium hover:gap-3 transition-all"
        >
          Read Full Post →
        </Link>
      </div>
    </article>
  )
}
