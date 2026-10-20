import Link from 'next/link'
import { Logo } from '@/components/logo'

const LINKS = [
  {
    heading: 'For citizens',
    items: [
      { href: '/report', label: 'Report a problem' },
      { href: '/track', label: 'Track a complaint' },
    ],
  },
  {
    heading: 'NagrikFix',
    items: [
      { href: '/about', label: 'About the platform' },
      { href: '/about#faq', label: 'Frequently asked questions' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-primary text-primary-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo inverted />
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
            A public-service platform that helps residents report civic problems and follow them through to resolution with their municipal teams.
          </p>
        </div>
        {LINKS.map((group) => (
          <nav key={group.heading} aria-label={group.heading}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground/55">
              {group.heading}
            </h2>
            <ul className="mt-4 space-y-3">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-sm text-sm text-primary-foreground/85 outline-none hover:text-primary-foreground hover:underline underline-offset-4 focus-visible:ring-3 focus-visible:ring-teal-soft/50"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-primary-foreground/55 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} NagrikFix. Built for better neighbourhoods.</p>
          <p>For emergencies, call 112.</p>
        </div>
      </div>
    </footer>
  )
}
