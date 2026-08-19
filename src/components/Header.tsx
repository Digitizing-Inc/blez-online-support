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
        <Link
          href="/"
          aria-label={`${siteConfig.name} — home`}
          className="inline-flex items-center gap-3 hover:no-underline"
        >
          <Image
            src="/blez-logo.webp"
            alt="Blez Online"
            width={300}
            height={150}
            priority
            className="h-12 w-auto sm:h-14"
          />
          <span className="display not-italic hidden text-[18px] leading-none text-[var(--text-secondary)] sm:inline sm:text-[22px]">
            SUPPORT
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <HeaderSearch />
          <HeaderNav />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}
