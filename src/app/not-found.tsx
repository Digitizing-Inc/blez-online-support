import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import SearchBar from '@/components/SearchBar'

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <span className="eyebrow">404</span>
      <h1 className="display display-h2 not-italic mt-4">Not found.</h1>
      <p className="mt-3 max-w-lg text-base text-[var(--text-secondary)] sm:text-lg">
        This page doesn&apos;t exist or has moved. Search for what you were
        looking for, or jump back in below.
      </p>
      <div className="mt-8 w-full max-w-xl text-left">
        <SearchBar />
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="btn btn-primary btn-md">
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          Browse articles
        </Link>
      </div>
    </section>
  )
}
