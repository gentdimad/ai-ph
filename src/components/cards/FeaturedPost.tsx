import { Link } from 'react-router-dom'
import type { Post } from '../../data/types'
import TagList from '../content/TagList'

export default function FeaturedPost({ post }: { post: Post }) {
  return (
    <section className="p-6 border border-[color:var(--color-border)] rounded-[var(--radius)] bg-[var(--color-elev)] mb-6" aria-label="Featured post">
      <h2 className="m-0 text-2xl font-bold"><Link to={`/post/${post.slug}`}>{post.title}</Link></h2>
      <p className="text-[color:var(--color-muted)] mt-2">{post.description}</p>
      <div className="text-[color:var(--color-muted)] mt-2">{new Date(post.date).toLocaleDateString()} • {post.readingTime} min read</div>
      <TagList tags={post.tags} />
    </section>
  )
}
