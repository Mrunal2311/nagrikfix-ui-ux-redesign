import { Construction, Droplets, Lamp, Trash2, Waves, MapPin } from 'lucide-react'

const ITEMS = [
  { icon: Construction, title: 'Roads & potholes', body: 'Damaged roads, open manholes, broken footpaths.' },
  { icon: Lamp, title: 'Streetlights', body: 'Lights out, flickering, or damaged poles.' },
  { icon: Trash2, title: 'Garbage & sanitation', body: 'Missed pickups, overflowing bins, illegal dumping.' },
  { icon: Droplets, title: 'Water supply', body: 'Leaking pipes, low pressure, contaminated supply.' },
  { icon: Waves, title: 'Drainage & flooding', body: 'Blocked drains, waterlogging, sewage overflow.' },
  { icon: MapPin, title: 'Other civic issues', body: 'Encroachments, stray animals, public toilets.' },
]

export function IssueCategories() {
  return (
    <section aria-labelledby="categories-heading" className="border-y border-border bg-secondary/60 py-20 md:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div>
          <h2 id="categories-heading" className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            What you can report
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            NagrikFix covers the everyday services your municipality is responsible for. For fires, accidents or crime, call 112.
          </p>
        </div>
        <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {ITEMS.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex gap-4">
              <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-md border border-border bg-card text-primary">
                <Icon className="size-[18px]" strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
