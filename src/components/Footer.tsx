import Link from 'next/link'
import Image from 'next/image'
import { Mail, Facebook, Instagram, Youtube } from 'lucide-react'
import { siteConfig } from '@/lib/config'

/**
 * Site footer. Mirrors the structure of the Blez Online marketing site:
 *   - top callout banner (here: WANNA RIP? CTA back to the shop)
 *   - 3-column body (logo / community + support / quick links split)
 *   - bottom legal strip
 *
 * URLs that point at the main storefront are derived from
 * `siteConfig.mainSiteUrl` so the dev can repoint by changing one line.
 */

const quickLinksA = [
  { label: 'Shop', href: '/shop' },
  { label: 'Inventory', href: '/inventory' },
  { label: 'Collect', href: '/collect' },
  { label: 'About', href: '/about' },
] as const

const quickLinksB = [
  { label: 'Top Pulls', href: '/top-pulls' },
  { label: 'Blez Points & Tiers FAQ', href: '/blez-points' },
] as const

function abs(path: string) {
  return `${siteConfig.mainSiteUrl}${path}`
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2H21l-6.52 7.45L22 22h-6.137l-4.815-6.296L5.5 22H2.74l6.97-7.96L2 2h6.295l4.355 5.756L18.244 2zm-2.155 18h1.696L8.01 4H6.236l9.853 16z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer
      className="border-t border-[var(--border-subtle)]"
      style={{
        background:
          'linear-gradient(225.32deg, rgba(0, 92, 153, 0.2) 0%, rgba(0, 153, 255, 0.2) 51.93%, rgba(0, 92, 153, 0.2) 100%)',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top callout — Need support? */}
        <div className="mt-12 flex flex-col gap-6 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-10 sm:py-8">
          <div className="flex flex-col gap-2">
            <h2 className="display display-h4 not-italic">Need support?</h2>
            <p className="text-sm text-[var(--text-secondary)] sm:text-base">
              Tell us what&rsquo;s going on and we&rsquo;ll help as quickly as
              we can. {siteConfig.supportResponseTime}
            </p>
          </div>
          <Link
            href="/contact"
            className="btn btn-primary btn-md self-start sm:self-auto"
          >
            <Mail className="h-4 w-4" strokeWidth={2} />
            CONTACT SUPPORT
          </Link>
        </div>

        {/* Body — logo / community+support / quick links */}
        <div className="grid gap-12 border-t border-[var(--border-subtle)] py-12 sm:py-16 lg:grid-cols-[1fr_1fr_1.4fr] lg:gap-8">
          {/* Logo */}
          <div className="flex items-start">
            <Link
              href="/"
              aria-label={`${siteConfig.name} — home`}
              className="hover:no-underline"
            >
              <Image
                src="/blez-logo.webp"
                alt="Blez Online"
                width={300}
                height={150}
                className="h-24 w-auto sm:h-28"
              />
            </Link>
          </div>

          {/* Community + Support */}
          <div className="flex flex-col gap-10">
            <div>
              <h3 className="display display-h6 not-italic">Community</h3>
              <ul className="mt-4 -ml-3 flex items-center gap-1 text-[var(--text-secondary)]">
                <li>
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="flex h-11 w-11 items-center justify-center rounded-md transition-colors hover:text-[var(--blez-blue)]"
                  >
                    <Facebook className="h-5 w-5" strokeWidth={1.75} />
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.social.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X"
                    className="flex h-11 w-11 items-center justify-center rounded-md transition-colors hover:text-[var(--blez-blue)]"
                  >
                    <XIcon className="h-5 w-5" />
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-11 w-11 items-center justify-center rounded-md transition-colors hover:text-[var(--blez-blue)]"
                  >
                    <Instagram className="h-5 w-5" strokeWidth={1.75} />
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="flex h-11 w-11 items-center justify-center rounded-md transition-colors hover:text-[var(--blez-blue)]"
                  >
                    <Youtube className="h-5 w-5" strokeWidth={1.75} />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="display display-h6 not-italic">Support</h3>
              <div className="mt-5 flex flex-col gap-3 text-sm">
                <Link
                  href="/"
                  className="text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                >
                  Help Center
                </Link>
                <Link
                  href="/resources"
                  className="text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                >
                  Resources
                </Link>
                <Link
                  href="/contact"
                  className="text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                >
                  Contact support
                </Link>
                <a
                  href={`mailto:${siteConfig.supportEmail}`}
                  className="break-all text-[var(--text-secondary)] underline underline-offset-4 transition-colors hover:text-[var(--blez-blue)]"
                >
                  {siteConfig.supportEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="display display-h6 not-italic">Quick Links</h3>
            <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-4">
              <ul className="flex flex-col gap-4">
                {quickLinksA.map((link) => (
                  <li key={link.label}>
                    <a
                      href={abs(link.href)}
                      className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col gap-4">
                {quickLinksB.map((link) => (
                  <li key={link.label}>
                    <a
                      href={abs(link.href)}
                      className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom — legal */}
        <div className="flex flex-col gap-2 border-t border-[var(--border-subtle)] py-6 text-xs text-[var(--text-faint)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Blez Card Breakers. All Rights
            Reserved.
          </p>
          <p>
            By using this site, you agree to our{' '}
            <a
              href={abs('/terms')}
              className="underline underline-offset-4 hover:text-[var(--text-secondary)]"
            >
              Terms &amp; Conditions
            </a>{' '}
            and{' '}
            <a
              href={abs('/privacy')}
              className="underline underline-offset-4 hover:text-[var(--text-secondary)]"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
