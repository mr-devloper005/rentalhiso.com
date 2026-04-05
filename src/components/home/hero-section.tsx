'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Compass, MapPin, Search, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ContentImage } from '@/components/shared/content-image'
import { SITE_CONFIG } from '@/lib/site-config'
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
    <section className="relative overflow-hidden border-b border-[rgba(33,58,95,0.12)] bg-[#0f1724] text-white">
      <div className="absolute inset-0">
        <ContentImage
          key={slides[activeIndex]}
          src={slides[activeIndex]}
          alt={`Featured visual ${activeIndex + 1} from ${SITE_CONFIG.name}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          intrinsicWidth={1600}
          intrinsicHeight={900}
        />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(92deg,rgba(10,18,30,0.92)_0%,rgba(10,18,30,0.82)_40%,rgba(10,18,30,0.62)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(110,168,255,0.22),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(240,179,71,0.18),transparent_28%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f5f1e9] via-[#f5f1e9]/70 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 pb-22 pt-12 sm:px-6 lg:px-8 lg:pb-26 lg:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/82 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-[#f0b347]" />
              {siteContent.hero.badge}
            </div>

            <h1 className="mt-6 max-w-4xl text-balance text-5xl font-semibold leading-[0.95] text-white sm:text-6xl lg:text-[4.75rem]">
              {siteContent.hero.title[0]}
              <span className="block text-[#dbe9ff]">{siteContent.hero.title[1]}</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
              {siteContent.hero.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-[#f0b347] px-7 text-sm font-semibold text-[#0f1724] shadow-[0_20px_44px_rgba(240,179,71,0.26)] hover:bg-[#e2a430]"
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
                className="h-12 rounded-full border-white/18 bg-white/8 px-7 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/12 hover:text-white"
              >
                <Link href={siteContent.hero.secondaryCta.href}>{siteContent.hero.secondaryCta.label}</Link>
              </Button>
            </div>

            <div className="mt-10 max-w-3xl rounded-[1.9rem] border border-white/10 bg-white/96 p-3 shadow-[0_28px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl">
              <form action="/search" className="flex flex-col gap-3 md:flex-row md:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6b7280]" />
                  <input
                    name="q"
                    placeholder={siteContent.hero.searchPlaceholder}
                    className="h-15 w-full rounded-[1.45rem] border border-[rgba(28,55,90,0.12)] bg-[#fbfaf6] pl-14 pr-4 text-base text-[#132238] outline-none transition placeholder:text-[#8892a0] focus:border-[#305a94]/40"
                  />
                </div>
                <Button
                  type="submit"
                  className="h-15 rounded-[1.45rem] bg-[#305a94] px-8 text-base font-semibold text-white hover:bg-[#274b7c]"
                >
                  Search
                </Button>
              </form>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/72">
              <span className="font-semibold uppercase tracking-[0.22em] text-white/86">{siteContent.hero.focusLabel}</span>
              {SITE_CONFIG.tasks
                .filter((task) => task.enabled)
                .slice(0, 5)
                .map((task) => (
                  <Link key={task.key} href={task.route} className="transition hover:text-[#f7d488]">
                    {task.label}
                  </Link>
                ))}
            </div>
          </div>

          <div className="relative lg:pl-4">
            <div className="rental-panel rounded-[2rem] p-4 md:p-5">
              <div className="relative overflow-hidden rounded-[1.55rem] border border-white/10 bg-[#112037]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <ContentImage
                    src={slides[activeIndex]}
                    alt={`Featured slide ${activeIndex + 1}`}
                    fill
                    sizes="(max-width: 1024px) 90vw, 38vw"
                    className="object-cover"
                    intrinsicWidth={960}
                    intrinsicHeight={1200}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(9,16,26,0.95)] via-[rgba(9,16,26,0.3)] to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 text-left">
                  <div className="inline-flex items-center rounded-full bg-white/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80 backdrop-blur-md">
                    {siteContent.hero.featureCardBadge}
                  </div>
                  <p className="mt-4 max-w-xs text-2xl font-semibold leading-tight text-white sm:text-3xl">
                    {siteContent.hero.featureCardTitle}
                  </p>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-white/72">
                    {siteContent.hero.featureCardDescription}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {siteContent.hero.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-[1.3rem] border border-[rgba(48,90,148,0.14)] bg-[rgba(255,255,255,0.92)] px-4 py-3 text-[#15253b] shadow-sm">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#627086]">{metric.label}</p>
                    <p className="mt-2 text-sm font-semibold leading-5">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-white/72">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-2 backdrop-blur-md">
                <MapPin className="h-3.5 w-3.5 text-[#f7d488]" />
                Location-led browsing
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-2 backdrop-blur-md">
                <Compass className="h-3.5 w-3.5 text-[#9dc2ff]" />
                Refined listing discovery
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
