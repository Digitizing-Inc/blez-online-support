import { siteConfig } from '@/lib/config'

export interface SlashCommand {
  /** Without the leading `/` */
  name: string
  description: string
  /** Returned when the user picks the command. The chat shell decides
   *  what to do — `mailto:` opens the mail client, `action:reset` clears
   *  the current conversation, etc. */
  payload:
    | { kind: 'reset' }
    | { kind: 'mailto'; href: string }
    | { kind: 'feedback' }
}

export const slashCommands: SlashCommand[] = [
  {
    name: 'reset',
    description: 'Start a new conversation',
    payload: { kind: 'reset' },
  },
  {
    name: 'email',
    description: 'Open a support email',
    payload: { kind: 'mailto', href: `mailto:${siteConfig.supportEmail}` },
  },
  {
    name: 'feedback',
    description: 'Send feedback about this bot',
    payload: { kind: 'feedback' },
  },
]

export function matchSlashCommands(input: string): SlashCommand[] {
  if (!input.startsWith('/')) return []
  const q = input.slice(1).toLowerCase()
  if (!q) return slashCommands
  return slashCommands.filter((c) => c.name.startsWith(q))
}
