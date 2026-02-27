import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeAutolink from 'rehype-autolink-headings'
import rehypeStringify from 'rehype-stringify'
import rehypePrism from 'rehype-prism-plus'

export async function mdToHtml(md: string) {
  // 1. Pre-process custom [table] tags
  const tableProcessedMd = md.replace(/\[table\]([\s\S]*?)\[\/table\]/g, (_match, content) => {
    const lines = content.trim().split('\n').map((l: string) => l.trim()).filter(Boolean)
    if (lines.length === 0) return ''

    // Parse data
    const data = lines.map((line: string) => {
      return line.includes('|') ? line.split('|').map(s => s.trim()) : line.split(':').map(s => s.trim())
    })

    const headers = data[0]
    const rows = data.slice(1)

    // 1. Desktop HTML Table
    const desktopRows = data.map((cells: any, index: any) => {
      const tag = index === 0 ? 'th' : 'td'
      const rowContent = cells.map((c: any) => `<${tag}>${c}</${tag}>`).join('')
      return `<tr>${rowContent}</tr>`
    })
    const desktopTable = `<div class="table-wrapper hidden sm:block"><table><thead>${desktopRows[0]}</thead><tbody>${desktopRows.slice(1).join('')}</tbody></table></div>`

    // 2. Mobile Card Stack
    const mobileCards = rows.map((row: any) => {
      const title = row[0]
      const details = row.slice(1).map((cell: any, i: any) => {
        const header = headers[i + 1] || ''
        return `<div class="flex flex-col gap-1"><span class="text-[0.65rem] uppercase tracking-wider text-[color:var(--color-muted)] font-bold">${header}</span><span class="text-sm">${cell}</span></div>`
      }).join('')

      return `<div class="border border-[color:var(--color-border)] rounded-lg p-4 bg-[var(--color-bg-soft)] flex flex-col gap-3"><div class="text-lg font-bold border-b border-[color:var(--color-border)] pb-2 mb-1">${title}</div><div class="grid grid-cols-1 gap-4">${details}</div></div>`
    }).join('\n\n')
    const mobileContainer = `<div class="flex flex-col gap-4 sm:hidden my-8">\n\n${mobileCards}\n\n</div>`

    return `\n\n${desktopTable}\n\n${mobileContainer}\n\n`
  })

  // 2. Pre-process custom [python] tags
  const processedMd = tableProcessedMd.replace(/\[python\]([\s\S]*?)\[\/python\]/g, (_match, code) => {
    const trimmedCode = code.trim();
    // btoa is available in browser environments, for Node/Build-time we might need Buffer
    // However, mdToHtml might be called during build. Let's use    // Safe base64 for both browser and node
    let base64Code = '';
    try {
      if (typeof btoa !== 'undefined') {
        base64Code = btoa(unescape(encodeURIComponent(trimmedCode)));
      } else if (typeof (globalThis as any).Buffer !== 'undefined') {
        base64Code = (globalThis as any).Buffer.from(trimmedCode).toString('base64');
      } else {
        // Simple fallback
        base64Code = trimmedCode;
      }
    } catch (e) {
      console.error('Failed to encode python code:', e);
      base64Code = trimmedCode;
    }

    return `\n\n<div class="python-compiler-root" data-code="${base64Code}"></div>\n\n`;
  });

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolink, {
      behavior: 'append',
      properties: { className: ['anchor-link'], ariaLabel: 'Link to this section' }
    })
    .use(rehypePrism)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(processedMd)
  return String(file)
}
