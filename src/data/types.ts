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
}

export type Heading = { depth: number; text: string; id: string }

export type Post = PostFrontmatter & {
  html: string
  headings: Heading[]
}
