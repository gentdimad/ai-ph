import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

interface PageHeaderProps {
    title: string
    description?: string
    showBack?: boolean
}

export default function PageHeader({ title, description, showBack = true }: PageHeaderProps) {
    const navigate = useNavigate()

    return (
        <div className="mb-16">
            {showBack && (
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-app-muted hover:text-app-text mt-4 mb-2 transition-colors"
                    aria-label="Go back"
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                    Back
                </button>
            )}
            <div className="mt-10 text-5xl font-black mb-6 leading-tight text-app-text">
                {title}
            </div>
            {description && (
                <p className="text-xl text-app-muted max-w-3xl leading-relaxed">
                    {description}
                </p>
            )}
        </div>
    )
}
