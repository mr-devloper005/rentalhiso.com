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
    <section className={`py-14 sm:py-16 ${isListing ? 'bg-[linear-gradient(180deg,rgba(223,232,244,0.3),rgba(245,241,233,0))]' : ''}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`mb-8 grid gap-5 pb-6 md:grid-cols-[1fr_auto] md:items-end ${isListing ? 'border-b border-[rgba(48,90,148,0.14)]' : 'border-b border-[rgba(48,90,148,0.12)]'}`}>
          <div>
            <div className={isListing ? 'rental-label' : 'editorial-label'}>
              {(() => {
                const Icon = taskIcons[task.key] || LayoutGrid
                return <Icon className="h-3.5 w-3.5" />
              })()}
              {task.label}
            </div>
            <h2 className={`mt-4 font-semibold ${isListing ? 'text-4xl text-[#14253d] sm:text-[2.4rem]' : 'text-3xl text-[#17304f] sm:text-[2.15rem]'}`}>
              {siteContent.taskSectionHeading.replace('{label}', task.label)}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5b6b80] sm:text-[15px]">
              {task.description || siteContent.taskSectionDescriptionSuffix}
            </p>
            {isListing && listingLocations.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {listingLocations.map((location) => (
                  <span key={location} className="inline-flex items-center gap-2 rounded-full border border-[rgba(48,90,148,0.14)] bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#234268] shadow-sm">
                    <MapPin className="h-3.5 w-3.5" />
                    {location}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
          <Link
            href={task.route}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#305a94] transition hover:text-[#1f3d65]"
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
