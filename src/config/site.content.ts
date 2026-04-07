import { siteIdentity } from '@/config/site.identity'
import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Rental listings marketplace',
  },
  footer: {
    tagline: 'Browse verified rental listings',
  },
  hero: {
    badge: 'Trusted rental listings',
    title: ['Professional rental spaces & homes', 'for every search.'],
    description:
      `${siteIdentity.name} is a listing-first marketplace for discovering homes, stays, and spaces — with clear location context, structured categories, and a browsing experience built for quick comparison.`,
    primaryCta: {
      label: 'Browse all listings',
      href: '/listings',
    },
    secondaryCta: {
      label: 'How it works',
      href: '/about',
    },
    searchPlaceholder: 'Search listings by location, title, or keyword…',
    focusLabel: 'Popular',
    featureCardBadge: 'Featured listing',
    featureCardTitle: `Curated picks from the ${siteIdentity.name} catalog.`,
    featureCardDescription:
      'Preview spaces with strong imagery and location cues — the same card pattern used across the marketplace for consistent scanning.',
    metrics: [
      { label: 'Catalog focus', value: 'Listings only' },
      { label: 'Browse style', value: 'Directory + filters' },
      { label: 'Built for', value: 'Renters & hosts' },
    ],
  },
  home: {
    metadata: {
      title: `${siteIdentity.name} listings, homes, and property discovery`,
      description:
        'Discover rental listings, homes, spaces, and supporting local business context through a refined listing-first browsing experience.',
      openGraphTitle: `${siteIdentity.name} listings, homes, and property discovery`,
      openGraphDescription:
        'Browse homes, spaces, and rental opportunities with stronger location cues, useful property detail, and cleaner discovery.',
      keywords: ['rental listings', 'property discovery', 'homes and spaces', 'business directory'],
    },
    introBadge: `Why ${siteIdentity.name}`,
    introTitle: 'A clean marketplace for rental listings.',
    introParagraphs: [
      `${siteIdentity.name} is organized like a modern listing marketplace: search and browse are front and center, cards are easy to scan, and every page reinforces discovery over clutter.`,
      'Filters and categories help you narrow results; listing detail pages keep the important facts readable. The interface stays minimal so listings remain the hero.',
      'Whether you are comparing neighborhoods or opening a single property, the layout is tuned for fast scanning and confident next steps.',
    ],
    sideBadge: 'Why browse here',
    sidePoints: [
      'Listing-only browsing — no mixed content types in the main experience.',
      'Marketplace-style cards with imagery, title, and location cues.',
      'Search tuned for rental discovery across the catalog.',
      'Responsive grid that scales from phone to desktop.',
    ],
    primaryLink: {
      label: 'Explore listings',
      href: '/listings',
    },
    secondaryLink: {
      label: 'Contact',
      href: '/contact',
    },
  },
  cta: {
    badge: 'Ready to browse?',
    title: 'Search the listing catalog and open any property in a few clicks.',
    description:
      `${siteIdentity.name} keeps the experience focused: find a listing, compare options, and reach out when you are ready — without wading through unrelated content types in the main UI.`,
    primaryCta: {
      label: 'View listings',
      href: '/listings',
    },
    secondaryCta: {
      label: 'Contact our team',
      href: '/contact',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'Browse the newest posts in this section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Local guides and market updates',
    description: 'Read area guides, explainers, and rental-focused updates that support better browsing and decision-making.',
  },
  listing: {
    title: 'Rental listings and discoverable spaces',
    description: 'Explore homes, spaces, rentals, and location-led listings through a cleaner directory-style browsing experience.',
  },
  classified: {
    title: 'Rental classifieds and short-term opportunities',
    description: 'Browse timely rental posts, local notices, and shorter-format opportunities connected to property discovery.',
  },
  image: {
    title: 'Image sharing and visual property posts',
    description: 'Explore galleries, property visuals, and image-led posts that make spaces easier to evaluate at a glance.',
  },
  profile: {
    title: 'Profiles and public pages',
    description: `Discover landlord, agency, creator, and public-facing profiles connected to the ${siteIdentity.name} platform.`,
  },
  sbm: {
    title: 'Curated links and rental resources',
    description: 'Browse useful links, saved references, and curated local resources that support rental discovery.',
  },
  pdf: {
    title: 'PDFs and downloadable documents',
    description: `Open reports, brochures, and downloadable resources shared across the ${siteIdentity.name} platform.`,
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Homes, spaces, and location-led rental listings',
    paragraphs: [
      `This section is the core of ${siteIdentity.name}. Listings are organized to make place, category, and property context easier to scan before a visitor commits to deeper reading.`,
      'Each listing can still connect with supporting pages, profiles, images, and resources, but the browsing experience remains firmly centered on discovery and comparison.',
      'Use categories to narrow down results, compare places faster, and move from broad browsing into more focused property decisions.',
    ],
    links: [
      { label: 'Search listings', href: '/search' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  article: {
    title: 'Local guides and rental updates',
    paragraphs: [
      `Guides on ${siteIdentity.name} are designed to support the listing journey with local context, decision-making help, and deeper reading where it actually matters.`,
      'Instead of competing with listings, they strengthen trust and help visitors understand neighborhoods, property choices, and related rental topics.',
      'Use this section when you want more context around places, categories, and practical rental questions.',
    ],
    links: [
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open image sharing', href: '/image-sharing' },
      { label: 'Browse resources', href: '/pdf' },
    ],
  },
  classified: {
    title: 'Classifieds, local opportunities, and timely updates',
    paragraphs: [
      'Classified posts surface short-term offers, notices, and opportunities that complement the more structured listing experience.',
      'They are useful when visitors want to scan faster-moving inventory, smaller local opportunities, or temporary property-related updates.',
      'This section works best as a quicker, more immediate layer alongside the core listing directory.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'View profiles', href: '/profile' },
      { label: 'Open visuals', href: '/image-sharing' },
    ],
  },
  image: {
    title: 'Image-led property posts and visual browsing',
    paragraphs: [
      'This section focuses on visual browsing for spaces, rooms, properties, and image-led updates that help visitors evaluate places more quickly.',
      'It works as a visual layer around the listing experience, making it easier to compare spaces before reading deeper details.',
      'Use it when imagery matters more than long-form detail and when first impressions are part of the browsing process.',
    ],
    links: [
      { label: 'Explore listings', href: '/listings' },
      { label: 'Browse profiles', href: '/profile' },
      { label: 'See classifieds', href: '/classifieds' },
    ],
  },
  profile: {
    title: 'Profiles for agencies, owners, and public pages',
    paragraphs: [
      'Profiles give visitors a clearer sense of the people, agencies, and public-facing entities behind listings and related content.',
      'They help connect trust, identity, and reputation to the browsing experience without distracting from the platform’s listing-first structure.',
      'Use profiles to understand who is publishing, which pages are active, and how content connects across the platform.',
    ],
    links: [
      { label: 'Explore listings', href: '/listings' },
      { label: 'Browse resources', href: '/pdf' },
      { label: 'See classifieds', href: '/classifieds' },
    ],
  },
  sbm: {
    title: 'Saved links and curated local references',
    paragraphs: [
      'Curated links and bookmarks help gather useful references that sit alongside rental discovery, local research, and broader decision-making.',
      'This section is best used as a supporting utility layer rather than a primary browsing surface.',
      'Visitors can move here when they want external references, saved resources, and lightweight research material tied to a place or topic.',
    ],
    links: [
      { label: 'Explore listings', href: '/listings' },
      { label: 'View PDFs', href: '/pdf' },
      { label: 'Browse profiles', href: '/profile' },
    ],
  },
  pdf: {
    title: 'PDFs, brochures, and downloadable resources',
    paragraphs: [
      'The PDF section houses downloadable material such as brochures, reports, and supporting documents that add depth to the main listing experience.',
      'These resources are useful when a visitor is already deeper into evaluation and wants something more formal or portable.',
      'Use this section as a supporting layer for documents, not as the main entry point into the site.',
    ],
    links: [
      { label: 'Explore listings', href: '/listings' },
      { label: 'Browse bookmarks', href: '/sbm' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  social: {
    title: 'Connected social content',
    paragraphs: [
      'This section brings together lighter, social-style content that can support discovery and community around listings and places.',
      'It complements the main platform but should remain secondary to the listing-first experience.',
      'Use it for connected browsing when visitors want a wider view of activity around a topic or place.',
    ],
    links: [
      { label: 'Explore listings', href: '/listings' },
      { label: 'View profiles', href: '/profile' },
      { label: 'Browse classifieds', href: '/classifieds' },
    ],
  },
  comment: {
    title: 'Comments and discussion',
    paragraphs: [
      'Comments attach discussion directly to posts and help add lightweight response without disrupting the browsing flow.',
      'They work best as supporting context beneath listings and other published pages.',
      'Use comments to keep discussion close to the content it belongs to.',
    ],
    links: [
      { label: 'View listings', href: '/listings' },
      { label: 'See classifieds', href: '/classifieds' },
      { label: 'Browse profiles', href: '/profile' },
    ],
  },
  org: {
    title: 'Organizations, agencies, and structured entities',
    paragraphs: [
      `Organization pages help structure agencies, brands, and teams that participate in the ${siteIdentity.name} platform.`,
      'They strengthen trust and make the broader platform easier to understand beyond individual listings.',
      'Connect them with listings, profiles, and resources to create a clearer platform structure.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'PDF library', href: '/pdf' },
      { label: 'Browse profiles', href: '/profile' },
    ],
  },
}
