import { ListingSiteShell } from '@/components/listing-site/listing-site-shell'
import { TaskListPage } from '@/components/tasks/task-list-page'
import { buildTaskMetadata } from '@/lib/seo'
import { taskPageMetadata } from '@/config/site.content'

export const revalidate = 3

export const generateMetadata = () =>
  buildTaskMetadata('listing', {
    path: '/listings',
    title: taskPageMetadata.listing.title,
    description: taskPageMetadata.listing.description,
  })

export default async function ListingsPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string }>
}) {
  const sp = (await searchParams) || {}
  return (
    <ListingSiteShell>
      <TaskListPage task="listing" category={sp.category} embed />
    </ListingSiteShell>
  )
}
