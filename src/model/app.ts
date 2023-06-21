type AiRole = {
  fullName: string,
  displayName: string,
  origin: string,
  index: number,
}

type ChatHistory = {
  content: string,
  role: AiRole | 'you',
}

export type { AiRole, ChatHistory };