'use client'

import Link from 'next/link'
import { useActionState, useEffect, useRef } from 'react'
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'
import { submitComplaint, type ReportState } from '@/app/actions'
import { Button, buttonVariants } from '@/components/ui/button'
import { Field, Input, Select, Textarea } from '@/components/ui/field'
import { CATEGORIES } from '@/lib/complaints'

const initialState: ReportState = { status: 'idle' }

export function ReportForm() {
  const [state, formAction, pending] = useActionState(submitComplaint, initialState)
  const alertRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (state.status !== 'idle') alertRef.current?.focus()
  }, [state])

  if (state.status === 'success') {
    return (
      <div
        ref={alertRef}
        tabIndex={-1}
        role="status"
        className="rounded-xl border border-success/25 bg-card p-8 shadow-card outline-none"
      >
        <CheckCircle2 aria-hidden="true" className="size-8 text-success" />
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-primary">Complaint registered</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Save this complaint ID. You&apos;ll need it to check progress.
        </p>
        <p className="mt-6 inline-block rounded-md border border-border bg-secondary px-4 py-3 font-mono text-lg font-medium tracking-wide text-primary">
          {state.id}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/track?id=${state.id}`} className={buttonVariants()}>
            Track this complaint
          </Link>
          <a href="/report" className={buttonVariants({ variant: 'outline' })}>
            Report another problem
          </a>
        </div>
      </div>
    )
  }

  const errors = state.status === 'error' ? state.fieldErrors : {}
  const values = state.status === 'error' ? state.values : {}

  return (
    <form action={formAction} noValidate className="rounded-xl border border-border bg-card p-6 shadow-card sm:p-8">
      {state.status === 'error' && (
        <div
          ref={alertRef}
          tabIndex={-1}
          role="alert"
          className="mb-8 flex items-start gap-3 rounded-md border border-destructive/25 bg-destructive/5 p-4 text-sm text-destructive outline-none"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          <p className="font-medium">{state.message}</p>
        </div>
      )}

      <fieldset className="grid gap-6">
        <legend className="mb-6 text-lg font-semibold text-foreground">About the issue</legend>
        <Field id="title" label="Short title" error={errors.title} hint="e.g. Streetlight not working near bus stop">
          {(p) => <Input {...p} name="title" defaultValue={values.title} maxLength={120} required />}
        </Field>
        <Field id="category" label="Category" error={errors.category}>
          {(p) => (
            <Select {...p} name="category" defaultValue={values.category ?? ''} required>
              <option value="" disabled>
                Select a category
              </option>
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </Select>
          )}
        </Field>
        <Field id="description" label="Description" error={errors.description} hint="What is wrong, how long it has been like this, and any safety risk.">
          {(p) => <Textarea {...p} name="description" defaultValue={values.description} maxLength={2000} required />}
        </Field>
      </fieldset>

      <fieldset className="mt-10 grid gap-6 border-t border-border pt-8 sm:grid-cols-2">
        <legend className="sr-only">Location</legend>
        <p aria-hidden="true" className="text-lg font-semibold text-foreground sm:col-span-2">
          Location
        </p>
        <Field id="location" label="Street or landmark" error={errors.location} className="sm:col-span-2">
          {(p) => <Input {...p} name="location" defaultValue={values.location} autoComplete="street-address" required />}
        </Field>
        <Field id="ward" label="Ward or locality" error={errors.ward}>
          {(p) => <Input {...p} name="ward" defaultValue={values.ward} required />}
        </Field>
      </fieldset>

      <fieldset className="mt-10 grid gap-6 border-t border-border pt-8 sm:grid-cols-2">
        <legend className="sr-only">Your details</legend>
        <p aria-hidden="true" className="text-lg font-semibold text-foreground sm:col-span-2">
          Your details
        </p>
        <Field id="reporterName" label="Full name" error={errors.reporterName}>
          {(p) => <Input {...p} name="reporterName" defaultValue={values.reporterName} autoComplete="name" required />}
        </Field>
        <Field id="reporterPhone" label="Mobile number" optional error={errors.reporterPhone} hint="Only shared with the ward team.">
          {(p) => (
            <Input
              {...p}
              name="reporterPhone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              defaultValue={values.reporterPhone}
              maxLength={10}
            />
          )}
        </Field>
      </fieldset>

      <div className="mt-10 flex flex-col-reverse gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">By submitting, you confirm the information is accurate.</p>
        <Button type="submit" size="lg" disabled={pending} aria-busy={pending}>
          {pending && <Loader2 aria-hidden="true" className="animate-spin" />}
          {pending ? 'Submitting…' : 'Submit complaint'}
        </Button>
      </div>
    </form>
  )
}
