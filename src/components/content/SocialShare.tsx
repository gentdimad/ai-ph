type Props = { title: string; url?: string }

export default function SocialShare({ title, url }: Props) {
  const shareUrl = encodeURIComponent(url || (typeof location !== 'undefined' ? location.href : ''))
  const text = encodeURIComponent(title)
  return (
    <div className="text-[color:var(--color-muted)]" aria-label="Share">
      <a className="hover:underline" href={`https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`} target="_blank" rel="noreferrer">Twitter</a>
      {' · '}
      <a className="hover:underline" href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noreferrer">LinkedIn</a>
      {' · '}
      <a className="hover:underline" href={`mailto:?subject=${text}&body=${shareUrl}`}>Email</a>
    </div>
  )
}
