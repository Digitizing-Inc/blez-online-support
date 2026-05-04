import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonLd, {
  websiteSchema,
  organizationSchema,
} from '@/lib/seo/jsonld'
import { siteConfig } from '@/lib/config'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.name,
    template: `%s — ${siteConfig.name}`,
  },
  description:
    'Answers and help for Blez Online — packs, payments, ripping, shipping, and your account.',
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    url: siteConfig.siteUrl,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export const viewport: Viewport = {
  themeColor: '#101010',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <JsonLd data={[websiteSchema(), organizationSchema()]} />
        <a href="#main" className="skip-to-content">
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="pb-16 sm:pb-24 outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
