import { ContentImage } from '@/components/shared/content-image'
import Link from 'next/link'
import { ExternalLink, FileText, Mail, MapPin, Tag } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import type { TaskKey } from '@/lib/site-config'

type ListingContent = {
  location?: string
  category?: string
  description?: string
  email?: string
  price?: string
}

const stripHtml = (value?: string | null) =>
  (value || '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<\/?[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const getExcerpt = (value?: string | null, maxLength = 140) => {
  const text = stripHtml(value)
  if (!text) return ''
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trimEnd()}…`
}

const getContent = (post: SitePost): ListingContent => {
  const content = post.content && typeof post.content === 'object' ? post.content : {}
  return content as ListingContent
}

const getImageUrl = (post: SitePost, content: ListingContent) => {
  const media = Array.isArray(post.media) ? post.media : []
  const mediaUrl = media[0]?.url
  if (mediaUrl) return mediaUrl

  const contentAny = content as Record<string, unknown>
  const contentImage = typeof contentAny.image === 'string' ? contentAny.image : null
  if (contentImage) return contentImage

  const contentImages = Array.isArray(contentAny.images) ? contentAny.images : []
  const firstImage = contentImages.find((value) => typeof value === 'string')
  if (firstImage) return firstImage as string

  const contentLogo = typeof contentAny.logo === 'string' ? contentAny.logo : null
  if (contentLogo) return contentLogo

  return '/placeholder.svg?height=640&width=960'
}

export function TaskPostCard({
  post,
  href,
  taskKey,
  compact,
}: {
  post: SitePost
  href: string
  taskKey?: TaskKey
  compact?: boolean
}) {
  const content = getContent(post)
  const image = getImageUrl(post, content)
  const rawCategory = content.category || post.tags?.[0] || 'Post'
  const normalizedCategory = normalizeCategory(rawCategory)
  const category = CATEGORY_OPTIONS.find((item) => item.slug === normalizedCategory)?.name || rawCategory

  const variant = taskKey || 'listing'
  const isBookmarkVariant = variant === 'sbm' || variant === 'social'
  const isListingVariant = variant === 'listing'
  const imageAspect =
    variant === 'image'
      ? 'aspect-[4/5]'
      : variant === 'article'
        ? 'aspect-[16/10]'
        : variant === 'pdf'
          ? 'aspect-[4/5]'
          : variant === 'classified'
            ? 'aspect-[16/11]'
            : 'aspect-[4/3]'

  const altText = `${post.title} ${category} ${variant === 'listing' ? 'business listing' : variant} image`
  const imageSizes =
    variant === 'article'
      ? '(max-width: 640px) 90vw, (max-width: 1024px) 48vw, 420px'
      : variant === 'image'
        ? '(max-width: 640px) 82vw, (max-width: 1024px) 34vw, 320px'
        : '(max-width: 640px) 85vw, (max-width: 1024px) 42vw, 340px'

  if (isBookmarkVariant) {
    return (
      <Link
        href={href}
        className="group flex h-full flex-row items-start gap-4 overflow-hidden rounded-[1.75rem] border border-[rgba(40,67,104,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(246,242,236,0.94))] p-5 shadow-[0_18px_48px_rgba(21,37,61,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(21,37,61,0.12)]"
      >
        <div className="mt-1 rounded-full bg-[rgba(48,90,148,0.08)] p-2.5 text-[#305a94] transition group-hover:bg-[#305a94] group-hover:text-white">
          <ExternalLink className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(48,90,148,0.08)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#305a94]">
              <Tag className="h-3.5 w-3.5" />
              {category}
            </span>
            {content.location ? (
              <span className="inline-flex items-center gap-1 text-xs text-[#728196]">
                <MapPin className="h-3.5 w-3.5" />
                {content.location}
              </span>
            ) : null}
          </div>
          <h3 className="mt-3 line-clamp-2 text-lg font-semibold leading-snug text-[#14253d] group-hover:text-[#234268]">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-7 text-[#596b7f]">
            {getExcerpt(content.description || post.summary, compact ? 120 : 180) || 'Explore this bookmark.'}
          </p>
          {content.email ? (
            <div className="mt-3 inline-flex items-center gap-1 text-xs text-[#728196]">
              <Mail className="h-3.5 w-3.5" />
              {content.email}
            </div>
          ) : null}
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={href}
      className={`group flex h-full flex-col overflow-hidden rounded-[1.9rem] border shadow-[0_20px_60px_rgba(21,37,61,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(21,37,61,0.14)] ${
        isListingVariant
          ? 'border-[rgba(40,67,104,0.14)] bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(245,241,233,0.92))] hover:border-[rgba(40,67,104,0.22)]'
          : 'border-[rgba(40,67,104,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(246,242,236,0.92))] hover:border-[rgba(40,67,104,0.18)]'
      }`}
    >
      <div className={`relative ${imageAspect} overflow-hidden bg-[#dce4ef]`}>
        <ContentImage
          src={image}
          alt={altText}
          fill
          sizes={imageSizes}
          quality={75}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          intrinsicWidth={960}
          intrinsicHeight={720}
        />
        <div className={`absolute inset-0 ${isListingVariant ? 'bg-gradient-to-t from-[rgba(10,18,30,0.46)] via-transparent to-transparent opacity-90' : 'bg-gradient-to-t from-[rgba(20,37,61,0.42)] via-transparent to-transparent opacity-80'}`} />
        <span className={`absolute left-4 top-4 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] backdrop-blur-md ${isListingVariant ? 'bg-[rgba(11,21,35,0.72)] text-white' : 'bg-[rgba(20,37,61,0.78)] text-white'}`}>
          <Tag className="h-3.5 w-3.5" />
          {category}
        </span>
        {variant === 'pdf' && (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-[rgba(255,252,247,0.88)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#14253d] shadow">
            <FileText className="h-3.5 w-3.5" />
            PDF
          </span>
        )}
      </div>
      <div className={`flex flex-1 flex-col p-5 ${compact ? 'py-4' : ''}`}>
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#728196]">
          {content.location ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-[rgba(48,90,148,0.07)] px-2.5 py-1 text-[#305a94]">
              <MapPin className="h-3 w-3" />
              {content.location}
            </span>
          ) : null}
          {isListingVariant ? <span>Listing focused</span> : null}
        </div>
        <h3 className={`mt-3 line-clamp-2 font-semibold leading-snug text-[#14253d] ${variant === 'article' ? 'text-[1.35rem]' : 'text-lg'}`}>
          {post.title}
        </h3>
        <p className={`mt-3 text-sm leading-7 text-[#596b7f] ${variant === 'article' ? 'line-clamp-4' : 'line-clamp-3'}`}>
          {getExcerpt(content.description || post.summary) || 'Explore this post.'}
        </p>
        <div className="mt-auto pt-4">
          {content.email && (
            <div className="inline-flex items-center gap-1 text-xs text-[#728196]">
              <Mail className="h-3.5 w-3.5" />
              {content.email}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
