import { statusLabel, type ComplaintStatus } from '@/lib/complaints'
import { cn } from '@/lib/utils'

const STYLES: Record<ComplaintStatus, string> = {
  received: 'bg-secondary text-primary ring-primary/15',
  in_review: 'bg-warning-foreground text-warning ring-warning/25',
  in_progress: 'bg-teal-soft text-accent-foreground ring-teal/25',
  resolved: 'bg-success-foreground text-success ring-success/25',
  rejected: 'bg-muted text-muted-foreground ring-border',
}

const DOTS: Record<ComplaintStatus, string> = {
  received: 'bg-primary',
  in_review: 'bg-warning',
  in_progress: 'bg-teal',
  resolved: 'bg-success',
  rejected: 'bg-muted-foreground',
}

export function StatusBadge({ status, className }: { status: ComplaintStatus; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset whitespace-nowrap',
        STYLES[status],
        className,
      )}
    >
      <span aria-hidden="true" className={cn('size-1.5 rounded-full', DOTS[status])} />
      {statusLabel(status)}
    </span>
  )
}
