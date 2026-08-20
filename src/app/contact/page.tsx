import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Mail, Clock } from 'lucide-react'
import Breadcrumb from '@/components/Breadcrumb'
import ContactForm from '@/components/ContactForm'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Contact support',
  description:
    'Get in touch with the Blez Online support team. Tell us what’s going on and we’ll help as quickly as we can.',
  alternates: { canonical: '/contact' },
  // Utility page — no SEO value in indexing it.
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Contact Blez Online support',
    description: 'Reach the Blez Online support team.',
    url: '/contact',
  },
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Breadcrumb
        trail={[{ label: 'Support Articles', href: '/' }, { label: 'Contact' }]}
      />

      <h1 className="mt-6 text-3xl font-bold leading-tight text-[var(--text-primary)] sm:text-4xl">
        Contact support
      </h1>
      <p className="mt-3 text-lg text-[var(--text-secondary)] sm:text-xl">
        Couldn&rsquo;t find your answer? Send us the details and we&rsquo;ll
        take it from here.
      </p>

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--text-muted)]">
        <span className="inline-flex items-center gap-2">
          <Clock className="h-4 w-4 text-[var(--blez-blue)]" strokeWidth={2} />
          {siteConfig.supportResponseTime}
        </span>
        <a
          href={`mailto:${siteConfig.supportEmail}`}
          className="inline-flex items-center gap-2 hover:text-[var(--text-primary)]"
        >
          <Mail className="h-4 w-4 text-[var(--blez-blue)]" strokeWidth={2} />
          {siteConfig.supportEmail}
        </a>
      </div>

      <div className="mt-10">
        <Suspense fallback={null}>
          <ContactForm />
        </Suspense>
      </div>
    </div>
  )
}
