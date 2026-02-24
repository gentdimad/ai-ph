import Page from '../components/layout/Page'
import PageHeader from '../components/layout/PageHeader'
import TopicSections from '../components/sections/TopicSections'

export default function AIToolsPage() {
    return (
        <Page>
            <div className="max-w-7xl px-4">
                <PageHeader
                    title="Discover the latest AI tools"
                    description="Posts on latest AI tools, what they are for, and how to use them. (Coming soon)"
                />
                <TopicSections
                    sections={[
                        {
                            title: 'Ideation',
                            items: [
                                { slug: 'chatgpt' },
                                { text: 'Grok' },
                                { text: 'Google Gemini' }
                            ]
                        },
                        {
                            title: 'Generation',
                            items: [
                                { slug: 'claude-code' },
                                { text: 'Some specific generation tool' },
                                { slug: 'computer-vision' }
                            ]
                        },
                        {
                            title: 'Automation',
                            items: [
                                { text: 'n8n' },
                                { text: 'Fireflies AI' }
                            ]
                        }
                    ]}
                />
            </div>
        </Page>
    )
}
