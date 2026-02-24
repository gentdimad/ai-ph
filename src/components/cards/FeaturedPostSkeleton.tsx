import Skeleton from '../ui/Skeleton'

export default function FeaturedPostSkeleton() {
    return (
        <div className="bg-app-bg border border-app-border rounded-2xl overflow-hidden max-w-4xl">
            <div className="p-10">
                <Skeleton className="h-3 w-32 mb-4" />
                <Skeleton className="h-14 w-full mb-3" />
                <Skeleton className="h-14 w-3/4 mb-6" />

                <div className="space-y-3 mb-8">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>

                <Skeleton className="h-8 w-48" />
            </div>
        </div>
    )
}
