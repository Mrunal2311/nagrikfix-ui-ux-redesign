import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { ReportFab } from '@/components/report-fab'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <ReportFab />
    </div>
  )
}
