import type { GitHubRepository } from "@/types/github"
import { Star, GitFork, ExternalLink } from "lucide-react"
import { Badge } from "./ui/badge"

interface RepositoryCardProps {
  repository: GitHubRepository
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-base font-semibold line-clamp-2 flex-1 pr-2">{repository.name}</h3>
        <div className="flex items-center gap-1 text-sm text-gray-600 flex-shrink-0">
          <Star className="w-4 h-4" />
          <span>{repository.stargazers_count}</span>
        </div>
      </div>

      <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
        {repository.description || "No description available"}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          {repository.language && (
            <Badge variant="secondary">{repository.language}</Badge>
          )}
          {repository.forks_count > 0 && (
            <div className="flex items-center gap-1">
              <GitFork className="w-3 h-3" />
              <span>{repository.forks_count}</span>
            </div>
          )}
        </div>

        <a
          href={repository.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}
