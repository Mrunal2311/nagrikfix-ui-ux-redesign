'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Plus } from 'lucide-react'

export function ReportFab() {
  const pathname = usePathname()
  if (pathname.startsWith('/report')) return null

  return (
    <Link
      href="/report"
      aria-label="Report a new issue"
      className="fixed bottom-6 right-6 z-50 grid size-14 place-items-center rounded-full bg-teal text-white shadow-raised transition-transform outline-none hover:scale-105 focus-visible:ring-3 focus-visible:ring-ring/40"
    >
      <Plus aria-hidden="true" className="size-6" />
    </Link>
  )
}
