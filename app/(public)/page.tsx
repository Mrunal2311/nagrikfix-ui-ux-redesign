import { RoleSelect } from '@/components/home/role-select'
import { Hero } from '@/components/home/hero'
import { HowItWorks } from '@/components/home/how-it-works'
import { IssueCategories } from '@/components/home/issue-categories'
import { ClosingCta } from '@/components/home/closing-cta'

export default function HomePage() {
  return (
    <>
      <RoleSelect />
      <Hero />
      <HowItWorks />
      <IssueCategories />
      <ClosingCta />
    </>
  )
}
