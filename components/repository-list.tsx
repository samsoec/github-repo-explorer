"use client"

import { useRef } from "react"
import type { GitHubRepository } from "@/types/github"
import { RepositoryCard } from "@/components/repository-card"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Button } from "./ui/button"

interface RepositoryListProps {
  user: string
  repositories: GitHubRepository[]
  isLoading: boolean
  hasMore: boolean
  onLoadMore: () => void
}

export function RepositoryList({ user, repositories, isLoading, hasMore, onLoadMore }: RepositoryListProps) {
  const loadMoreRef = useRef<HTMLDivElement>(null)

  if (repositories.length === 0 && !isLoading) {
    return (
      <div className="rounded-lg py-6">
        <h2 className="text-xl font-semibold mb-4">{user}</h2>
        <p className="text-gray-600">No repositories found.</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg py-6">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {repositories.map((repo) => (
          <RepositoryCard key={repo.id} repository={repo} />
        ))}
      </div>

      {isLoading && (
        <div className="flex justify-center py-6">
          <LoadingSpinner />
        </div>
      )}

      {hasMore && !isLoading && (
        <div className="flex justify-center mt-4">
          <Button variant="secondary" onClick={onLoadMore}>
            Load More
          </Button>
        </div>
      )}
    </div>
  )
}
