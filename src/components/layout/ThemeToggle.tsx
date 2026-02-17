import { useEffect, useState } from 'react'
import { applyTheme } from '../../config/site'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

export default function ThemeToggle() {
  const [mode, setMode] = useState<'light' | 'dark'>(() => (document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'))

  useEffect(() => {
    applyTheme(mode)
    localStorage.setItem('theme', mode)
  }, [mode])

  function handleClick() {
    setMode(m => (m === 'light' ? 'dark' : 'light'))
  }

  const Icon = mode === 'light' ? SunIcon : MoonIcon

  return (
    <button
      type="button"
      aria-label={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      onClick={handleClick}
      className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[color:var(--color-border)] text-[color:var(--color-text)] bg-transparent hover:border-[color:var(--color-text)]"
      title={mode === 'light' ? 'Dark mode' : 'Light mode'}
    >
      <Icon className="w-7 h-7" />
    </button>
  )
}
