import Link from 'next/link'
import { ArrowRight, Building2, UserRound } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const ROLES = [
  {
    id: 'citizen',
    title: 'I am a Citizen',
    description: 'Report civic issues in your area and track them until they are resolved.',
    href: '/report',
    icon: UserRound,
    iconClass: 'bg-teal text-white',
  },
  {
    id: 'official',
    title: 'I am a Government Official',
    description: 'Review, assign and resolve complaints raised in your jurisdiction.',
    href: '/staff',
    icon: Building2,
    iconClass: 'bg-primary text-primary-foreground',
  },
]

export function RoleSelect() {
  return (
    <section aria-labelledby="welcome-heading" className="border-b border-border bg-secondary/40">
      <div className="container-page py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h1
            id="welcome-heading"
            className="text-balance text-4xl font-bold tracking-tight text-primary sm:text-5xl"
          >
            Welcome to <span className="text-teal">NagrikFix</span>
          </h1>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Civic issue reporting and resolution for your city
          </p>
        </div>

        <ul className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          {ROLES.map((role) => {
            const Icon = role.icon
            return (
              <li
                key={role.id}
                className="flex flex-col rounded-xl border border-border bg-card p-8 shadow-raised transition-colors hover:border-teal/60"
              >
                <span
                  aria-hidden="true"
                  className={cn('grid size-16 place-items-center rounded-full', role.iconClass)}
                >
                  <Icon className="size-7" />
                </span>
                <h2 className="mt-6 text-2xl font-bold tracking-tight text-foreground">{role.title}</h2>
                <p className="mt-2 flex-1 text-pretty leading-relaxed text-muted-foreground">
                  {role.description}
                </p>
                <Link
                  href={role.href}
                  className={cn(buttonVariants({ size: 'lg' }), 'mt-8 w-full')}
                  aria-label={`Get started as ${role.id === 'citizen' ? 'a citizen' : 'a government official'}`}
                >
                  Get Started
                  <ArrowRight aria-hidden="true" />
                </Link>
              </li>
            )
          })}
        </ul>

        <p className="mt-8 text-center text-sm text-muted-foreground">Select your role to continue</p>
      </div>
    </section>
  )
}
