import type { Metadata } from 'next'
import { PageIntro } from '@/components/page-intro'

export const metadata: Metadata = {
  title: 'About',
  description: 'Why NagrikFix exists and how it helps residents and municipal teams work together.',
}

const PRINCIPLES = [
  { title: 'Accountable', body: 'Every complaint gets a unique ID and a visible history, so nothing disappears into a queue.' },
  { title: 'Accessible', body: 'Works on any phone or computer, needs no login to report, and is built to accessibility standards.' },
  { title: 'Private by default', body: 'Your contact details are shared only with the ward team handling your complaint.' },
]

const FAQ = [
  {
    q: 'Do I need an account to report a problem?',
    a: 'No. You only need your name and the location of the issue. A mobile number is optional and helps staff contact you if they need details.',
  },
  {
    q: 'How do I check the status of my complaint?',
    a: 'After submitting, you receive a complaint ID such as NF-2026-123456. Enter it on the Track page to see the current status and every update.',
  },
  {
    q: 'How long does it take to resolve an issue?',
    a: 'It depends on the type of work. Minor repairs are often resolved within days; larger works may need scheduling. Status notes from staff explain what to expect.',
  },
  {
    q: 'What should I not report here?',
    a: 'Emergencies such as fires, accidents, or crimes. Please call 112 immediately for those.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About NagrikFix"
        title="A simpler way for citizens and cities to fix things together"
        description="NagrikFix turns everyday civic problems into clear, trackable work for the teams responsible — and keeps residents informed until the job is done."
      />
      <section aria-labelledby="principles-heading" className="container-page py-16 md:py-20">
        <h2 id="principles-heading" className="text-2xl font-bold tracking-tight text-primary">
          What we stand for
        </h2>
        <ul className="mt-8 grid gap-8 md:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <li key={p.title} className="border-t-2 border-primary pt-5">
              <h3 className="font-semibold text-foreground">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{p.body}</p>
            </li>
          ))}
        </ul>
      </section>
      <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-20 border-t border-border bg-secondary/60 py-16 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_2fr]">
          <h2 id="faq-heading" className="text-2xl font-bold tracking-tight text-primary">
            Frequently asked questions
          </h2>
          <div className="divide-y divide-border rounded-xl border border-border bg-card">
            {FAQ.map((item) => (
              <details key={item.q} className="group p-6 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-sm font-semibold text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/40">
                  {item.q}
                  <span aria-hidden="true" className="text-xl leading-none text-teal transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
