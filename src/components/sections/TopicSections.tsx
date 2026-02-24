import { TopicPill, Pill } from '../cards/Pills'

export interface PillItem {
    slug?: string
    text?: string
}

export interface TopicSection {
    title: string
    items: PillItem[]
}

interface TopicSectionsProps {
    sections: TopicSection[]
    className?: string
}

export default function TopicSections({ sections, className = "" }: TopicSectionsProps) {
    return (
        <div className={`prose max-w-none ${className}`}>
            <div className="mt-16 space-y-12">
                {sections.map((section, idx) => (
                    <section key={idx}>
                        <h2 className="text-2xl font-bold mb-6 text-app-text">{section.title}</h2>
                        <div className="flex flex-wrap gap-4">
                            {section.items.map((item, i) => (
                                item.slug ? (
                                    <TopicPill key={item.slug} slug={item.slug} />
                                ) : (
                                    <Pill key={i} text={item.text || ''} />
                                )
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    )
}
