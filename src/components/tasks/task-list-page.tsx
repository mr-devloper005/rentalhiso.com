import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
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
}: {
  task: TaskKey
  category?: string
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

  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
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

        <section className={`mb-10 overflow-hidden rounded-[2rem] border ${task === 'listing' ? 'border-[rgba(40,67,104,0.12)] bg-[linear-gradient(135deg,#102038_0%,#17304f_42%,#f3f0e8_42%,#f8f5ef_100%)] text-white' : 'border-border bg-card text-foreground'} p-6 sm:p-8 lg:p-10`}>
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className={`text-xs uppercase tracking-[0.3em] ${task === 'listing' ? 'text-white/68' : 'text-muted-foreground'}`}>
                {taskConfig?.label || task}
              </p>
              <h1 className={`mt-3 text-4xl font-semibold ${task === 'listing' ? 'text-white sm:text-5xl' : 'text-foreground'}`}>
                {taskConfig?.description || 'Latest posts'}
              </h1>
              <p className={`mt-4 max-w-2xl text-sm leading-7 ${task === 'listing' ? 'text-white/76 sm:text-[15px]' : 'text-muted-foreground'}`}>
                {task === 'listing'
                  ? 'Browse homes, spaces, and property-led listings through a directory-style experience built for faster scanning, stronger place context, and cleaner comparison.'
                  : 'Browse by category to narrow results.'}
              </p>
              {task === 'listing' && listingLocations.length ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {listingLocations.map((location) => (
                    <span key={location} className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/86 backdrop-blur-md">
                      <MapPin className="h-3.5 w-3.5 text-[#f0b347]" />
                      {location}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            <div className={`rounded-[1.75rem] border p-4 sm:p-5 ${task === 'listing' ? 'border-[rgba(40,67,104,0.14)] bg-white text-[#14253d] shadow-[0_22px_60px_rgba(12,22,36,0.2)]' : 'border-border bg-background'}`}>
              <form className="grid gap-3" action={taskConfig?.route || '#'}>
                <label className={`text-xs font-semibold uppercase tracking-[0.2em] ${task === 'listing' ? 'text-[#6b7a8c]' : 'text-muted-foreground'}`}>
                  Category
                </label>
                <select
                  name="category"
                  defaultValue={normalizedCategory}
                  className={`h-11 rounded-xl border px-3 text-sm ${task === 'listing' ? 'border-[rgba(40,67,104,0.12)] bg-[#fbfaf6] text-[#14253d]' : 'border-border bg-card text-foreground'}`}
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
                  className={`h-11 rounded-xl px-4 text-sm font-semibold ${task === 'listing' ? 'bg-[#305a94] text-white hover:bg-[#264775]' : 'border border-border bg-secondary text-foreground'}`}
                >
                  Apply
                </button>
              </form>
              {task === 'listing' ? (
                <div className="mt-4 rounded-[1.25rem] bg-[rgba(48,90,148,0.06)] p-4">
                  <div className="flex items-center gap-2 text-[#305a94]">
                    <Building2 className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-[0.18em]">Listing-first browsing</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[#526277]">
                    {SITE_CONFIG.name} keeps listings at the center and uses visuals, profiles, classifieds, and supporting pages as secondary layers around the main discovery journey.
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {intro ? (
          <section className={`mb-12 rounded-[2rem] border p-6 sm:p-8 ${task === 'listing' ? 'border-[rgba(40,67,104,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(245,241,233,0.96))]' : 'border-border bg-card'}`}>
            <h2 className={`text-2xl font-semibold ${task === 'listing' ? 'text-[#14253d]' : 'text-foreground'}`}>{intro.title}</h2>
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={`mt-4 text-sm leading-7 ${task === 'listing' ? 'text-[#596b7f]' : 'text-muted-foreground'}`}>
                {paragraph}
              </p>
            ))}
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              {intro.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`font-semibold ${task === 'listing' ? 'text-[#305a94] hover:text-[#234268]' : 'text-foreground hover:underline'}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </section>
        ) : null}

        <TaskListClient task={task} initialPosts={posts} category={normalizedCategory} />
      </main>
      <Footer />
    </div>
  )
}
