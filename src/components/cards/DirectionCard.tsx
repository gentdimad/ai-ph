import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

interface DirectionCardProps {
    title: string
    link: string
    description: string
}

export default function DirectionCard({ title, link, description }: DirectionCardProps) {
    return (
        <Link
            to={link}
            className="group p-5 border border-app-border rounded-2xl transition-all duration-300 hover:bg-app-bg-soft flex justify-between items-center"
        >
            <div className="block ml-5">
                <div className="flex items-center">
                    <h3 className="text-2xl font-semibold group-hover:text-app-text transition-colors py-2 mb-1">
                        {title}
                    </h3>
                    <ArrowRightIcon className="w-6 h-6 ml-2 text-app-muted group-hover:text-app-text transition-colors" />
                </div>
                <p className="text-app-muted text-sm">
                    {description}
                </p>
            </div>
        </Link>
    )
}
