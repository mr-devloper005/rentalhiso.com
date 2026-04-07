import Link from 'next/link'
import { ArrowRight, Building2, FileText, Image as ImageIcon, LayoutGrid, MapPin, Tag, Users } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskConfig } from '@/lib/site-config'
import { TaskFeedCarousel } from '@/components/home/task-feed-carousel'
import { siteContent } from '@/config/site.content'

const taskIcons: Record<string, any> = {
  listing: Building2,
  classified: Tag,
  article: FileText,
  image: ImageIcon,
  profile: Users,
  social: LayoutGrid,
  sbm: LayoutGrid,
  pdf: FileText,
}

export function TaskFeedSection({
  task,
  posts,
}: {
  task: TaskConfig
  posts: SitePost[]
}) {
  if (!posts.length) return null

  const isListing = task.key === 'listing'
  const listingLocations = isListing
    ? Array.from(
        new Set(
          posts
            .map((post) => {
              const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
              return typeof content.location === 'string' ? content.location : null
            })
            .filter(Boolean)
        )
      ).slice(0, 3)
    : []

  return (
    <section className={`border-t border-border py-14 sm:py-16 ${isListing ? 'bg-stone-100/40' : 'bg-background'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`mb-8 grid gap-5 pb-6 md:grid-cols-[1fr_auto] md:items-end ${isListing ? 'border-b border-primary/15' : 'border-b border-border/90'}`}
        >
          <div>
            <div className={isListing ? 'rental-label' : 'editorial-label'}>
              {(() => {
                const Icon = taskIcons[task.key] || LayoutGrid
                return <Icon className="h-3.5 w-3.5" />
              })()}
              {task.label}
            </div>
            <h2 className={`mt-4 font-semibold ${isListing ? 'text-4xl text-foreground sm:text-[2.4rem]' : 'text-3xl text-foreground sm:text-[2.15rem]'}`}>
              {siteContent.taskSectionHeading.replace('{label}', task.label)}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-[15px]">
              {task.description || siteContent.taskSectionDescriptionSuffix}
            </p>
            {isListing && listingLocations.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {listingLocations.map((location) => (
                  <span key={location} className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-card/90 px-3 py-1.5 text-xs font-semibold text-primary shadow-sm">
                    <MapPin className="h-3.5 w-3.5" />
                    {location}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
          <Link
            href={task.route}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary/80"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <TaskFeedCarousel task={task} posts={posts} />
      </div>
    </section>
  )
}
