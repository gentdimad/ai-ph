import { useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import Page from '../components/layout/Page'
import PostList from '../components/cards/PostList'
import PostCardSkeleton from '../components/cards/PostCardSkeleton'
import PageHeader from '../components/layout/PageHeader'
import { loadAllPosts } from '../data/index'
import { TOPICS } from '../data/topics'
import type { Post } from '../data/types'

export default function TopicPage() {
    const { slug } = useParams<{ slug: string }>()

    // Resolve topic synchronously to prevent "Not found" flash
    const topic = useMemo(() => TOPICS.find(t => t.slug === slug) || null, [slug])

    const [posts, setPosts] = useState<Post[]>([])
    const [isLoading, setIsLoading] = useState(true)

    // Reset loading state synchronously when slug changes to avoid flashes/linter errors
    const [prevSlug, setPrevSlug] = useState(slug)
    if (slug !== prevSlug) {
        setPrevSlug(slug)
        setIsLoading(true)
        setPosts([])
    }

    useEffect(() => {
        if (topic) {
            loadAllPosts().then(allPosts => {
                const filtered = allPosts.filter(p => p.path.includes(`/${topic.directory}/`))
                setPosts(filtered)
                setIsLoading(false)
            })
        }
    }, [topic])

    if (!topic) {
        return (
            <Page>
                <div className="max-w-7xl px-4">
                    <PageHeader title="Topic not found" />
                </div>
            </Page>
        )
    }

    return (
        <Page>
            <div className="max-w-7xl px-4">
                <PageHeader
                    title={topic.title}
                    description={topic.description}
                />

                <div className="mt-20 border-t border-app-border pt-12">
                    <h2 className="text-3xl font-bold mb-10 text-app-text">Posts</h2>
                    {isLoading ? (
                        <div className="space-y-6">
                            <PostCardSkeleton />
                            <PostCardSkeleton />
                            <PostCardSkeleton />
                        </div>
                    ) : (
                        <PostList posts={posts} />
                    )}
                </div>
            </div>
        </Page>
    )
}
