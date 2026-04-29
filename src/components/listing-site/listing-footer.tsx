import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'

const cols = [
  {
    title: 'Explore',
    links: [
      { label: 'Home', href: '/' },
      { label: 'All listings', href: '/listings' },
      { label: 'Search', href: '/search' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
]

export function ListingFooter() {
  return (
    <footer className="mt-auto border-t border-stone-800 bg-stone-950 text-stone-300">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3" style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-md border border-stone-700 bg-white p-0.5">
                <img
                  src="/favicon.png?v=20260414"
                  alt=""
                  width={40}
                  height={40}
                  className="h-full w-full object-contain"
                />
              </span>
              <p className="min-w-0 text-xl font-semibold text-stone-100">{SITE_CONFIG.name}</p>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-stone-400">{SITE_CONFIG.description}</p>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-stone-400 transition hover:text-amber-400">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-stone-800 pt-8 text-center text-xs text-stone-500">
          © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
