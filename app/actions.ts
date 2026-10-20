'use server'

import { revalidatePath } from 'next/cache'
import { createComplaint, updateComplaintStatus } from '@/lib/complaint-store'
import { isCategory, isStatus } from '@/lib/complaints'

export type ReportState =
  | { status: 'idle' }
  | { status: 'error'; message: string; fieldErrors: Record<string, string>; values: Record<string, string> }
  | { status: 'success'; id: string }

const clean = (value: FormDataEntryValue | null, max: number) =>
  String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, max)

export async function submitComplaint(_prev: ReportState, formData: FormData): Promise<ReportState> {
  const values = {
    title: clean(formData.get('title'), 120),
    category: clean(formData.get('category'), 40),
    description: String(formData.get('description') ?? '').trim().slice(0, 2000),
    location: clean(formData.get('location'), 200),
    ward: clean(formData.get('ward'), 60),
    reporterName: clean(formData.get('reporterName'), 80),
    reporterPhone: clean(formData.get('reporterPhone'), 15),
  }

  const fieldErrors: Record<string, string> = {}
  if (values.title.length < 5) fieldErrors.title = 'Give the issue a short title (at least 5 characters).'
  if (!isCategory(values.category)) fieldErrors.category = 'Choose the category that best fits.'
  if (values.description.length < 20)
    fieldErrors.description = 'Describe the problem in at least 20 characters so the team can act on it.'
  if (values.location.length < 5) fieldErrors.location = 'Add a street, landmark, or area.'
  if (!values.ward) fieldErrors.ward = 'Enter your ward or locality.'
  if (values.reporterName.length < 2) fieldErrors.reporterName = 'Enter your name.'
  if (values.reporterPhone && !/^[6-9]\d{9}$/.test(values.reporterPhone))
    fieldErrors.reporterPhone = 'Enter a valid 10-digit mobile number.'

  if (Object.keys(fieldErrors).length > 0 || !isCategory(values.category)) {
    return { status: 'error', message: 'Please fix the highlighted fields.', fieldErrors, values }
  }

  const complaint = await createComplaint({
    ...values,
    category: values.category,
    reporterPhone: values.reporterPhone || undefined,
  })
  revalidatePath('/staff')
  return { status: 'success', id: complaint.id }
}

export async function changeComplaintStatus(formData: FormData) {
  const id = clean(formData.get('id'), 40)
  const status = formData.get('status')
  const note = clean(formData.get('note'), 280)
  if (!id || !isStatus(status)) return
  await updateComplaintStatus(id, status, note || 'Status updated by ward staff.')
  revalidatePath('/staff')
  revalidatePath('/track')
}
