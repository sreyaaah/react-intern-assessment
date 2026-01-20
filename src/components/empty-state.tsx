import type { LucideIcon } from "lucide-react"
import { Button } from "./ui/button"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-white/60 backdrop-blur-sm rounded-xl border border-white/40 shadow-sm mx-auto max-w-lg mt-8">
      <div className="rounded-full bg-white/80 p-6 mb-4 shadow-inner">
        <Icon className="h-12 w-12 text-orange-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 max-w-md mb-6 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  )
}
