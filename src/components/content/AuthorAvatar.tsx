type Props = { name: string; avatarUrl?: string; size?: number }

export default function AuthorAvatar({ name, avatarUrl, size = 36 }: Props) {
  const initials = name.split(' ').map(p => p[0]).join('').slice(0,2).toUpperCase()
  return (
    <div className="flex items-center" aria-label={`Author ${name}`}>
      {avatarUrl ? (
        <img src={avatarUrl} alt={name} width={size} height={size} style={{ borderRadius: '50%', marginRight: 8 }} />
      ) : (
        <div style={{ width: size, height: size, borderRadius: '50%', background: 'var(--color-bg-soft)', border: '1px solid var(--color-border)', display: 'grid', placeItems: 'center', marginRight: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--color-muted)' }}>{initials}</span>
        </div>
      )}
      <span>{name}</span>
    </div>
  )
}
