import Page from '../components/layout/Page'
import PageHeader from '../components/layout/PageHeader'
import TopicSections from '../components/sections/TopicSections'

export default function LearnToBuildPage() {

    return (
        <Page>
            <div className="max-w-7xl px-4">
                <PageHeader
                    title="Learn to build AI Yourself"
                    description="So, you want to learn to make AI by yourself? Here are the tools and knowledge that you will need to succeed as an AI developer of today:"
                />
                <TopicSections
                    sections={[
                        {
                            title: 'Fundamentals',
                            items: [
                                { slug: 'python' },
                                { slug: 'data-science' },
                                { slug: 'statistics-probabilities' },
                                { slug: 'math' }
                            ]
                        },
                        {
                            title: 'Advanced',
                            items: [
                                { slug: 'machine-learning' },
                                { slug: 'large-language-models' },
                                { slug: 'computer-vision' },
                                { slug: 'retrieval-augmented-generation' }
                            ]
                        },
                        {
                            title: 'Optional',
                            items: [
                                { slug: 'react-javascript' },
                                { slug: 'api-development' }
                            ]
                        }
                    ]}
                />
            </div>
        </Page>
    )
}
