export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'rentalhiso',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Rentalhiso',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Refined rental and property discovery',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'A listing-first rental and property discovery platform for finding homes, stays, spaces, and location-based opportunities through a cleaner browsing experience.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'rentalhiso.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://rentalhiso.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey:
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',
} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const
