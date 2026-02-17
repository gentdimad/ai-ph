import React from 'react'
import Container from './Container'
import Shell from './Shell'

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="page">
      {/*<Header/>*/}
      <Shell>
        <main className="py-20 px-40">
          <Container>
            {children}
          </Container>
        </main>
      </Shell>
    </div>
  )
}
