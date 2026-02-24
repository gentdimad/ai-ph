export default function Skeleton({ className = "" }: { className?: string }) {
    return (
        <div className={`bg-app-bg-soft rounded animate-pulse ${className}`}></div>
    )
}
