import type { Metadata } from 'next'
import { Suspense } from 'react'
import Chat from '@/components/Chat'

export const metadata: Metadata = {
  title: 'BlezBot',
  description:
    'Ask the BlezBot questions about Blez Online — packs, payments, ripping, shipping, and your account.',
  alternates: { canonical: '/chat' },
  openGraph: {
    title: 'BlezBot',
    description:
      'Ask the BlezBot questions about Blez Online — packs, payments, ripping, shipping, and your account.',
    url: '/chat',
  },
}

export default function ChatPage() {
  // Chat goes edge-to-edge; the sidebar pins to the left rail and the
  // message column has its own internal max-width. Header/footer stay
  // capped at max-w-7xl elsewhere — only the chat workspace fills the
  // viewport, matching the convention from Claude.ai / ChatGPT.
  return (
    <>
      {/* Server-rendered intro copy ensures crawlers index a real
          description of the page even though Chat is a Suspense'd
          client component. Visually hidden — visible chat UI takes
          over below. */}
      <p className="sr-only">
        Ask the BlezBot questions about how Blez Online works — packs,
        payments, shipping, ripping, and your account. Your conversations
        are saved locally on this device. For account-specific or urgent
        issues, email support.
      </p>
      <Suspense fallback={null}>
        <Chat />
      </Suspense>
    </>
  )
}
