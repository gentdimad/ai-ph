import React from 'react'
import { Link } from 'react-router-dom'
import { StarIcon } from '@heroicons/react/24/outline'

import staffPicksData from '../../content/team-picks/team-picks.json'
import topicsData from '../../content/recommended-topics/recommended-topics.json'

/**
 * Right-side Recommendations panel inspired by Medium.
 * Sections:
 *  - Staff Picks (list of small links)
 *  - Recommended topics (chips)
 *  - Who to follow (people list)
 * Sticky on large screens and scrollable.
 */
export default function RecommendationsList({ children }: { children: React.ReactNode }) {
  type StaffPick = { title: string; by?: string; to: string }
  type Topic = string

  const staffPicks: StaffPick[] = staffPicksData
  const topics: Topic[] = topicsData

  const [searchBar, ...postContent] = React.Children.toArray(children)

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_minmax(260px,320px)]">
      <div className="min-w-0">{postContent}</div>
      <aside className="hidden lg:block" aria-label="Recommendations">
        <div className="-mt-8 mb-4 pl-5">{searchBar}</div>
        <div className="sticky top-20">
          <div className="border-l border-[color:var(--color-border)] pl-5">
            <div className="border border-[color:var(--color-border)] bg-[var(--color-bg-soft)] rounded-[var(--radius)] p-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
              {/* Staff Picks */}
              <section aria-label="Staff Picks">
                <header className="flex items-center gap-2 text-sm mb-3">
                  <StarIcon className="w-4 h-4 text-[color:var(--color-text)]" />
                  <strong className="text-[color:var(--color-text)]">Staff Picks</strong>
                </header>
                <ul className="list-none p-0 m-0 space-y-3">
                  {staffPicks.map((pick) => (
                    <li key={pick.title}>
                      <Link className="block hover:underline" to={pick.to}>
                        <div className="text-[0.9rem] text-[color:var(--color-text)] leading-snug">{pick.title}</div>
                        {pick.by && (
                          <div className="text-[0.8rem] text-[color:var(--color-muted)]">{pick.by}</div>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>

              </section>

              {/* Divider */}
              <hr className="my-4 border-[color:var(--color-border)]" />

              {/* Recommended topics */}
              <section aria-label="Recommended topics">
                <header className="text-sm mb-3">
                  <strong className="text-[color:var(--color-text)]">Recommended topics</strong>
                </header>
                <div className="flex flex-wrap gap-2">
                  {topics.map((topic) => (
                    <Link
                      key={topic}
                      to={`/tag/${encodeURIComponent(topic)}`}
                      className="inline-flex items-center rounded-full border border-[color:var(--color-border)] px-3 py-1 text-[0.85rem] text-[color:var(--color-text)] hover:border-[color:var(--color-text)]"
                    >
                      {topic}
                    </Link>
                  ))}
                </div>
                {/* <div className="mt-3 text-[0.85rem]"><Link className="hover:underline text-[color:var(--color-muted)]" to="/">See more topics</Link></div> */}
              </section>

              {/* Divider */}
              <hr className="my-4 border-[color:var(--color-border)]" />

              {/* Who to follow */}
              {/* <section aria-label="Who to follow">
                <header className="text-sm mb-3">
                  <strong className="text-[color:var(--color-text)]">Who to follow</strong>
                </header>
                <ul className="list-none p-0 m-0 space-y-3">
                  {people.map((p) => (
                    <li key={p.name} className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full grid place-items-center border border-[color:var(--color-border)]" aria-hidden>
                        <UserCircleIcon className="w-5 h-5" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-[0.95rem] text-[color:var(--color-text)] leading-tight">{p.name}</div>
                        {p.handle && <div className="text-[0.8rem] text-[color:var(--color-muted)]">{p.handle}</div>}
                      </div>
                      <div className="ml-auto">
                        <Link
                          to={p.to}
                          className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border)] px-3 py-1 text-[0.85rem] text-[color:var(--color-text)] hover:border-[color:var(--color-text)]"
                        >
                          Follow
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </section> */}
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
