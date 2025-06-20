export interface GitHubUser {
  id: number
  login: string
  avatar_url: string
  html_url: string
  type: string
}

export interface GitHubRepository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
  private: boolean
}
