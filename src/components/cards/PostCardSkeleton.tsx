import Skeleton from '../ui/Skeleton'

export default function PostCardSkeleton() {
    return (
        <div className="mt-4 p-5 border border-app-border rounded-[var(--radius)] bg-app-elev max-w-3xl">
            <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2'>
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-24 shrink-0" />
            </div>
            <div className="space-y-2 mt-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </div>
            <div className="mt-4 flex gap-2">
                <Skeleton className="h-5 w-14 rounded-full" />
                <Skeleton className="h-5 w-14 rounded-full" />
                <Skeleton className="h-5 w-14 rounded-full" />
            </div>
        </div>
    )
}
