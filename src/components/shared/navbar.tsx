'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X, LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { siteContent } from '@/config/site.content'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

/** Listing-only marketplace nav: Browse + Search + About (static links). */
const secondaryNav = [
  { name: 'Browse listings', href: '/listings', match: '/listings' },
  { name: 'Search', href: '/search', match: '/search' },
  { name: 'About', href: '/about', match: '/about' },
]

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">
      <div className="h-1 bg-primary" aria-hidden />

      <div className="bg-[var(--market-topbar)] text-[13px] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
          <Link href="/" className="flex min-w-0 items-center gap-2 font-semibold tracking-tight">
            <span className="truncate">{SITE_CONFIG.name}</span>
            <span className="hidden text-white/50 sm:inline">Market</span>
          </Link>
          <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1 text-white/90">
            <Link href="/create/listing" className="hover:text-white">
              List your space
            </Link>
            <Link href="/search" className="hidden hover:text-white sm:inline">
              Search
            </Link>
            {!isAuthenticated ? (
              <>
                <Link href="/login" className="hover:text-white">
                  Sign In
                </Link>
                <Button size="sm" asChild className="h-8 rounded border-0 bg-primary px-4 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
                  <Link href="/register">Get started</Link>
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </div>

      <div className="border-b border-white/10 bg-[var(--market-header)] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-0 sm:px-6 lg:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-3 py-3">
            <Link href="/" className="flex shrink-0 items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-md border border-white/15 bg-white p-1">
                <img
                  src="/favicon.png?v=20260404"
                  alt={`${SITE_CONFIG.name} logo`}
                  width="40"
                  height="40"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="min-w-0 hidden sm:block">
                <span className="block truncate text-lg font-bold tracking-tight">{SITE_CONFIG.name}</span>
                <span className="block truncate text-[11px] font-medium uppercase tracking-wider text-white/55">
                  {siteContent.navbar.tagline}
                </span>
              </div>
            </Link>

            <nav className="ml-2 hidden min-w-0 flex-1 items-center gap-0 lg:flex">
              {secondaryNav.map((item) => {
                const isActive =
                  item.match === '/about'
                    ? pathname === '/about' || pathname.startsWith('/about/')
                    : pathname.startsWith(item.match)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'border-b-[3px] px-4 py-4 text-sm font-semibold transition-colors',
                      isActive ? 'border-primary text-white' : 'border-transparent text-white/75 hover:text-white'
                    )}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="icon" asChild className="text-white hover:bg-white/10 lg:hidden">
              <Link href="/search">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Link>
            </Button>

            {isAuthenticated ? (
              <NavbarAuthControls />
            ) : (
              <div className="hidden items-center gap-2 md:flex">
                <Button variant="ghost" size="sm" asChild className="text-white hover:bg-white/10">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button size="sm" asChild className="h-9 rounded bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                  <Link href="/register">Get started</Link>
                </Button>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-white/10 bg-[var(--market-header)] lg:hidden">
          <div className="space-y-1 px-4 py-3">
            <Link
              href="/search"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-md bg-white/5 px-3 py-3 text-sm font-semibold text-white"
            >
              <Search className="h-4 w-4" />
              Search listings
            </Link>
            {secondaryNav.map((item) => {
              const isActive =
                item.match === '/about'
                  ? pathname === '/about' || pathname.startsWith('/about/')
                  : pathname.startsWith(item.match)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold',
                    isActive ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/5'
                  )}
                >
                  <LayoutGrid className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
            {!isAuthenticated ? (
              <div className="grid gap-2 pt-3 sm:grid-cols-2">
                <Button variant="outline" asChild className="border-white/25 bg-transparent text-white hover:bg-white/10">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/register">Get started</Link>
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </header>
  )
}
