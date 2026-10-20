import 'server-only'
import { and, asc, desc, eq, ilike, inArray, or } from 'drizzle-orm'
import { db } from './db'
import { complaints, complaintUpdates } from './db/schema'
import type { CategoryValue, Complaint, ComplaintStatus, ComplaintUpdate } from './complaints'

function generateId() {
  const year = new Date().getFullYear()
  const random = Math.floor(100000 + Math.random() * 900000)
  return `NF-${year}-${random}`
}

type ComplaintRow = typeof complaints.$inferSelect
type UpdateRow = typeof complaintUpdates.$inferSelect

function toComplaint(row: ComplaintRow, updates: UpdateRow[]): Complaint {
  return {
    id: row.id,
    title: row.title,
    category: row.category as CategoryValue,
    description: row.description,
    location: row.location,
    ward: row.ward,
    reporterName: row.reporterName,
    reporterPhone: row.reporterPhone ?? undefined,
    status: row.status as ComplaintStatus,
    createdAt: row.createdAt.toISOString(),
    updates: updates.map(
      (u): ComplaintUpdate => ({
        status: u.status as ComplaintStatus,
        note: u.note,
        at: u.at.toISOString(),
      }),
    ),
  }
}

async function attachUpdates(rows: ComplaintRow[]) {
  if (rows.length === 0) return []
  const updates = await db
    .select()
    .from(complaintUpdates)
    .where(inArray(complaintUpdates.complaintId, rows.map((r) => r.id)))
    .orderBy(asc(complaintUpdates.at), asc(complaintUpdates.id))
  return rows.map((row) =>
    toComplaint(
      row,
      updates.filter((u) => u.complaintId === row.id),
    ),
  )
}

export async function listComplaints(filter?: { status?: ComplaintStatus; query?: string }) {
  const query = filter?.query?.trim()
  const pattern = query ? `%${query.replace(/[\\%_]/g, (c) => `\\${c}`)}%` : null
  const conditions = [
    filter?.status ? eq(complaints.status, filter.status) : undefined,
    pattern
      ? or(
          ilike(complaints.id, pattern),
          ilike(complaints.title, pattern),
          ilike(complaints.location, pattern),
          ilike(complaints.ward, pattern),
        )
      : undefined,
  ].filter(Boolean)

  const rows = await db
    .select()
    .from(complaints)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(complaints.createdAt))
    .limit(500)
  return attachUpdates(rows)
}

export async function getComplaint(id: string) {
  const [row] = await db
    .select()
    .from(complaints)
    .where(eq(complaints.id, id.trim().toUpperCase()))
    .limit(1)
  if (!row) return null
  const [complaint] = await attachUpdates([row])
  return complaint
}

export async function createComplaint(
  input: Omit<Complaint, 'id' | 'status' | 'createdAt' | 'updates'>,
) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const id = generateId()
    const [row] = await db
      .insert(complaints)
      .values({ ...input, reporterPhone: input.reporterPhone ?? null, id, status: 'received' })
      .onConflictDoNothing()
      .returning()
    if (!row) continue
    const [update] = await db
      .insert(complaintUpdates)
      .values({
        complaintId: id,
        status: 'received',
        note: 'Complaint registered and routed to the ward office.',
      })
      .returning()
    return toComplaint(row, [update])
  }
  throw new Error('Could not allocate a complaint ID')
}

export async function updateComplaintStatus(
  id: string,
  status: ComplaintStatus,
  note: string,
  staffUserId: string,
) {
  const [row] = await db
    .update(complaints)
    .set({ status })
    .where(eq(complaints.id, id))
    .returning({ id: complaints.id })
  if (!row) return null
  await db.insert(complaintUpdates).values({ complaintId: id, status, note, staffUserId })
  return row
}
