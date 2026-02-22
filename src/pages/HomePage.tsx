import { useEffect, useState } from 'react'
import Page from '../components/layout/Page'
import PostList from '../components/cards/PostList'
import SubscribeCTA from '../components/content/SubscribeCTA'
import { loadAllPosts } from '../data/index'
import type { Post } from '../data/types'
import RecommendationsList from '../components/layout/RecommendationsList'
import SearchBar from '../components/search/SearchBar'

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([])
  useEffect(() => { loadAllPosts().then(setPosts) }, [])

  return (
    <Page>
      <RecommendationsList>
        <div className="mb-6">
          <SearchBar />
        </div>
        <PostList posts={posts} />
        <div className="mt-8">
          <SubscribeCTA />
        </div>
      </RecommendationsList>
    </Page>
  )
}
