import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

export function ClosingCta() {
  return (
    <section aria-labelledby="cta-heading" className="py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-8 border-l-2 border-teal pl-6 md:flex-row md:items-center md:pl-10">
          <div className="max-w-xl">
            <h2 id="cta-heading" className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
              Better streets start with one report.
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Already filed a complaint? Enter your ID on the tracking page to see its latest status.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/report" className={buttonVariants({ size: 'lg' })}>
              Report a problem
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link href="/track" className={buttonVariants({ size: 'lg', variant: 'ghost' })}>
              Track a complaint
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
