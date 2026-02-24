import type { Topic } from './types'

export const TOPICS: Topic[] = [
    {
        slug: 'python',
        title: 'Python',
        description: 'Python is essential when learning to make AI by yourself because the majority of libraries that are available for AI development are compatible and are found in Python.',
        directory: 'python'
    },
    {
        slug: 'data-science',
        title: 'Data Science',
        description: 'Master the art of data manipulation and analysis using powerful Python libraries like Pandas and NumPy.',
        directory: 'data-science'
    },
    {
        slug: 'statistics-probabilities',
        title: 'Statistics & Probabilities',
        description: 'Understand the mathematical foundations of AI through probability theory and statistical inference.',
        directory: 'statistics'
    },
    {
        slug: 'math',
        title: 'Mathematics',
        description: 'Mathematics is the foundation of AI, providing the tools and concepts necessary for understanding and developing AI models.',
        directory: 'math'
    },
    {
        slug: 'machine-learning',
        title: 'Machine Learning',
        description: 'Learn the core algorithms that allow machines to learn from data and make predictions.',
        directory: 'machine-learning'
    },
    {
        slug: 'large-language-models',
        title: 'Large Language Models',
        description: 'Dive into the world of Transformers, LLMs, and how they are changing natural language interaction.',
        directory: 'llm'
    },
    {
        slug: 'computer-vision',
        title: 'Computer Vision',
        description: 'Explore how AI interprets and understands the visual world, from image classification to object detection.',
        directory: 'computer-vision'
    },
    {
        slug: 'retrieval-augmented-generation',
        title: 'Retrieval Augmented Generation',
        description: 'Learn how to combine LLMs with external knowledge bases for more accurate and grounded AI responses.',
        directory: 'rag'
    },
    {
        slug: 'react-javascript',
        title: 'React (Javascript)',
        description: 'Build modern user interfaces for your AI applications using React and the Javascript ecosystem.',
        directory: 'react'
    },
    {
        slug: 'api-development',
        title: 'API Development',
        description: 'Create robust backends and APIs to serve your AI models to the world.',
        directory: 'api'
    },
    // AI Tools
    {
        slug: 'chatgpt',
        title: 'ChatGPT',
        description: 'Master the most popular conversational AI tool and learn how to integrate it into your workflow.',
        directory: 'tools/chatgpt'
    },
    {
        slug: 'claude-code',
        title: 'Claude Code',
        description: 'Explore Anthropic\'s AI tool specifically designed for coding and software development.',
        directory: 'tools/claude'
    },
    {
        slug: 'news',
        title: 'Latest AI News',
        description: 'Explore all the latest news and updates from the world of AI.',
        directory: 'news'
    },
    // AI News
    {
        slug: 'news-business',
        title: 'AI Business News',
        description: 'Stay updated with the latest in the AI business world, from market trends to company acquisitions.',
        directory: 'news/business'
    },
    {
        slug: 'news-workforce',
        title: 'AI Workforce News',
        description: 'How AI is reshaping the global workforce and the future of jobs.',
        directory: 'news/workforce'
    },
    {
        slug: 'news-tech',
        title: 'AI Tech News',
        description: 'The latest technical breakthroughs and advancements in AI research and development.',
        directory: 'news/tech'
    }
]
