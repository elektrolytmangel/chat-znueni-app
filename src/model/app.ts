type AiRole = {
  fullName: string,
  displayName: string,
  index: number,
}

type ChatHistory = {
  content: string,
  role: AiRole | 'you',
}

const roles: AiRole[] = [
  { fullName: 'Mia Wallace', displayName: 'Mia', index: 0 },
  { fullName: 'Vincent Vega', displayName: 'Vincent', index: 1 },
  { fullName: 'Zed', displayName: 'Zed', index: 2 },
  { fullName: 'Winston Wolfe', displayName: 'Winston', index: 3 },
]

export type { AiRole, ChatHistory };
export { roles };