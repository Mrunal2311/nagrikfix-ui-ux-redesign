'use client'

import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'
import { changeComplaintStatus } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Input, Select } from '@/components/ui/field'
import { STATUSES, type ComplaintStatus } from '@/lib/complaints'

function SaveButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" size="sm" className="h-9" disabled={pending} aria-busy={pending}>
      {pending && <Loader2 aria-hidden="true" className="animate-spin" />}
      Update
    </Button>
  )
}

export function StatusUpdateForm({ id, current }: { id: string; current: ComplaintStatus }) {
  return (
    <form action={changeComplaintStatus} className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <input type="hidden" name="id" value={id} />
      <label htmlFor={`status-${id}`} className="sr-only">
        Status for {id}
      </label>
      <Select id={`status-${id}`} name="status" defaultValue={current} className="h-9 text-sm sm:w-48">
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </Select>
      <label htmlFor={`note-${id}`} className="sr-only">
        Note for resident
      </label>
      <Input id={`note-${id}`} name="note" placeholder="Note for resident" maxLength={280} className="h-9 text-sm sm:w-56" />
      <SaveButton />
    </form>
  )
}
