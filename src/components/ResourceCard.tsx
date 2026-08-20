import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Resource } from '@/lib/resources'
import { CATEGORY_LABELS } from '@/lib/resources'
import ResourceThumb from './ResourceThumb'
import { formatDate } from '@/lib/date'

export default function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Link
      href={`/resources/${resource.slug}`}
      className="card card-hover group flex h-full w-full flex-col overflow-hidden hover:no-underline"
    >
      <div className="relative aspect-[16/9] w-full">
        <ResourceThumb slug={resource.slug} category={resource.category} />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2 text-[var(--text-muted)]">
          <span className="badge badge-brand">
            {CATEGORY_LABELS[resource.category]}
          </span>
          <span className="text-xs">
            <time dateTime={resource.publishedAt}>
              {formatDate(resource.publishedAt)}
            </time>
          </span>
          <span className="text-xs text-[var(--text-faint)]">
            · {resource.readMinutes} min read
          </span>
        </div>
        <h2 className="text-lg font-semibold leading-snug text-[var(--text-primary)]">
          {resource.title}
        </h2>
        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
          {resource.excerpt}
        </p>
        <span className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-medium text-[var(--blez-blue)]">
          Read
          <ArrowUpRight
            className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </span>
      </div>
    </Link>
  )
}
