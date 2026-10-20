import type { Metadata } from 'next'
import { SearchX } from 'lucide-react'
import { PageIntro } from '@/components/page-intro'
import { ComplaintTimeline } from '@/components/track/complaint-timeline'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/field'
import { getComplaint } from '@/lib/complaint-store'

export const metadata: Metadata = {
  title: 'Track a complaint',
  description: 'Check the latest status of your NagrikFix complaint using its ID.',
}

export default async function TrackPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const { id } = await searchParams
  const query = id?.trim().slice(0, 40) ?? ''
  const complaint = query ? await getComplaint(query) : null

  return (
    <>
      <PageIntro
        eyebrow="Track a complaint"
        title="Check the status of your report"
        description="Enter the complaint ID you received after submitting, for example NF-2026-123456."
      />
      <div className="container-page max-w-3xl py-12 md:py-16">
        <form role="search" action="/track" className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor="complaint-id" className="sr-only">
            Complaint ID
          </label>
          <Input
            id="complaint-id"
            name="id"
            defaultValue={query}
            placeholder="NF-2026-123456"
            autoCapitalize="characters"
            spellCheck={false}
            className="font-mono uppercase placeholder:normal-case"
            required
          />
          <Button type="submit" className="h-11 sm:w-36">
            Track
          </Button>
        </form>

        <div className="mt-10" aria-live="polite">
          {query && !complaint && (
            <div className="flex flex-col items-center rounded-xl border border-dashed border-input bg-card px-6 py-12 text-center">
              <SearchX aria-hidden="true" className="size-8 text-muted-foreground" />
              <h2 className="mt-4 font-semibold text-foreground">No complaint found</h2>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                {'We couldn\'t find '}
                <span className="font-mono text-foreground">{query.toUpperCase()}</span>
                . Check the ID for typos and try again.
              </p>
            </div>
          )}
          {complaint && <ComplaintTimeline complaint={complaint} />}
        </div>
      </div>
    </>
  )
}
