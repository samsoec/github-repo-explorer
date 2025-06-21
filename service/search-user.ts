import { GitHubUser } from "@/types/github"

export type SearchUsersResponse = { data: GitHubUser[] };

export async function searchUsers(query: string): Promise<SearchUsersResponse> {
  const url = `https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=5`
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json()

  return { data: data.items }
}