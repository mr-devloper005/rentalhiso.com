import { ListingSiteShell } from '@/components/listing-site/listing-site-shell'
import { ListingInnerPage } from '@/components/listing-site/listing-inner-page'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { TaskPostCard } from '@/components/shared/task-post-card'

export const revalidate = 3

const matchText = (value: string, query: string) => value.toLowerCase().includes(query)

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')

const compactText = (value: unknown) => {
  if (typeof value !== 'string') return ''
  return stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase()
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>
}) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster ? { fresh: true, category: category || undefined, task: 'listing' } : undefined
  )
  const posts =
    feed?.posts?.length ? feed.posts : useMaster ? [] : getMockPostsForTask('listing')

  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === 'object' ? post.content : {}
    const typeText = compactText((content as { type?: string }).type)
    if (typeText === 'comment') return false
    const postTask = getPostTaskKey(post)
    if (postTask && postTask !== 'listing') return false
    const description = compactText((content as { description?: string }).description)
    const body = compactText((content as { body?: string }).body)
    const excerpt = compactText((content as { excerpt?: string }).excerpt)
    const categoryText = compactText((content as { category?: string }).category)
    const tags = Array.isArray(post.tags) ? post.tags.join(' ') : ''
    const tagsText = compactText(tags)
    const derivedCategory = categoryText || tagsText
    if (category && !derivedCategory.includes(category)) return false
    if (!normalized.length) return true
    return (
      matchText(compactText(post.title || ''), normalized) ||
      matchText(compactText(post.summary || ''), normalized) ||
      matchText(description, normalized) ||
      matchText(body, normalized) ||
      matchText(excerpt, normalized) ||
      matchText(tagsText, normalized)
    )
  })

  const results = normalized.length > 0 ? filtered : filtered.slice(0, 24)

  return (
    <ListingSiteShell>
      <ListingInnerPage
        title="Search listings"
        description={
          query ? `Results for “${query}” in the rental catalog.` : 'Search homes, spaces, and titles across listings.'
        }
        actions={
          <form action="/search" className="flex w-full gap-2 sm:w-auto">
            <input type="hidden" name="master" value="1" />
            <input type="hidden" name="task" value="listing" />
            {category ? <input type="hidden" name="category" value={category} /> : null}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input name="q" defaultValue={query} placeholder="Search listings…" className="h-11 pl-9" />
            </div>
            <Button type="submit" className="h-11">
              Search
            </Button>
          </form>
        }
      >
        {results.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((post) => {
              const postTask = getPostTaskKey(post)
              const href = postTask ? buildPostUrl(postTask, post.slug) : `/posts/${post.slug}`
              return <TaskPostCard key={post.id} post={post} href={href} taskKey="listing" />
            })}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-border bg-stone-50/80 p-12 text-center text-muted-foreground">
            No matching listings yet. Try another keyword or browse the catalog.
          </div>
        )}
      </ListingInnerPage>
    </ListingSiteShell>
  )
}
