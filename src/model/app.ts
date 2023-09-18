type AiRole = {
  fullName: string,
  displayName: string,
  origin: string,
  index: number,
  context: 'movie' | 'code' | 'life' | 'custom',
  customContext: string | null,
}

type ChatHistory = {
  content: string,
  role: AiRole | 'you',
}

export type { AiRole, ChatHistory };