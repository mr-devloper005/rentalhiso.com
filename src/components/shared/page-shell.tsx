import type { ReactNode } from 'react'
import { ListingInnerPage } from '@/components/listing-site/listing-inner-page'
import { ListingSiteShell } from '@/components/listing-site/listing-site-shell'

export function PageShell({
  title,
  description,
  actions,
  children,
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <ListingSiteShell>
      <ListingInnerPage title={title} description={description} actions={actions}>
        {children}
      </ListingInnerPage>
    </ListingSiteShell>
  )
}
