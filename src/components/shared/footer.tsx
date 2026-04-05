import Link from 'next/link'
import { FileText, Building2, LayoutGrid, Tag, Github, Twitter, Linkedin, Image as ImageIcon, User, MapPin } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const footerLinks = {
  platform: SITE_CONFIG.tasks
    .filter((task) => task.enabled)
    .map((task) => ({
      name: task.label,
      href: task.route,
      icon: taskIcons[task.key] || LayoutGrid,
    })),
  company: [
    { name: 'About', href: '/about' },
    { name: 'Team', href: '/team' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
    { name: 'Press', href: '/press' },
  ],
  resources: [
    { name: 'Help Center', href: '/help' },
    { name: 'Community', href: '/community' },
    { name: 'Developers', href: '/developers' },
    { name: 'Status', href: '/status' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Cookies', href: '/cookies' },
    { name: 'Licenses', href: '/licenses' },
  ],
}

const socialLinks = [
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { name: 'GitHub', href: 'https://github.com', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
]

export function Footer() {
  return (
    <footer className="border-t border-[rgba(40,67,104,0.12)] bg-[linear-gradient(180deg,rgba(239,244,250,0.55),rgba(249,246,240,0.98))]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="h-11 w-11 overflow-hidden rounded-[1.15rem] border border-[rgba(40,67,104,0.14)] bg-white p-1 shadow-sm">
                <img
                  src="/favicon.png?v=20260404"
                  alt={`${SITE_CONFIG.name} logo`}
                  width="44"
                  height="44"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <span className="block text-lg font-semibold text-[#14253d]">{SITE_CONFIG.name}</span>
                <span className="text-xs uppercase tracking-[0.22em] text-[#76879a]">{siteContent.footer.tagline}</span>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[#596b7f]">{SITE_CONFIG.description}</p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[rgba(40,67,104,0.12)] bg-white/75 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#305a94] shadow-sm">
              <MapPin className="h-3.5 w-3.5" />
              Rental and location discovery first
            </div>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="rounded-full border border-[rgba(40,67,104,0.12)] bg-white/70 p-2.5 text-[#657487] transition hover:border-[rgba(40,67,104,0.18)] hover:bg-white hover:text-[#234268]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <item.icon className="h-4 w-4" />
                  <span className="sr-only">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#234268]">Platform</h3>
            <ul className="mt-5 space-y-3">
              {footerLinks.platform.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="flex items-center gap-2 text-sm text-[#596b7f] transition hover:text-[#234268]">
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#234268]">Company</h3>
            <ul className="mt-5 space-y-3">
              {footerLinks.company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-[#596b7f] transition hover:text-[#234268]">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#234268]">Resources</h3>
            <ul className="mt-5 space-y-3">
              {footerLinks.resources.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-[#596b7f] transition hover:text-[#234268]">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#234268]">Legal</h3>
            <ul className="mt-5 space-y-3">
              {footerLinks.legal.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-[#596b7f] transition hover:text-[#234268]">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[rgba(40,67,104,0.12)] pt-6">
          <p className="text-center text-sm text-[#728196]">&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
