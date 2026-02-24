import React from 'react'
import Container from './Container'
import Shell from './Shell'

export default function Page({ children, fluid = false }: { children: React.ReactNode, fluid?: boolean }) {
  return (
    <div className="page">
      {/*<Header/>*/}
      <Shell>
        <main className="px-4 sm:px-8 md:px-12 lg:px-16">
          <Container className={fluid ? 'max-w-none' : ''}>
            {children}
          </Container>
        </main>
      </Shell>
    </div>
  )
}
