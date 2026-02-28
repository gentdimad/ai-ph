// Centralized site configuration and monochrome theme tokens
// Modify values here to change site-wide metadata and colors.

export const site = {
  siteName: 'AI PH',
  tagline: 'A website dedicated to help the Philippines with AI adoption by providing guidance to aspiring software developers and non-technical workers.',
  description: 'A blog about AI for the Philippines',
  url: 'https://gentdimad.github.io/ai_ph',
  developer: {
    name: 'AI PH',
    website: 'https://gentdimad.github.io/ai_ph',
    twitter: '',
    github: 'gentdimad',
    email: 'victorygingoyon@gmail.com'
  },
  contact: {
    email: 'victorygingoyon@gmail.com'
  },
  // Theme tokens: minimalist monochrome. Adjust just these to re-skin quickly.
  theme: {
    // base grayscale palette
    '--color-bg': '#0a0a0a',
    '--color-bg-soft': '#111111',
    '--color-elev': '#161616',
    '--color-border': '#2a2a2a',
    '--color-text': '#eaeaea',
    '--color-muted': '#b5b5b5',
    '--color-accent': '#ffffff',

    // spacing scale (in rem)
    '--space-1': '0.25rem',
    '--space-2': '0.5rem',
    '--space-3': '0.75rem',
    '--space-4': '1rem',
    '--space-5': '1.5rem',
    '--space-6': '2rem',
    '--space-7': '3rem',
    '--space-8': '4rem',

    // typography
    '--font-sans': "'Inter', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    '--font-mono': "'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    '--radius': '10px',
    '--max-width': '100%',
    '--color-code-bg': '#0f0f0f',
    '--color-code-text': '#eaeaea',
    '--color-brand': '#e05030',
  },
  themeLight: {
    '--color-bg': '#ffffff',
    '--color-bg-soft': '#f6f6f6',
    '--color-elev': '#fefefe',
    '--color-border': '#e5e5e5',
    '--color-text': '#111111',
    '--color-muted': '#606060',
    '--color-accent': '#000000',
    '--color-code-bg': '#f3f3f3',
    '--color-code-text': '#111111',
    '--color-brand': '#c04020'
  }
} as const

export type SiteConfig = typeof site

export function applyTheme(mode: 'dark' | 'light' = 'dark') {
  const root = document.documentElement
  const base = site.theme
  Object.entries(base).forEach(([k, v]) => root.style.setProperty(k, v as string))
  if (mode === 'light') {
    Object.entries(site.themeLight).forEach(([k, v]) => root.style.setProperty(k, v as string))
    root.setAttribute('data-theme', 'light')
  } else {
    root.removeAttribute('data-theme')
  }
}
