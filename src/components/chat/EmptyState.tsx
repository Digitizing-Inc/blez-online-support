'use client'

import { useEffect, useState } from 'react'
import { Mail } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import {
  CreditCard,
  Truck,
  Lock,
  Package,
  Wallet,
  ShieldCheck,
} from 'lucide-react'
import BlezMark from '@/components/BlezMark'
import { siteConfig } from '@/lib/config'

interface EmptyStateProps {
  onPick: (prompt: string) => void
}

interface PromptCard {
  category: string
  icon: LucideIcon
  prompt: string
}

const PROMPTS: PromptCard[] = [
  {
    category: 'Payments',
    icon: CreditCard,
    prompt: 'Why was my payment declined?',
  },
  {
    category: 'Shipping',
    icon: Truck,
    prompt: 'Where is my package?',
  },
  {
    category: 'Account',
    icon: Lock,
    prompt: "I can't log into my account",
  },
  {
    category: 'Ripping',
    icon: Package,
    prompt: 'What happened to my pack mid-rip?',
  },
  {
    category: 'Cash out',
    icon: Wallet,
    prompt: 'How are instant offer values calculated?',
  },
  {
    category: 'Card quality',
    icon: ShieldCheck,
    prompt: "What does 'NM' mean on listings?",
  },
]

function greeting(): string {
  const h = new Date().getHours()
  if (h >= 5 && h < 12) return 'Good morning.'
  if (h >= 12 && h < 17) return 'Good afternoon.'
  if (h >= 17 && h < 22) return 'Good evening.'
  return 'Up late?'
}

export default function EmptyState({ onPick }: EmptyStateProps) {
  // Compute greeting on mount only — recomputing on every render would
  // tick around midnight and the difference doesn't matter.
  const [greet, setGreet] = useState<string | null>(null)
  useEffect(() => {
    setGreet(greeting())
  }, [])

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-6 px-4 pb-8 pt-8 text-center sm:gap-8 sm:px-6 sm:pt-16">
      <BlezMark size="lg" />
      <div className="flex flex-col gap-3">
        <h1 className="display display-h3 not-italic">
          {greet ? `${greet} ` : ''}Ask the BlezBot anything.
        </h1>
        <p className="max-w-xl text-[var(--text-secondary)]">
          The BlezBot answers questions about how Blez Online works — packs,
          payments, shipping, ripping, and your account.
        </p>
      </div>

      <a
        href={`mailto:${siteConfig.supportEmail}`}
        className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] bg-[var(--bg-elevated)] px-4 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:border-[var(--blez-blue)]/60 hover:text-[var(--text-primary)] hover:no-underline"
      >
        <Mail className="h-4 w-4" strokeWidth={2} />
        Account-specific or urgent? Email support
      </a>

      <ul className="mt-2 grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
        {PROMPTS.map((p) => {
          const Icon = p.icon
          return (
            <li key={p.prompt}>
              <button
                type="button"
                onClick={() => onPick(p.prompt)}
                className="group flex w-full items-start gap-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-4 text-left transition-colors hover:border-[var(--blez-blue)]/50 hover:bg-[var(--blez-blue-ghost)]"
              >
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-[var(--blez-blue-ghost)] text-[var(--blez-blue)]">
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </span>
                <span className="flex flex-col gap-0.5 min-w-0">
                  <span className="eyebrow eyebrow-sm">{p.category}</span>
                  <span className="text-sm leading-snug text-[var(--text-primary)]">
                    {p.prompt}
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
