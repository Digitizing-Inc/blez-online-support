export type MessageRole = 'user' | 'assistant'

export type Citation = {
  topicSlug: string
  slug: string
  title: string
}

export type FeedbackVerdict = 'up' | 'down' | null

export interface Message {
  id: string
  role: MessageRole
  /** Plain text or markdown. Rendered as markdown for assistant messages. */
  content: string
  citations?: Citation[]
  feedback?: FeedbackVerdict
  /** True while the assistant message is being streamed (typed) in. */
  streaming?: boolean
  /** True if the user clicked Stop before generation finished. */
  stopped?: boolean
  /** Local timestamp; not used for ordering (array order is canonical). */
  createdAt: number
}

export interface Conversation {
  id: string
  /** Auto-generated from the first user message; user can rename via UI. */
  title: string
  createdAt: number
  updatedAt: number
  messages: Message[]
}

/** State persisted to localStorage. */
export interface ChatStore {
  conversations: Conversation[]
  activeId: string | null
}
