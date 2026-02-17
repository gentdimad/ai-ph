import { useEffect, useMemo, useState } from 'react'
import { useParams} from 'react-router-dom'
import Page from '../components/layout/Page'
import PostList from '../components/cards/PostList'
import { loadAllPosts } from '../data/index'

export default function AuthorPage() {
  const { id } = useParams()
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => { loadAllPosts().then(all => setPosts(all.filter(p => p.authorId === id))) }, [id])

  const authorName = useMemo(() => {
    if (!posts.length) return id
    // In a real app we would look up authors.json; for now derive name from post meta
    return posts[0]?.authorId
  }, [posts, id])

  return (
    <Page>
      <h1>Author: {authorName}</h1>
      <PostList posts={posts as any} />
    </Page>
  )
}
