import type { GitHubUser, GitHubRepository } from "@/types/github"

const GITHUB_API_BASE = "https://api.github.com"

class GitHubAPI {
  private cache = new Map<string, { data: any; timestamp: number }>()
  private readonly CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

  private async fetchWithCache<T>(url: string): Promise<T> {
    const cached = this.cache.get(url)
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data
    }

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    this.cache.set(url, { data, timestamp: Date.now() })
    return data
  }

  async searchUsers(query: string, page = 1, pageSize = 5): Promise<GitHubUser[]> {
    const url = `${GITHUB_API_BASE}/search/users?q=${encodeURIComponent(query)}&per_page=${pageSize}&page=${page}`
    const response = await this.fetchWithCache<{ items: GitHubUser[] }>(url)
    return response.items
  }

  async getUserRepositories(
    username: string,
    page = 1,
    pageSize = 6
  ): Promise<{ repositories: GitHubRepository[]; hasMore: boolean }> {
    const url = `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=${pageSize}&page=${page}`
    const repositories = await this.fetchWithCache<GitHubRepository[]>(url)

    return {
      repositories,
      hasMore: repositories.length === pageSize,
    }
  }
}

export const githubApi = new GitHubAPI()
