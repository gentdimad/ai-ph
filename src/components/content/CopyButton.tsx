import { useState } from 'react'

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      className="inline-flex items-center gap-2 bg-transparent text-[color:var(--color-text)] border border-[color:var(--color-border)] rounded-full px-3 py-2 hover:border-[color:var(--color-text)]"
      aria-live="polite"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text)
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        } catch {
            console.error('Failed to copy text');
        }
      }}
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  )
}
