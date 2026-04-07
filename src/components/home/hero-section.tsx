'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, MapPin, Search, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ContentImage } from '@/components/shared/content-image'
import { siteContent } from '@/config/site.content'

const FALLBACK_IMAGE = '/placeholder.svg?height=1400&width=2400'

export function HeroSection({ images }: { images: string[] }) {
  const slides = useMemo(() => {
    const valid = images.filter(Boolean)
    return valid.length ? valid.slice(0, 3) : [FALLBACK_IMAGE]
  }, [images])

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length)
    }, 5200)
    return () => window.clearInterval(timer)
  }, [slides])

  return (
    <section className="relative overflow-hidden border-b border-border marketplace-hero">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_-10%,rgba(130,180,64,0.12),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-20 lg:pt-14">
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              {siteContent.hero.badge}
            </div>

            <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-[var(--market-header)] sm:text-5xl lg:text-[3.25rem]">
              {siteContent.hero.title[0]}
              <span className="mt-1 block text-3xl font-bold text-foreground sm:text-4xl lg:text-[2.75rem]">
                {siteContent.hero.title[1]}
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {siteContent.hero.description}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="h-11 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/92"
              >
                <Link href={siteContent.hero.primaryCta.href}>
                  {siteContent.hero.primaryCta.label}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-11 rounded-md border-[var(--market-teal)] bg-white px-6 text-sm font-semibold text-[var(--market-teal)] shadow-sm hover:bg-secondary"
              >
                <Link href={siteContent.hero.secondaryCta.href}>{siteContent.hero.secondaryCta.label}</Link>
              </Button>
            </div>

            <div className="mt-10 max-w-2xl rounded-lg border border-border bg-white p-2 shadow-[0_8px_30px_rgba(15,23,42,0.08)]">
              <form action="/search" className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
                <input type="hidden" name="task" value="listing" />
                <div className="relative min-h-[52px] flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    name="q"
                    placeholder={siteContent.hero.searchPlaceholder}
                    className="h-[52px] w-full rounded-md border border-border bg-white pl-12 pr-4 text-base text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/25"
                  />
                </div>
                <Button
                  type="submit"
                  className="h-[52px] shrink-0 rounded-md bg-primary px-8 text-base font-semibold text-primary-foreground hover:bg-primary/92 sm:min-w-[140px]"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </form>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{siteContent.hero.focusLabel}:</span>
              <Link href="/listings" className="font-medium text-primary hover:underline">
                All listings
              </Link>
              <span className="text-border">|</span>
              <Link href="/search" className="hover:text-foreground">
                Advanced search
              </Link>
            </div>
          </div>

          <div className="relative lg:pt-2">
            <div className="rounded-lg border border-border bg-white p-3 shadow-[0_12px_40px_rgba(15,23,42,0.1)]">
              <div className="relative overflow-hidden rounded-md border border-border bg-muted">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <ContentImage
                    key={slides[activeIndex]}
                    src={slides[activeIndex]}
                    alt={`Featured listing ${activeIndex + 1}`}
                    fill
                    sizes="(max-width: 1024px) 90vw, 40vw"
                    className="object-cover"
                    intrinsicWidth={960}
                    intrinsicHeight={1200}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 text-left">
                  <div className="inline-flex rounded border border-white/25 bg-black/35 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                    {siteContent.hero.featureCardBadge}
                  </div>
                  <p className="mt-3 max-w-sm text-xl font-bold leading-snug text-white sm:text-2xl">
                    {siteContent.hero.featureCardTitle}
                  </p>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85">
                    {siteContent.hero.featureCardDescription}
                  </p>
                </div>
              </div>

              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {siteContent.hero.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-md border border-border bg-secondary/50 px-3 py-2.5 text-left shadow-sm"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{metric.label}</p>
                    <p className="mt-1 text-xs font-semibold text-foreground">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-white px-2.5 py-1.5 shadow-sm">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                Location-first cards
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-white px-2.5 py-1.5 shadow-sm">
                Marketplace layout
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
