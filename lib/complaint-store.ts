import type { Complaint, ComplaintStatus } from './complaints'

/**
 * Temporary in-memory data layer so the UI is fully interactive.
 * Replace these functions with calls to the existing NagrikFix backend/database;
 * every page and server action goes through this module only.
 */
const globalStore = globalThis as unknown as { __nagrikfixStore?: Map<string, Complaint> }
const store = (globalStore.__nagrikfixStore ??= new Map<string, Complaint>())

function generateId() {
  const year = new Date().getFullYear()
  const random = Math.floor(100000 + Math.random() * 900000)
  return `NF-${year}-${random}`
}

export async function listComplaints(filter?: { status?: ComplaintStatus; query?: string }) {
  const query = filter?.query?.trim().toLowerCase()
  return [...store.values()]
    .filter((c) => (filter?.status ? c.status === filter.status : true))
    .filter((c) =>
      query
        ? [c.id, c.title, c.location, c.ward].some((field) => field.toLowerCase().includes(query))
        : true,
    )
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export async function getComplaint(id: string) {
  return store.get(id.trim().toUpperCase()) ?? null
}

export async function createComplaint(
  input: Omit<Complaint, 'id' | 'status' | 'createdAt' | 'updates'>,
) {
  let id = generateId()
  while (store.has(id)) id = generateId()
  const now = new Date().toISOString()
  const complaint: Complaint = {
    ...input,
    id,
    status: 'received',
    createdAt: now,
    updates: [{ status: 'received', note: 'Complaint registered and routed to the ward office.', at: now }],
  }
  store.set(id, complaint)
  return complaint
}

export async function updateComplaintStatus(id: string, status: ComplaintStatus, note: string) {
  const complaint = store.get(id)
  if (!complaint) return null
  complaint.status = status
  complaint.updates.push({ status, note, at: new Date().toISOString() })
  return complaint
}
