import Link from 'next/link'
import { Inbox } from 'lucide-react'
import { StatusUpdateForm } from '@/components/staff/status-update-form'
import { StatusBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/field'
import { listComplaints } from '@/lib/complaint-store'
import { STATUSES, categoryLabel, formatDate, isStatus } from '@/lib/complaints'
import { cn } from '@/lib/utils'

export default async function StaffDashboard({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>
}) {
  const params = await searchParams
  const status = isStatus(params.status) ? params.status : undefined
  const q = params.q?.slice(0, 80) ?? ''
  const [all, complaints] = await Promise.all([listComplaints(), listComplaints({ status, query: q })])

  const counts = {
    open: all.filter((c) => c.status === 'received' || c.status === 'in_review').length,
    inProgress: all.filter((c) => c.status === 'in_progress').length,
    resolved: all.filter((c) => c.status === 'resolved').length,
  }

  const filterHref = (value?: string) => {
    const sp = new URLSearchParams()
    if (value) sp.set('status', value)
    if (q) sp.set('q', q)
    const s = sp.toString()
    return s ? `/staff?${s}` : '/staff'
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-primary">Complaints</h1>
        <p className="mt-1 text-sm text-muted-foreground">Review incoming reports and keep residents updated.</p>
      </div>

      <dl className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Awaiting action', value: counts.open },
          { label: 'In progress', value: counts.inProgress },
          { label: 'Resolved', value: counts.resolved },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border bg-card p-5 shadow-card">
            <dt className="text-sm text-muted-foreground">{stat.label}</dt>
            <dd className="mt-2 text-3xl font-semibold tabular-nums text-primary">{stat.value}</dd>
          </div>
        ))}
      </dl>

      <section aria-label="Complaint list" className="rounded-lg border border-border bg-card shadow-card">
        <div className="flex flex-col gap-4 border-b border-border p-4 lg:flex-row lg:items-center lg:justify-between">
          <nav aria-label="Filter by status" className="-mx-1 flex gap-1 overflow-x-auto px-1">
            {[{ value: undefined, label: 'All' }, ...STATUSES].map((s) => (
              <Link
                key={s.label}
                href={filterHref(s.value)}
                aria-current={status === s.value ? 'page' : undefined}
                className={cn(
                  'inline-flex h-8 shrink-0 items-center rounded-md px-3 text-sm font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/40',
                  status === s.value ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                )}
              >
                {s.label}
              </Link>
            ))}
          </nav>
          <form role="search" action="/staff" className="flex gap-2">
            {status && <input type="hidden" name="status" value={status} />}
            <label htmlFor="staff-search" className="sr-only">
              Search complaints
            </label>
            <Input id="staff-search" name="q" defaultValue={q} placeholder="Search ID, title, ward…" className="h-9 w-full lg:w-64" />
            <Button type="submit" variant="outline" size="sm" className="h-9">
              Search
            </Button>
          </form>
        </div>

        {complaints.length === 0 ? (
          <div className="flex flex-col items-center px-6 py-16 text-center">
            <Inbox aria-hidden="true" className="size-8 text-muted-foreground" />
            <p className="mt-3 font-semibold text-foreground">No complaints to show</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {all.length === 0 ? 'New reports from residents will appear here.' : 'Try a different filter or search term.'}
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {complaints.map((c) => (
              <li key={c.id} className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-8">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-mono text-xs text-muted-foreground">{c.id}</span>
                    <StatusBadge status={c.status} />
                  </div>
                  <p className="mt-1.5 truncate font-semibold text-foreground">{c.title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {categoryLabel(c.category)} · {c.ward} · {formatDate(c.createdAt)}
                  </p>
                </div>
                <StatusUpdateForm id={c.id} current={c.status} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
