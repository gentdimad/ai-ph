import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolink from 'rehype-autolink-headings'
import rehypeStringify from 'rehype-stringify'
import rehypePrism from 'rehype-prism-plus'

export async function mdToHtml(md: string) {
  // Pre-process custom [table] tags
  const processedMd = md.replace(/\[table\]([\s\S]*?)\[\/table\]/g, (_match, content) => {
    const lines = content.trim().split('\n').map((l: string) => l.trim()).filter(Boolean)
    if (lines.length === 0) return ''

    const rows = lines.map((line: string, index: number) => {
      const cells = line.includes('|') ? line.split('|') : line.split(':')
      const tag = index === 0 ? 'th' : 'td'
      const rowContent = cells.map((c: string) => `<${tag}>${c.trim()}</${tag}>`).join('')
      return `<tr>${rowContent}</tr>`
    })

    const header = rows[0]
    const body = rows.slice(1).join('')

    return `\n<div class="table-wrapper"><table><thead>${header}</thead><tbody>${body}</tbody></table></div>\n`
  })

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolink, { behavior: 'wrap' })
    .use(rehypePrism)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(processedMd)
  return String(file)
}
