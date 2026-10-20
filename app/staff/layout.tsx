import type { Metadata } from 'next'
import Link from 'next/link'
import { Logo } from '@/components/logo'

export const metadata: Metadata = {
  title: 'Staff dashboard',
  robots: { index: false, follow: false },
}

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-secondary/50">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="hidden h-5 w-px bg-border sm:block" aria-hidden="true" />
            <span className="hidden text-sm font-medium text-muted-foreground sm:block">Ward operations</span>
          </div>
          <Link href="/" className="rounded-sm text-sm font-medium text-muted-foreground outline-none hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/40">
            Public site
          </Link>
        </div>
      </header>
      <main id="main" className="mx-auto w-full max-w-7xl flex-1 px-5 py-8 sm:px-8">
        {children}
      </main>
    </div>
  )
}
