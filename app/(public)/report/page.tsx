import type { Metadata } from 'next'
import { PageIntro } from '@/components/page-intro'
import { ReportForm } from '@/components/report/report-form'

export const metadata: Metadata = {
  title: 'Report a problem',
  description: 'Report a civic issue to your ward team and receive a complaint ID to track it.',
}

export default function ReportPage() {
  return (
    <>
      <PageIntro
        eyebrow="Report a problem"
        title="Tell us what needs fixing"
        description="Your report goes directly to the ward team responsible. You'll receive a complaint ID to track progress."
      />
      <div className="container-page grid gap-10 py-12 md:py-16 lg:grid-cols-[2fr_1fr]">
        <ReportForm />
        <aside className="h-fit rounded-xl border border-border bg-secondary/60 p-6 text-sm leading-relaxed text-muted-foreground lg:sticky lg:top-24">
          <h2 className="font-semibold text-foreground">Tips for a faster fix</h2>
          <ul className="mt-3 list-disc space-y-2 pl-4">
            <li>Mention a nearby landmark so the crew can find the spot.</li>
            <li>Describe the size or severity — e.g. &ldquo;pothole about 1 metre wide&rdquo;.</li>
            <li>Add your mobile number if you&apos;re happy to be contacted.</li>
          </ul>
          <p className="mt-5 border-t border-border pt-5">
            <strong className="text-foreground">Emergency?</strong> Call 112 instead.
          </p>
        </aside>
      </div>
    </>
  )
}
