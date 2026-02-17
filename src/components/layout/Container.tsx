import React from 'react'

export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="max-w-[1100px] px-4">{children}</div>
}
