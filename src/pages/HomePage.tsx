import { useEffect, useState } from 'react'
import Page from '../components/layout/Page'
import { loadAllPosts } from '../data/index'
import type { Post } from '../data/types'
import FeaturedPost from '../components/cards/FeaturedPost'
import FeaturedPostSkeleton from '../components/cards/FeaturedPostSkeleton'
import DirectionCard from '../components/cards/DirectionCard'

export default function HomePage() {
  const [featuredPost, setFeaturedPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadAllPosts().then(posts => {
      const featured = posts.find(p => p.slug === 'what-is-ai')
      setFeaturedPost(featured || null)
      setIsLoading(false)
    })
  }, [])

  return (
    <Page>
      <div className="max-w-7xl">
        {isLoading ? (
          <FeaturedPostSkeleton />
        ) : (
          featuredPost && <FeaturedPost post={featuredPost} />
        )}

        <div className="mt-4 flex flex-col gap-4 max-w-md">
          <DirectionCard
            title="Learn to build AI yourself"
            link="/learn-to-build"
            description="Learn to create AI that suits your needs"
          />
          <DirectionCard
            title="Discover the latest AI tools"
            link="/ai-tools"
            description="Explore the latest AI tools and their capabilities"
          />
          <DirectionCard
            title="See how AI shapes the world"
            link="/ai-news"
            description="Stay updated with the latest AI news and trends"
          />
        </div>
      </div>
    </Page>
  )
}
