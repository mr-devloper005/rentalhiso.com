import { ListingSiteShell } from '@/components/listing-site/listing-site-shell'
import { TaskListClient } from '@/components/tasks/task-list-client'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG, getTaskConfig, type TaskKey } from '@/lib/site-config'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { taskIntroCopy } from '@/config/site.content'
import { Building2, MapPin } from 'lucide-react'

export async function TaskListPage({
  task,
  category,
  embed = false,
}: {
  task: TaskKey
  category?: string
  /** When true, omit site chrome for a custom shell (e.g. listing marketplace layout). */
  embed?: boolean
}) {
  const taskConfig = getTaskConfig(task)
  const posts = await fetchTaskPosts(task, 30)
  const normalizedCategory = category ? normalizeCategory(category) : 'all'
  const intro = taskIntroCopy[task]
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const schemaItems = posts.slice(0, 10).map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${baseUrl}${taskConfig?.route || '/posts'}/${post.slug}`,
    name: post.title,
  }))

  const listingLocations =
    task === 'listing'
      ? Array.from(
          new Set(
            posts
              .map((post) => {
                const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
                return typeof content.location === 'string' ? content.location : null
              })
              .filter(Boolean)
          )
        ).slice(0, 4)
      : []

  const main = (
      <main className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${embed ? 'py-8' : 'py-12'}`}>
        {task === 'listing' ? (
          <SchemaJsonLd
            data={[
              {
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                name: 'Business Directory Listings',
                itemListElement: schemaItems,
              },
              {
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: SITE_CONFIG.name,
                url: `${baseUrl}/listings`,
                areaServed: 'Worldwide',
              },
            ]}
          />
        ) : null}
        {task === 'article' || task === 'classified' ? (
          <SchemaJsonLd
            data={{
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: `${taskConfig?.label || task} | ${SITE_CONFIG.name}`,
              url: `${baseUrl}${taskConfig?.route || ''}`,
              hasPart: schemaItems,
            }}
          />
        ) : null}

        {task === 'listing' ? (
          <section className="mb-10 overflow-hidden rounded-[2rem] border border-primary/20 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:gap-0 lg:p-0">
            <div className="bg-stone-900 p-6 text-white sm:p-8 lg:p-10 dark:bg-stone-950">
              <p className="text-xs uppercase tracking-[0.3em] text-white/70">{taskConfig?.label || task}</p>
              <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
                {taskConfig?.description || 'Latest posts'}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-[15px]">
                Browse homes, spaces, and property-led listings through a directory-style experience built for faster scanning,
                stronger place context, and cleaner comparison.
              </p>
              {listingLocations.length ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {listingLocations.map((location) => (
                    <span
                      key={location}
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm"
                    >
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-amber-300" />
                      {location}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="border-t border-stone-800 bg-[#f5f2eb] p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10 dark:border-stone-700 dark:bg-stone-900/40">
              <div className="rounded-[1.75rem] border border-border bg-white p-4 text-foreground shadow-[0_18px_48px_rgba(28,25,23,0.12)] sm:p-5 dark:border-stone-600 dark:bg-stone-950 dark:text-stone-100">
                <form className="grid gap-3" action={taskConfig?.route || '#'}>
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-600 dark:text-stone-400">
                    Category
                  </label>
                  <select
                    name="category"
                    defaultValue={normalizedCategory}
                    className="h-11 rounded-xl border border-stone-200 bg-white px-3 text-sm text-foreground shadow-sm dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100"
                  >
                    <option value="all">All categories</option>
                    {CATEGORY_OPTIONS.map((item) => (
                      <option key={item.slug} value={item.slug}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                  >
                    Apply
                  </button>
                </form>
                <div className="mt-4 rounded-[1.25rem] border border-amber-200/60 bg-amber-50/90 p-4 dark:border-amber-900/40 dark:bg-amber-950/35">
                  <div className="flex items-center gap-2 text-primary dark:text-amber-400">
                    <Building2 className="h-4 w-4 shrink-0" />
                    <span className="text-xs font-semibold uppercase tracking-[0.18em]">Listing-first browsing</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-stone-700 dark:text-stone-300">
                    {SITE_CONFIG.name} keeps listings at the center and uses visuals, profiles, classifieds, and supporting
                    pages as secondary layers around the main discovery journey.
                  </p>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="mb-10 overflow-hidden rounded-[2rem] border border-border bg-card p-6 text-foreground sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{taskConfig?.label || task}</p>
                <h1 className="mt-3 text-4xl font-semibold text-foreground">{taskConfig?.description || 'Latest posts'}</h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">Browse by category to narrow results.</p>
              </div>
              <div className="rounded-[1.75rem] border border-border bg-background p-4 sm:p-5">
                <form className="grid gap-3" action={taskConfig?.route || '#'}>
                  <label className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Category</label>
                  <select
                    name="category"
                    defaultValue={normalizedCategory}
                    className="h-11 rounded-xl border border-border bg-card px-3 text-sm text-foreground"
                  >
                    <option value="all">All categories</option>
                    {CATEGORY_OPTIONS.map((item) => (
                      <option key={item.slug} value={item.slug}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="h-11 rounded-xl border border-border bg-secondary px-4 text-sm font-semibold text-foreground"
                  >
                    Apply
                  </button>
                </form>
              </div>
            </div>
          </section>
        )}

        {intro ? (
          <section
            className={`mb-12 rounded-[2rem] border p-6 sm:p-8 ${task === 'listing' ? 'border-primary/12 bg-gradient-to-b from-card to-secondary/40' : 'border-border bg-card'}`}
          >
            <h2 className="text-2xl font-semibold text-foreground">{intro.title}</h2>
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={`mt-4 text-sm leading-7 ${task === 'listing' ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                {paragraph}
              </p>
            ))}
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              {intro.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`font-semibold ${task === 'listing' ? 'text-primary hover:text-primary/80' : 'text-foreground hover:underline'}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </section>
        ) : null}

        <TaskListClient task={task} initialPosts={posts} category={normalizedCategory} />
      </main>
  )

  if (embed) {
    return main
  }

  return <ListingSiteShell>{main}</ListingSiteShell>
}
