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
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 640 : false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const effectiveCollapsed = collapsed || isMobile

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
    <div className={`grid ${collapsed ? 'grid-cols-[60px_1fr]' : 'grid-cols-[60px_1fr] sm:grid-cols-[220px_1fr]'} min-h-screen transition-[grid-template-columns] duration-300`}>
      <aside className="sticky top-0 self-start h-screen border-r border-[color:var(--color-border)] bg-[var(--color-bg-soft)] p-3 sm:p-5 flex flex-col gap-4" aria-label="Sidebar">
        <div className="flex items-center justify-between">
          <Link to={DEFAULT_ROOT_PATH || '/'} className="inline-flex items-center gap-2 font-bold tracking-[0.3px]" aria-label={site.siteName}>
            <span className={`${effectiveCollapsed ? 'hidden' : 'inline'}`}>{site.siteName}</span>
          </Link>
          {!isMobile && (
            <div className="h-6 w-6 px-1 py-1 border border-gray-700 rounded-md cursor-pointer hover:bg-gray-800 transition-colors" onClick={handleCollapse}>
              {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </div>
          )}
        </div>
        {/*<div className={`${effectiveCollapsed ? 'hidden' : 'block'}`}>*/}
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
                className={({ isActive }) => `inline-flex items-center ${effectiveCollapsed ? 'justify-center gap-0' : 'gap-2'} text-[color:var(--color-muted)] px-2 py-1 rounded hover:bg-[var(--color-elev)] transition-colors ${isActive ? 'text-[color:var(--color-text)] bg-[var(--color-elev)]' : ''}`}
              >
                <span className="w-8 h-8 rounded-md px-1 py-1 grid place-items-center" aria-hidden>
                  <Icon className="flex w-6 h-6 sm:w-7 sm:h-7" />
                </span>
                <span className={`${effectiveCollapsed ? 'hidden' : 'inline'} ml-2 text-sm`}>{item.title}</span>
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
