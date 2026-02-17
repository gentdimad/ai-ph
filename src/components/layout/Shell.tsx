import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { site } from '../../config/site'
import { DEFAULT_ROOT_PATH } from '../../router/routes'
import navItemsData from '../../config/nav.json'
import { HomeIcon, UserCircleIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

/**
 * Shell layout with a persistent, collapsible sidebar that wraps page content.
 * - Collapsed state is saved to localStorage under key 'shell:collapsed'.
 */
export default function Shell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('shell:collapsed')
      return saved === '1'
    } catch {
      return false
    }
  })

  function handleCollapse() {
    setCollapsed(v => !v)
  }

  useEffect(() => {
    try { localStorage.setItem('shell:collapsed', collapsed ? '1' : '0') } catch { }
  }, [collapsed])

  // Sidebar nav items come from JSON and an icon registry
  type NavItem = { icon: string; title: string; to: string }
  const navItems = (navItemsData as NavItem[])
  const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    home: HomeIcon,
    user: UserCircleIcon,
  }

  return (
    <div className={`${collapsed ? 'grid grid-cols-[68px_1fr]' : 'grid grid-cols-[260px_1fr]'} min-h-screen`}>
      <aside className="sticky top-0 self-start h-screen border-r border-[color:var(--color-border)] bg-[var(--color-bg-soft)] p-5 flex flex-col gap-4" aria-label="Sidebar">
        <div className="flex items-center justify-between">
          <Link to={DEFAULT_ROOT_PATH || '/'} className="inline-flex items-center gap-2 font-bold tracking-[0.3px]" aria-label={site.siteName}>
            <span className={`${collapsed ? 'hidden' : 'inline'}`}>{site.siteName}</span>
          </Link>
          <div className="h-6 w-6 px-1 py-1 border border-gray-700 rounded-md" onClick={handleCollapse}>
            {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </div>
        </div>
        {/*<div className={`${collapsed ? 'hidden' : 'block'}`}>*/}
        {/*  <SearchBar />*/}
        {/*</div>*/}
        <nav className="flex flex-col gap-1" aria-label="Primary">
          {navItems.map(item => {
            const Icon = iconMap[item.icon] || HomeIcon
            const isRoot = item.to === DEFAULT_ROOT_PATH || item.to === '/'
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={isRoot}
                className={({ isActive }) => `inline-flex items-center ${collapsed ? 'justify-center gap-0' : 'gap-2'} text-[color:var(--color-muted)] px-2 py-1 rounded ${isActive ? 'text-[color:var(--color-text)]' : ''}`}
              >
                <span className="w-8 h-8 rounded-md px-1 py-1 grid place-items-center" aria-hidden>
                  <Icon className="flex w-7 h-7" />
                </span>
                <span className={`${collapsed ? 'hidden' : 'inline'} ml-2`}>{item.title}</span>
              </NavLink>
            )
          })}
        </nav>
        <div className="mt-auto">
          <ThemeToggle />
        </div>
      </aside>
      <div className="min-w-0">
        {children}
      </div>
    </div>
  )
}
