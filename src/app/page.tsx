import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Building2, Compass, MapPin } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { HeroSection } from '@/components/home/hero-section'
import { CTASection } from '@/components/home/cta-section'
import { TaskFeedSection } from '@/components/home/task-feed-section'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { fetchTaskPosts, getPostImages } from '@/lib/task-data'
import { siteContent } from '@/config/site.content'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/',
    title: siteContent.home.metadata.title,
    description: siteContent.home.metadata.description,
    openGraphTitle: siteContent.home.metadata.openGraphTitle,
    openGraphDescription: siteContent.home.metadata.openGraphDescription,
    image: SITE_CONFIG.defaultOgImage,
    keywords: [...siteContent.home.metadata.keywords],
  })
}

export default async function HomePage() {
  const taskFeed = (
    await Promise.all(
      SITE_CONFIG.tasks
        .filter((task) => task.enabled)
        .map(async (task) => ({
          task,
          posts: await fetchTaskPosts(task.key, task.key === 'listing' ? 6 : 4, {
            allowMockFallback: false,
            fresh: true,
          }),
        }))
    )
  ).filter(({ posts }) => posts.length)

  const heroImages = taskFeed
    .flatMap(({ posts }) => posts.flatMap((post) => getPostImages(post)))
    .filter(Boolean)
    .slice(0, 3)

  const listingFeed = taskFeed.find(({ task }) => task.key === 'listing')
  const listingCount = listingFeed?.posts.length || 0
  const listingLocations = Array.from(
    new Set(
      (listingFeed?.posts || [])
        .map((post) => {
          const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
          return typeof content.location === 'string' ? content.location : null
        })
        .filter(Boolean)
    )
  ).slice(0, 3) as string[]

  const orderedSections = [...taskFeed].sort((a, b) => {
    if (a.task.key === 'listing') return -1
    if (b.task.key === 'listing') return 1
    if (a.task.key === 'classified') return -1
    if (b.task.key === 'classified') return 1
    return 0
  })

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />
      <main>
        <HeroSection images={heroImages} />
        <SchemaJsonLd
          data={[
            {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: SITE_CONFIG.name,
              url: SITE_CONFIG.baseUrl,
              logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${SITE_CONFIG.defaultOgImage}`,
              sameAs: [],
            },
            {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: SITE_CONFIG.name,
              url: SITE_CONFIG.baseUrl,
              potentialAction: {
                '@type': 'SearchAction',
                target: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/search?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            },
          ]}
        />

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
            <div className="rental-panel rounded-[2rem] p-7 sm:p-8 lg:p-10">
              <span className="rental-label">{siteContent.home.introBadge}</span>
              <h2 className="rental-divider mt-5 pb-5 text-4xl font-semibold text-[#14253d] sm:text-5xl">
                {siteContent.home.introTitle}
              </h2>
              <div className="space-y-5 text-[15px] leading-8 text-[#526277] sm:text-base">
                {siteContent.home.introParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={siteContent.home.primaryLink.href}
                  className="inline-flex items-center gap-2 rounded-full bg-[#305a94] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#264775]"
                >
                  {siteContent.home.primaryLink.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={siteContent.home.secondaryLink.href}
                  className="inline-flex items-center gap-2 rounded-full border border-[rgba(48,90,148,0.14)] bg-white/75 px-5 py-3 text-sm font-semibold text-[#17304f] transition hover:bg-white"
                >
                  {siteContent.home.secondaryLink.label}
                </Link>
              </div>
            </div>

            <aside className="grid gap-4 self-start">
              <div className="rental-panel rounded-[2rem] p-6 sm:p-7">
                <span className="rental-label">{siteContent.home.sideBadge}</span>
                <ul className="mt-6 space-y-4 text-sm leading-7 text-[#526277]">
                  {siteContent.home.sidePoints.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-[#f0b347]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rental-panel rounded-[2rem] p-6 sm:p-7">
                <span className="rental-label">{SITE_CONFIG.name} at a glance</span>
                <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  <div className="rounded-[1.4rem] bg-white/80 p-4 shadow-sm">
                    <div className="flex items-center gap-2 text-[#305a94]">
                      <Building2 className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase tracking-[0.18em]">Visible listings</span>
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-[#14253d]">{listingCount || 'Fresh'}</p>
                  </div>
                  <div className="rounded-[1.4rem] bg-white/80 p-4 shadow-sm">
                    <div className="flex items-center gap-2 text-[#305a94]">
                      <MapPin className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase tracking-[0.18em]">Location cues</span>
                    </div>
                    <p className="mt-3 text-sm font-semibold leading-6 text-[#14253d]">{listingLocations.join(' · ') || 'Area-led discovery'}</p>
                  </div>
                  <div className="rounded-[1.4rem] bg-white/80 p-4 shadow-sm">
                    <div className="flex items-center gap-2 text-[#305a94]">
                      <Compass className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase tracking-[0.18em]">Browsing rhythm</span>
                    </div>
                    <p className="mt-3 text-sm font-semibold leading-6 text-[#14253d]">Directory-style first, guides second</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {orderedSections.map(({ task, posts }) => (
          <TaskFeedSection key={task.key} task={task} posts={posts} />
        ))}
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
