import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link
      href="/"
      className={cn(
        'inline-flex items-center gap-2.5 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/40',
        className,
      )}
      aria-label="NagrikFix home"
    >
      <span
        aria-hidden="true"
        className={cn(
          'grid size-8 place-items-center rounded-md',
          inverted ? 'bg-primary-foreground text-primary' : 'bg-primary text-primary-foreground',
        )}
      >
        <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 19V5l7 9V5" />
          <path d="M15 19v-7h4" className="text-teal" stroke="currentColor" />
        </svg>
      </span>
      <span className={cn('text-lg font-bold tracking-tight', inverted ? 'text-primary-foreground' : 'text-primary')}>
        Nagrik<span className={inverted ? 'text-teal-soft' : 'text-teal'}>Fix</span>
      </span>
    </Link>
  )
}
