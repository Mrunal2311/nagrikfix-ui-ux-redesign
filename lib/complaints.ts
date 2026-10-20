export const CATEGORIES = [
  { value: 'roads', label: 'Roads & potholes' },
  { value: 'streetlights', label: 'Streetlights' },
  { value: 'sanitation', label: 'Garbage & sanitation' },
  { value: 'water', label: 'Water supply & leakage' },
  { value: 'drainage', label: 'Drainage & flooding' },
  { value: 'other', label: 'Other civic issue' },
] as const

export type CategoryValue = (typeof CATEGORIES)[number]['value']

export const STATUSES = [
  { value: 'received', label: 'Received' },
  { value: 'in_review', label: 'Under review' },
  { value: 'in_progress', label: 'Work in progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'rejected', label: 'Closed — not actionable' },
] as const

export type ComplaintStatus = (typeof STATUSES)[number]['value']

export type ComplaintUpdate = {
  status: ComplaintStatus
  note: string
  at: string
}

export type Complaint = {
  id: string
  title: string
  category: CategoryValue
  description: string
  location: string
  ward: string
  reporterName: string
  reporterPhone?: string
  status: ComplaintStatus
  createdAt: string
  updates: ComplaintUpdate[]
}

export function categoryLabel(value: string) {
  return CATEGORIES.find((c) => c.value === value)?.label ?? value
}

export function statusLabel(value: string) {
  return STATUSES.find((s) => s.value === value)?.label ?? value
}

export function isStatus(value: unknown): value is ComplaintStatus {
  return STATUSES.some((s) => s.value === value)
}

export function isCategory(value: unknown): value is CategoryValue {
  return CATEGORIES.some((c) => c.value === value)
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso))
}
