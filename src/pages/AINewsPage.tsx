import { useEffect, useState } from 'react'
import Page from '../components/layout/Page'
import PageHeader from '../components/layout/PageHeader'
import { loadAllPosts } from '../data/index'
import type { Post } from '../data/types'
import NewsSection from '../components/cards/NewsSection'
import NewsCardSkeleton from '../components/cards/NewsCardSkeleton'

export default function AINewsPage() {
    const [newsPosts, setNewsPosts] = useState<Post[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        loadAllPosts().then(allPosts => {
            const news = allPosts.filter(p => p.category === 'news')
            setNewsPosts(news)
            setIsLoading(false)
        })
    }, [])

    const getSectorPosts = (sector: string) => {
        return newsPosts.filter(p => p.path.includes(`/news/${sector}/`))
    }

    // Filter latest posts within the last 7 days from the most recent post date
    const latestPosts = newsPosts.filter(post => {
        if (newsPosts.length === 0) return false
        const mostRecentDate = new Date(newsPosts[0].date).getTime()
        const postDate = new Date(post.date).getTime()
        const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000
        return (mostRecentDate - postDate) <= sevenDaysInMs
    })

    const businessPosts = getSectorPosts('business').slice(0, 2)
    const workforcePosts = getSectorPosts('workforce').slice(0, 2)
    const techPosts = getSectorPosts('tech').slice(0, 2)

    return (
        <Page>
            <div className="max-w-7xl px-4">
                <PageHeader
                    title="See how AI shapes the world"
                    description="News on the latest advancements of AI and how the world is running by using AI."
                />

                <div className="space-y-16">
                    {isLoading ? (
                        <>
                            <section>
                                <div className="flex justify-between items-center mb-6">
                                    <div className="h-8 w-32 bg-app-bg-soft animate-pulse rounded"></div>
                                </div>
                                <div className="grid grid-cols-1 gap-6">
                                    <NewsCardSkeleton showDescription={true} />
                                    <NewsCardSkeleton showDescription={true} />
                                </div>
                            </section>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                                {[1, 2, 3].map(i => (
                                    <section key={i}>
                                        <div className="flex justify-between items-center mb-6">
                                            <div className="h-8 w-32 bg-app-bg-soft animate-pulse rounded"></div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-6">
                                            <NewsCardSkeleton />
                                            <NewsCardSkeleton />
                                        </div>
                                    </section>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            {latestPosts.length > 0 && (
                                <NewsSection
                                    title="Latest"
                                    posts={latestPosts.slice(0, 2)}
                                    showDescription={true}
                                    seeMoreLink="/topic/news"
                                />
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                                {businessPosts.length > 0 && (
                                    <NewsSection
                                        title="Business"
                                        posts={businessPosts}
                                        seeMoreLink="/topic/news-business"
                                    />
                                )}

                                {workforcePosts.length > 0 && (
                                    <NewsSection
                                        title="Workforce"
                                        posts={workforcePosts}
                                        seeMoreLink="/topic/news-workforce"
                                    />
                                )}

                                {techPosts.length > 0 && (
                                    <NewsSection
                                        title="Tech"
                                        posts={techPosts}
                                        seeMoreLink="/topic/news-tech"
                                    />
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Page>
    )
}
