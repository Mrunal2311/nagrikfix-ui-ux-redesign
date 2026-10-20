export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="border-b border-border">
      <div className="container-page py-12 md:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">{eyebrow}</p>
        <h1 className="mt-3 text-balance text-3xl font-bold tracking-tight text-primary sm:text-4xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
