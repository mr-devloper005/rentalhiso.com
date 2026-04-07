import type { ReactNode } from 'react'

export function ListingInnerPage({
  title,
  description,
  actions,
  children,
}: {
  title: string
  description?: string
  actions?: ReactNode
  children: ReactNode
}) {
  return (
    <>
      <section className="border-b border-border bg-[#fffefb]">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h1
                className="text-3xl font-semibold tracking-tight text-atlas-ink sm:text-4xl"
                style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
              >
                {title}
              </h1>
              {description ? <p className="mt-2 text-muted-foreground">{description}</p> : null}
            </div>
            {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
          </div>
        </div>
      </section>
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8">{children}</div>
    </>
  )
}
