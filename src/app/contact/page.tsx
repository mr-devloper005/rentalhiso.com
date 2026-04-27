'use client'

import { useMemo, useState } from 'react'
import { ListingSiteShell } from '@/components/listing-site/listing-site-shell'
import { ListingInnerPage } from '@/components/listing-site/listing-inner-page'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'
import { SITE_CONFIG } from '@/lib/site-config'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const contactOptions = useMemo(
    () => [
      { 
        title: 'Listings support', 
        detail: process.env.NEXT_PUBLIC_CONTACT_LISTINGS_EMAIL || `listings@${SITE_CONFIG.domain}`, 
        tag: 'Rentals' 
      },
      { 
        title: 'General', 
        detail: process.env.NEXT_PUBLIC_CONTACT_GENERAL_EMAIL || `hello@${SITE_CONFIG.domain}`, 
        tag: 'Hello' 
      },
    ],
    []
  )

  return (
    <ListingSiteShell>
      <ListingInnerPage
        title="Contact"
        description={`Reach ${SITE_CONFIG.name} for listing questions, partnerships, or product feedback.`}
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="atlas-panel border-border">
            <CardContent className="p-8">
              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubmitted(true)
                  toast({
                    title: 'Message sent',
                    description: `Thanks — the ${SITE_CONFIG.name} team will get back to you.`,
                  })
                }}
              >
                <div>
                  <label className="text-sm font-medium text-foreground">Name</label>
                  <Input className="mt-2 rounded-md" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <Input className="mt-2 rounded-md" placeholder="you@example.com" type="email" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Message</label>
                  <Textarea className="mt-2 min-h-[140px] rounded-md" placeholder="How can we help?" />
                </div>
                <Button type="submit" className="rounded-md bg-primary font-semibold text-primary-foreground">
                  Send message
                </Button>
                {submitted ? <p className="text-sm text-muted-foreground">We typically reply within two business days.</p> : null}
              </form>
            </CardContent>
          </Card>
          <div className="space-y-4">
            {contactOptions.map((option) => (
              <Card key={option.title} className="atlas-panel border-border">
                <CardContent className="p-6">
                  <Badge variant="secondary" className="rounded-md">
                    {option.tag}
                  </Badge>
                  <h3 className="mt-3 font-semibold text-foreground">{option.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{option.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </ListingInnerPage>
    </ListingSiteShell>
  )
}
