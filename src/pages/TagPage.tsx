import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Page from '../components/layout/Page'
import PostList from '../components/cards/PostList'
import { loadAllPosts } from '../data/index'
import type { Post } from '../data/types'

export default function TagPage() {
  const { tag } = useParams()
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => { if (tag) loadAllPosts().then(all => setPosts(all.filter(p => p.tags.includes(tag)))) }, [tag])

  return (
    <Page>
      <h1>#{tag}</h1>
      <PostList posts={posts} />
    </Page>
  )
}
