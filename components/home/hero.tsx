import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="border-b border-border">
      <div className="container-page grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-teal">
            <span aria-hidden="true" className="h-px w-6 bg-teal" />
            Civic issue reporting
          </p>
          <h2
            id="hero-heading"
            className="mt-5 text-balance text-4xl font-bold leading-[1.08] tracking-tight text-primary sm:text-5xl lg:text-[3.5rem]"
          >
            See a problem in your street? Get it fixed.
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            NagrikFix sends your report straight to the ward team responsible for it, and gives you a complaint ID to follow every step until the work is done.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/report" className={buttonVariants({ size: 'lg' })}>
              Report a problem
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link href="/track" className={buttonVariants({ size: 'lg', variant: 'outline' })}>
              <Search aria-hidden="true" />
              Track a complaint
            </Link>
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
            {[
              { term: 'To file', detail: '2 min' },
              { term: 'Login needed', detail: 'None' },
              { term: 'Cost', detail: 'Free' },
            ].map((item) => (
              <div key={item.term}>
                <dt className="text-xs text-muted-foreground">{item.term}</dt>
                <dd className="mt-1 text-xl font-semibold text-primary">{item.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative">
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-raised">
            <Image
              src="/images/civic-street.png"
              alt="Illustration of a municipal worker repairing a streetlight on a neighbourhood street"
              width={1024}
              height={1024}
              priority
              className="aspect-[4/3.4] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-4 right-4 flex items-center gap-4 rounded-lg border border-border bg-card p-4 shadow-raised sm:left-auto sm:right-6 sm:w-72">
            <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-md bg-success-foreground">
              <span className="size-2 rounded-full bg-success" />
            </span>
            <div className="min-w-0">
              <p className="font-mono text-xs text-muted-foreground">NF-2026-418302</p>
              <p className="truncate text-sm font-semibold text-foreground">Streetlight repaired · Resolved</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
