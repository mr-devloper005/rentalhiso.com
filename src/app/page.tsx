import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Building2, Compass, MapPin } from 'lucide-react'
import { HomeOpening } from '@/components/listing-site/home-opening'
import { ListingSiteShell } from '@/components/listing-site/listing-site-shell'
import { TaskFeedSection } from '@/components/home/task-feed-section'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { fetchTaskPosts } from '@/lib/task-data'
import { siteContent } from '@/config/site.content'
import { isTaskVisibleInUi } from '@/config/site.ui'

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
        .filter((task) => task.enabled && isTaskVisibleInUi(task.key))
        .map(async (task) => ({
          task,
          posts: await fetchTaskPosts(task.key, task.key === 'listing' ? 8 : 4, {
            allowMockFallback: false,
            fresh: true,
          }),
        }))
    )
  ).filter(({ posts }) => posts.length)

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
    return 0
  })

  return (
    <ListingSiteShell>
      <main className="flex-1">
        <HomeOpening listingCount={listingCount} locations={listingLocations} />
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

        <section className="border-b border-border bg-stone-100/50">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
              <div className="atlas-panel rounded-lg p-8 sm:p-10">
                <div className="atlas-section-title">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{siteContent.home.introBadge}</span>
                  <h2
                    className="mt-4 pb-4 text-3xl font-semibold tracking-tight text-atlas-ink sm:text-4xl"
                    style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
                  >
                    {siteContent.home.introTitle}
                  </h2>
                </div>
                <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                  {siteContent.home.introParagraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={siteContent.home.primaryLink.href}
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
                  >
                    {siteContent.home.primaryLink.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={siteContent.home.secondaryLink.href}
                    className="inline-flex items-center gap-2 rounded-md border border-border bg-white px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition hover:bg-stone-50"
                  >
                    {siteContent.home.secondaryLink.label}
                  </Link>
                </div>
              </div>

              <aside className="flex flex-col gap-6">
                <div className="atlas-panel rounded-lg p-6 sm:p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{siteContent.home.sideBadge}</p>
                  <ul className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
                    {siteContent.home.sidePoints.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="atlas-panel rounded-lg p-6 sm:p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{SITE_CONFIG.name}</p>
                  <p className="mt-1 text-lg font-semibold text-foreground">At a glance</p>
                  <div className="mt-5 grid gap-3">
                    <div className="rounded-md border border-border bg-stone-50/80 p-4">
                      <div className="flex items-center gap-2 text-primary">
                        <Building2 className="h-4 w-4" />
                        <span className="text-xs font-semibold uppercase tracking-wide">Listings live</span>
                      </div>
                      <p className="mt-2 text-2xl font-semibold text-foreground">{listingCount || '—'}</p>
                    </div>
                    <div className="rounded-md border border-border bg-stone-50/80 p-4">
                      <div className="flex items-center gap-2 text-primary">
                        <MapPin className="h-4 w-4" />
                        <span className="text-xs font-semibold uppercase tracking-wide">Areas</span>
                      </div>
                      <p className="mt-2 text-sm font-medium leading-relaxed text-foreground">{listingLocations.join(' · ') || 'Add your first listing'}</p>
                    </div>
                    <div className="rounded-md border border-border bg-stone-50/80 p-4">
                      <div className="flex items-center gap-2 text-primary">
                        <Compass className="h-4 w-4" />
                        <span className="text-xs font-semibold uppercase tracking-wide">Flow</span>
                      </div>
                      <p className="mt-2 text-sm font-medium text-foreground">Catalog → detail → contact</p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {orderedSections.map(({ task, posts }) => (
          <TaskFeedSection key={task.key} task={task} posts={posts} />
        ))}
      </main>
    </ListingSiteShell>
  )
}
