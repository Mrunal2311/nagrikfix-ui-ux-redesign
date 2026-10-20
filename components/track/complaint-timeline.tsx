import { StatusBadge } from '@/components/status-badge'
import { categoryLabel, formatDate, statusLabel, type Complaint } from '@/lib/complaints'
import { cn } from '@/lib/utils'

const PROGRESS = ['received', 'in_review', 'in_progress', 'resolved'] as const

export function ComplaintTimeline({ complaint }: { complaint: Complaint }) {
  const currentIndex = PROGRESS.indexOf(complaint.status as (typeof PROGRESS)[number])

  return (
    <article className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
      <header className="flex flex-col gap-4 border-b border-border p-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="font-mono text-sm text-muted-foreground">{complaint.id}</p>
          <h2 className="mt-1 text-xl font-semibold text-foreground text-pretty">{complaint.title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {categoryLabel(complaint.category)} · {complaint.location}, {complaint.ward}
          </p>
        </div>
        <StatusBadge status={complaint.status} className="self-start" />
      </header>

      {complaint.status !== 'rejected' && (
        <ol aria-label="Progress" className="grid grid-cols-4 gap-2 border-b border-border px-6 py-5">
          {PROGRESS.map((step, i) => (
            <li key={step} className="flex flex-col gap-2">
              <span className={cn('h-1 rounded-full', i <= currentIndex ? 'bg-teal' : 'bg-border')} />
              <span className={cn('text-xs', i <= currentIndex ? 'font-semibold text-foreground' : 'text-muted-foreground')}>
                {statusLabel(step)}
                {i === currentIndex && <span className="sr-only"> (current)</span>}
              </span>
            </li>
          ))}
        </ol>
      )}

      <div className="p-6">
        <h3 className="text-sm font-semibold text-foreground">Activity</h3>
        <ol className="mt-5 space-y-6">
          {[...complaint.updates].reverse().map((update, i) => (
            <li key={`${update.at}-${i}`} className="relative flex gap-4 pl-1">
              <span
                aria-hidden="true"
                className={cn('mt-1.5 size-2.5 shrink-0 rounded-full ring-4 ring-card', i === 0 ? 'bg-teal' : 'bg-input')}
              />
              <div>
                <p className="text-sm font-semibold text-foreground">{statusLabel(update.status)}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{update.note}</p>
                <time dateTime={update.at} className="mt-1 block text-xs text-muted-foreground">
                  {formatDate(update.at)}
                </time>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </article>
  )
}
