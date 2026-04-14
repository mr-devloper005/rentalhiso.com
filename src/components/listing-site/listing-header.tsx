'use client'

import Link from 'next/link'
import { LayoutGrid, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

export function ListingHeader() {
  const { isAuthenticated } = useAuth()
  const pathname = usePathname()
  const catalogActive = pathname === '/listings' || pathname.startsWith('/listings/')

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-[#fffefb]/95 backdrop-blur-md">
      <div className="relative mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 shrink items-center gap-2.5"
          style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-stone-200 bg-white p-0.5 shadow-sm">
            <img
              src="/favicon.png?v=20260414"
              alt=""
              width={36}
              height={36}
              className="h-full w-full object-contain"
            />
          </span>
          <span className="truncate text-lg font-semibold tracking-tight text-atlas-ink">{SITE_CONFIG.name}</span>
        </Link>

        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'pointer-events-auto gap-2 font-semibold text-stone-700 hover:bg-secondary hover:text-atlas-ink',
              catalogActive && 'bg-secondary text-atlas-ink'
            )}
            asChild
          >
            <Link href="/listings">
              <LayoutGrid className="h-4 w-4" aria-hidden />
              Catalog
            </Link>
          </Button>
        </div>

        <Button variant="outline" size="sm" className="shrink-0 gap-2 font-medium" asChild>
          <Link href={isAuthenticated ? '/settings' : '/login'}>
            <User className="h-4 w-4" aria-hidden />
            Profile
          </Link>
        </Button>
      </div>
    </header>
  )
}
