
interface SkeletonProps {
  className?: string
  lines?: number
}

export function Skeleton({ className = '', lines = 1 }: SkeletonProps) {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-neutral-200 rounded mb-2 last:mb-0"
          style={{ width: `${Math.random() * 40 + 60}%` }}
        />
      ))}
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="card">
      <div className="animate-pulse">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-neutral-200 rounded-xl"></div>
          <div className="flex-1">
            <div className="h-4 bg-neutral-200 rounded mb-2 w-3/4"></div>
            <div className="h-3 bg-neutral-200 rounded w-1/2"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-neutral-200 rounded"></div>
          <div className="h-3 bg-neutral-200 rounded w-5/6"></div>
          <div className="h-3 bg-neutral-200 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  )
}

export function HistorySkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}

export function PricingSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="card">
          <div className="animate-pulse">
            <div className="text-center mb-6">
              <div className="h-6 bg-neutral-200 rounded mb-2 w-3/4 mx-auto"></div>
              <div className="h-8 bg-neutral-200 rounded w-1/2 mx-auto"></div>
            </div>
            <div className="space-y-3 mb-6">
              <div className="h-4 bg-neutral-200 rounded"></div>
              <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
              <div className="h-4 bg-neutral-200 rounded w-4/6"></div>
            </div>
            <div className="h-10 bg-neutral-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  )
}
