const STEPS = [
  {
    title: 'Describe the issue',
    body: 'Choose a category, add the location and a short description. No account or app download required.',
  },
  {
    title: 'It reaches the right desk',
    body: 'Your complaint is routed to the ward office responsible for that area and type of work.',
  },
  {
    title: 'Follow it to resolution',
    body: 'Use your complaint ID to see every status change and note from the team, from review to completion.',
  },
]

export function HowItWorks() {
  return (
    <section aria-labelledby="how-heading" className="py-20 md:py-28">
      <div className="container-page">
        <div className="max-w-2xl">
          <h2 id="how-heading" className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            How NagrikFix works
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            A clear, accountable path from your report to a fix on the ground.
          </p>
        </div>
        <ol className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="flex flex-col bg-card p-8">
              <span className="font-mono text-sm font-medium text-teal">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-6 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
