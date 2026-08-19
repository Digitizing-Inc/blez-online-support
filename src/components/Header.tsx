import Link from 'next/link'
import Image from 'next/image'
import LanguageSwitcher from './LanguageSwitcher'
import HeaderSearch from './HeaderSearch'
import HeaderNav from './HeaderNav'
import { siteConfig } from '@/lib/config'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-subtle)] bg-[var(--bg-canvas)]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-20 sm:px-6 lg:px-8">
        {/* Zone 1 — brand + primary nav, grouped together on the left */}
        <div className="flex items-center gap-3 sm:gap-6">
          <Link
            href="/"
            aria-label={`${siteConfig.name} — home`}
            className="inline-flex items-center gap-3 hover:no-underline sm:gap-3.5"
          >
            <Image
              src="/blez-logo.webp"
              alt="Blez Online"
              width={300}
              height={150}
              priority
              className="h-12 w-auto sm:h-14"
            />
            {/* Brand lockup: hairline divider + quiet descriptor, so "SUPPORT"
                reads as a sub-brand of the logo rather than floating text. */}
            <span className="hidden items-center gap-3 sm:inline-flex sm:gap-3.5">
              <span
                className="h-7 w-px bg-[var(--border-strong)]"
                aria-hidden="true"
              />
              <span className="display not-italic text-[15px] uppercase leading-none tracking-[0.06em] text-[var(--text-muted)] sm:text-[18px]">
                Support
              </span>
            </span>
          </Link>
          <HeaderNav />
        </div>

        {/* Zone 2 — utilities, clustered right with a divider between them */}
        <div className="flex items-center gap-2 sm:gap-3">
          <HeaderSearch />
          <span
            className="hidden h-6 w-px bg-[var(--border-subtle)] sm:block"
            aria-hidden="true"
          />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}
