"use client"

import { useState } from "react"
import { useMachine } from "@xstate/react"
import { githubSearchMachine } from "@/lib/github-machine"
import { SearchInput } from "@/components/search-input"
import { UserList } from "@/components/user-list"
import { RepositoryList } from "@/components/repository-list"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ErrorMessage } from "@/components/error-message"

export default function HomePage() {
  const [state, send] = useMachine(githubSearchMachine)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = () => {
    if (searchQuery.trim()) {
      send({ type: "SEARCH_USERS", query: searchQuery.trim() })
    }
  }

  const handleUserSelect = (username: string) => {
    send({ type: "SELECT_USER", username })
  }

  const handleLoadMoreRepos = () => {
    send({ type: "LOAD_MORE_REPOS" })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            isLoading={state.matches("searchingUsers")}
          />
        </div>

        {state.matches("searchingUsers") && (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        )}

        {state.matches("usersLoaded") && state.context.users.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <p className="text-gray-600 mb-4">Showing users for "{state.context.searchQuery}"</p>
            <UserList
              users={state.context.users}
              selectedUser={state.context.selectedUser}
              onUserSelect={handleUserSelect}
              renderRepositories={(selectedUser) => (
                <RepositoryList
                  user={selectedUser}
                  repositories={state.context.repositories}
                  isLoading={state.matches("usersLoaded.loadingRepos") || state.matches("usersLoaded.loadingMoreRepos")}
                  hasMore={state.context.hasMoreRepos}
                  onLoadMore={handleLoadMoreRepos}
                />
              )}
            />
          </div>
        )}

        {state.matches("error") && <ErrorMessage message={state.context.error || "An error occurred"} />}
      </div>
    </div>
  )
}
