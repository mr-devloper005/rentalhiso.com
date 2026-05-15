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
import { ContactLeadForm } from "@/components/shared/contact-lead-form";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const contactOptions = useMemo(
    () => [
    ],
    []
  )

  return (
    <ListingSiteShell>
      <ListingInnerPage
        title="Contact"
        description={`Reach ${SITE_CONFIG.name} for listing questions, partnerships, or product feedback.`}
      >
        <div className="mx-auto max-w-2xl">
          <Card className="atlas-panel border-border">
            <CardContent className="p-8">
              <ContactLeadForm />
            </CardContent>
          </Card>
        </div>
      </ListingInnerPage>
    </ListingSiteShell>
  )
}
