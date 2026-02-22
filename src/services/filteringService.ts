import { loadAllPosts } from '../data/index'

export type SearchResult = { title: string; slug: string }

export async function searchPosts(query: string, maxResults = 8): Promise<SearchResult[]> {
  if (!query.trim()) return []

  const posts = await loadAllPosts()
  const lower = query.toLowerCase().trim()

  return posts
    .filter(
      (post) =>
        post.title.toLowerCase().includes(lower) ||
        (post.description && post.description.toLowerCase().includes(lower))
    )
    .slice(0, maxResults)
    .map((post) => ({ title: post.title, slug: post.slug }))
}
