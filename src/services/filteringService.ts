import { loadAllPosts } from '../data/index'

export type SearchResult = { title: string; slug: string }

export async function searchPosts(query: string, maxResults = 8): Promise<SearchResult[]> {
  if (!query.trim()) return []

  const posts = await loadAllPosts()
  const lower = query.toLowerCase().trim()

  return posts
    .filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        (p.description && p.description.toLowerCase().includes(lower))
    )
    .slice(0, maxResults)
    .map((p) => ({ title: p.title, slug: p.slug }))
}