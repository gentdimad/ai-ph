import { useRef } from 'react'

export default function Prose({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)
  return <div ref={containerRef} className="prose">{children}</div>
}
