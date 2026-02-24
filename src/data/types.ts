export type Author = {
  id: string
  name: string
  avatarUrl?: string
  bio?: string
  social?: { twitter?: string; github?: string; website?: string }
}

export type PostFrontmatter = {
  title: string
  slug: string
  description: string
  date: string // ISO
  updated?: string
  authorId: string
  tags: string[]
  coverImage?: string
  draft?: boolean
  series?: string
  readingTime?: number // computed
  category?: string
}

export type Heading = { depth: number; text: string; id: string }

export type Post = PostFrontmatter & {
  html: string
  headings: Heading[]
  path: string
}

export type Topic = {
  slug: string
  title: string
  description: string
  directory: string // e.g. "python"
}
