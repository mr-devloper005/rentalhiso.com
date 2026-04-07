import Link from 'next/link'
import { ListingSiteShell } from '@/components/listing-site/listing-site-shell'
import { ListingInnerPage } from '@/components/listing-site/listing-inner-page'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'

const pillars = [
  {
    title: 'Clarity first',
    body: 'Listings are presented with consistent typography, predictable hierarchy, and enough whitespace to scan without fatigue.',
  },
  {
    title: 'Place-aware',
    body: 'Location and category stay visible so renters can compare areas before opening a full detail view.',
  },
  {
    title: 'Built to convert',
    body: 'Primary actions are obvious: search, browse the catalog, and contact when a space fits.',
  },
]

export default function AboutPage() {
  return (
    <ListingSiteShell>
      <ListingInnerPage
        title={`About ${SITE_CONFIG.name}`}
        description="A listing-focused experience for discovering rental spaces — without mixed content competing for attention in the main UI."
        actions={
          <>
            <Button variant="outline" asChild className="rounded-md border-border">
              <Link href="/contact">Contact</Link>
            </Button>
            <Button asChild className="rounded-md bg-primary font-semibold text-primary-foreground">
              <Link href="/listings">Browse catalog</Link>
            </Button>
          </>
        }
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="atlas-panel rounded-lg p-8">
            <h2 className="text-xl font-semibold text-foreground" style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}>
              What we optimize for
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {SITE_CONFIG.name} is structured as a rental listing surface: discovery starts in the catalog, narrows with search and
              filters, and lands on detail pages with the facts renters need. The interface is intentionally calm so listings stay
              the hero.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            {pillars.map((p) => (
              <div key={p.title} className="atlas-panel rounded-lg p-6">
                <h3 className="font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </ListingInnerPage>
    </ListingSiteShell>
  )
}
