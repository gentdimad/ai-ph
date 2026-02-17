import { Link } from 'react-router-dom'
import type { Post } from '../../data/types'
import TagList from '../content/TagList'

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="mt-4 p-5 border border-[color:var(--color-border)] rounded-[var(--radius)] bg-[var(--color-elev)] max-w-3xl">
        <div className='flex justify-between'>
            <h2 className="m-0 text-2xl leading-tight font-bold"><Link to={`/post/${post.slug}`}>{post.title}</Link></h2>
            <div className="text-[color:var(--color-muted)] text-[0.9rem] flex gap-2">
                <span>{new Date(post.date).toLocaleDateString()}</span>
                <span>• {post.readingTime} min read</span>
            </div>
        </div>

      <p className="text-[color:var(--color-muted)] mt-2">{post.description}</p>

      <TagList tags={post.tags} />
    </article>
  )
}
