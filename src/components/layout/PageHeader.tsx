interface PageHeaderProps {
    title: string
    description?: string
}

export default function PageHeader({ title, description }: PageHeaderProps) {
    return (
        <div className="mb-16">
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
