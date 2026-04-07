import type { ReactNode } from 'react'
import { ListingFooter } from '@/components/listing-site/listing-footer'
import { ListingHeader } from '@/components/listing-site/listing-header'

export function ListingSiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="listing-atlas flex min-h-screen flex-col bg-background">
      <ListingHeader />
      <div className="flex flex-1 flex-col">{children}</div>
      <ListingFooter />
    </div>
  )
}
