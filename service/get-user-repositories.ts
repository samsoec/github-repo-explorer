import { GitHubRepository } from "@/types/github";

export type GetUserRepositoriesResponse = {
  data: GitHubRepository[]
  hasMore: boolean
};

export type GetUserRepositoriesParams = {
  username: string
  perPage?: number
  page?: number
}

export async function getUserRepositories({
  username,
  perPage = 30,
  page = 1,
}: GetUserRepositoriesParams): Promise<GetUserRepositoriesResponse> {
  const url = `https://api.github.com/users/${username}/repos?sort=updated&per_page=${perPage}&page=${page}`
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json()

  return { data, hasMore: data.length === perPage };
}