import Link from 'next/link'
import { ArrowUpRight, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteContent } from '@/config/site.content'
import { SITE_CONFIG } from '@/lib/site-config'

/** Narrow, text-first opening — no imagery, no split columns, no dark CTA styling. */
export function HomeOpening({
  listingCount,
  locations,
}: {
  listingCount: number
  locations: string[]
}) {
  return (
    <section className="border-b border-border bg-[#fdfcfa]">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="flex gap-2" aria-hidden>
          <span className="h-1 w-10 rounded-full bg-primary" />
          <span className="h-1 w-10 rounded-full bg-stone-300" />
          <span className="h-1 w-10 rounded-full bg-amber-200/90" />
        </div>

        <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
          {siteContent.hero.badge}
        </p>

        <h1
          className="mt-5 text-balance text-[2.35rem] font-semibold leading-[1.05] tracking-tight text-atlas-ink sm:text-5xl lg:text-[3.25rem]"
          style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
        >
          {siteContent.hero.title[0]} {siteContent.hero.title[1]}
        </h1>

        <p className="mt-8 max-w-xl text-[15px] leading-7 text-muted-foreground">{siteContent.hero.description}</p>

        <p className="mt-6 text-sm text-stone-500">
          <span className="tabular-nums font-semibold text-foreground">{listingCount || '—'}</span>
          <span className="font-normal text-muted-foreground"> listings in the catalog</span>
          {locations.length ? (
            <span className="text-muted-foreground"> · {locations.slice(0, 3).join(' · ')}</span>
          ) : null}
        </p>

        <form action="/search" className="mt-12 w-full max-w-2xl">
          <input type="hidden" name="task" value="listing" />
          <label className="sr-only" htmlFor="home-opening-search">
            Search listings
          </label>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
            <div className="relative min-w-0 flex-1">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-400"
                aria-hidden
              />
              <input
                id="home-opening-search"
                name="q"
                placeholder={siteContent.hero.searchPlaceholder}
                className="h-14 w-full rounded-2xl border-2 border-stone-200 bg-white pl-12 pr-4 text-base text-foreground shadow-[0_2px_24px_rgba(28,25,23,0.05)] outline-none transition placeholder:text-stone-400 focus:border-primary/45 focus:ring-4 focus:ring-primary/12"
              />
            </div>
            <Button type="submit" size="lg" className="h-14 shrink-0 rounded-2xl px-8 text-base font-semibold">
              Search
            </Button>
          </div>
        </form>

        <nav className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-border/80 pt-10 text-sm" aria-label="Quick links">
          <Link
            href={siteContent.hero.primaryCta.href}
            className="inline-flex items-center gap-1.5 font-semibold text-primary underline-offset-4 hover:underline"
          >
            {siteContent.hero.primaryCta.label}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            href="/create/listing"
            className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-primary"
          >
            Add a listing
            <ArrowUpRight className="h-3.5 w-3.5 opacity-70" />
          </Link>
          <Link
            href={siteContent.hero.secondaryCta.href}
            className="font-medium text-muted-foreground hover:text-foreground"
          >
            {siteContent.hero.secondaryCta.label}
          </Link>
          <Link href="/contact" className="font-medium text-muted-foreground hover:text-foreground">
            Contact
          </Link>
        </nav>

        <p className="mt-8 text-xs text-muted-foreground">{SITE_CONFIG.name}</p>
      </div>
    </section>
  )
}
