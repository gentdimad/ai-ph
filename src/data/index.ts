import { mdToHtml } from './md'
import type { Post, PostFrontmatter } from './types'

// Try multiple patterns to be robust across environments (Windows paths, base URLs)
const modules = {
  ...import.meta.glob('../content/posts/**/*.md', { eager: true, query: '?raw', import: 'default' }),
  // ...import.meta.glob('/src/content/posts/**/*.md', { eager: true, query: '?raw', import: 'default' }),
} as Record<string, string>

function parseFrontmatter(raw: string): { fm: PostFrontmatter; body: string } {
  if (raw.startsWith('---')) {
    const end = raw.indexOf('\n---', 3)
    if (end !== -1) {
      const header = raw.slice(3, end).trim()
      const body = raw.slice(end + 4).replace(/^\s*\n/, '')
      const fm: any = {}
      header.split(/\r?\n/).forEach(line => {
        const idx = line.indexOf(':')
        if (idx === -1) return
        const key = line.slice(0, idx).trim()
        let val = line.slice(idx + 1).trim()
        // Strip surrounding quotes
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1)
        }
        // Array syntax [a, b]
        if (val.startsWith('[') && val.endsWith(']')) {
          const arr = val.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean).map(s => s.replace(/^['\"]|['\"]$/g, ''))
            ; (fm as any)[key] = arr
        } else {
          (fm as any)[key] = val
        }
      })
      return { fm: fm as PostFrontmatter, body }
    }
  }
  return { fm: {} as PostFrontmatter, body: raw }
}

let cache: Post[] | null = null

function dedupeBySlug(list: Post[]): Post[] {
  return Array.from(new Map(list.map(p => [p.slug?.trim(), p])).values())
}

export async function loadAllPosts(): Promise<Post[]> {
  if (cache && cache.length > 0) return dedupeBySlug(cache)
  const entries = Object.entries(modules)
  if (entries.length === 0) {
    console.warn('[blog_template] No markdown files matched. Ensure files exist under src/content/posts and Vite include pattern.');
  }
  const posts: Post[] = []

  for (const [path, raw] of entries) {
    const { fm, body } = parseFrontmatter(raw)
    if (!fm || !fm.slug || fm.draft) continue

    const html = await mdToHtml(body)
    const words = body.trim().split(/\s+/).filter(Boolean).length
    const readingTime = Math.max(1, Math.round(words / 200))
    const headings = Array.from(html.matchAll(/<h([1-6]) id=\"(.*?)\">(.*?)<\/h\1>/g)).map(([, depth, id, text]) => ({
      depth: Number(depth),
      id,
      text: String(text).replace(/<[^>]+>/g, '')
    }))

    posts.push({ ...fm, html, readingTime, headings, path })
  }

  // Dedupe by slug in case multiple glob patterns matched the same file
  const deduped = Array.from(new Map(posts.map(p => [p.slug, p])).values())
  deduped.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  cache = deduped
  return deduped
}

export async function getPostBySlug(slug: string) {
  const all = await loadAllPosts()
  return all.find(p => p.slug === slug) || null
}

export async function getPostsByTag(tag: string) {
  const all = await loadAllPosts()
  return all.filter(p => p.tags.includes(tag))
}
