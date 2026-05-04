import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Topic } from '@/lib/topics'
import { getArticlesForTopic } from '@/lib/topics'

interface TopicTileProps {
  topic: Topic
}

export default function TopicTile({ topic }: TopicTileProps) {
  const Icon = topic.icon
  const count = getArticlesForTopic(topic.slug).length

  return (
    <Link
      href={`/articles/${topic.slug}`}
      className="card card-hover card-padded group flex h-full w-full flex-col gap-4 hover:no-underline"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--blez-blue-ghost)] text-[var(--blez-blue)]">
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
        <ArrowUpRight
          className="h-4 w-4 flex-shrink-0 text-[var(--text-muted)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--blez-blue)]"
          strokeWidth={2}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold leading-snug text-[var(--text-primary)]">
          {topic.title}
        </h2>
        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
          {topic.description}
        </p>
      </div>
      <span className="eyebrow eyebrow-sm mt-auto">
        {count} {count === 1 ? 'article' : 'articles'}
      </span>
    </Link>
  )
}
