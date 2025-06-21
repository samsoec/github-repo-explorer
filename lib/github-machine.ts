import { createMachine, assign } from "xstate"
import type { GitHubUser, GitHubRepository } from "@/types/github"
import { githubApi } from "@/lib/github-api"

type ContextType = {
  searchQuery: string
  users: GitHubUser[]
  selectedUser: string | null
  repositories: GitHubRepository[]
  currentPage: number
  hasMoreRepos: boolean
  error: string | null
}

type EventsType =
  | { type: "SEARCH_USERS"; query: string }
  | { type: "SELECT_USER"; username: string }
  | { type: "LOAD_MORE_REPOS" }
  | { type: "USERS_LOADED"; users: GitHubUser[] }
  | { type: "REPOS_LOADED"; repositories: GitHubRepository[]; hasMore: boolean }
  | { type: "ERROR"; error: string }
  | { type: "RETRY" }

type ServicesType = {
  searchUsers: { data: GitHubUser[]; error?: Error };
  loadRepositories: { data: { repositories: GitHubRepository[]; hasMore: boolean }; error?: Error }
};

export const githubSearchMachine = createMachine(
  {
    id: "githubSearch",
    initial: "idle",
    context: {
      searchQuery: "",
      users: [],
      selectedUser: null,
      repositories: [],
      currentPage: 1,
      hasMoreRepos: false,
      error: null,
    },
    tsTypes: {} as import('./github-machine.typegen').Typegen0,
    schema: {
      context: {} as ContextType,
      events: {} as EventsType,
      services: {} as ServicesType,
    },
    states: {
      idle: {
        on: {
          SEARCH_USERS: {
            target: "searchingUsers",
            actions: "assignSearchQuery",
          },
        },
      },
      searchingUsers: {
        invoke: {
          src: "searchUsers",
          onDone: {
            target: "usersLoaded",
            actions: "assignUsersAndSelectFirst",
          },
          onError: {
            target: "error",
            actions: "assignError",
          },
        },
      },
      usersLoaded: {
        initial: "loadingRepos",
        states: {
          loadingRepos: {
            invoke: {
              src: "loadRepositories",
              onDone: {
                target: "reposLoaded",
                actions: "assignRepositories",
              },
              onError: {
                target: "error",
                actions: "assignError",
              },
            },
          },
          reposLoaded: {
            on: {
              LOAD_MORE_REPOS: {
                target: "loadingMoreRepos",
                actions: "incrementPage",
              },
              SELECT_USER: {
                target: "loadingRepos",
                actions: "assignSelectedUser",
              },
            },
          },
          loadingMoreRepos: {
            invoke: {
              src: "loadRepositories",
              onDone: {
                target: "reposLoaded",
                actions: "appendRepositories",
              },
              onError: {
                target: "error",
                actions: "assignError",
              },
            },
          },
          error: {
            on: {
              RETRY: {
                target: "loadingRepos",
                actions: "clearError",
              },
            },
          },
        },
        on: {
          SELECT_USER: {
            target: "usersLoaded.loadingRepos",
            actions: "assignSelectedUser",
          },
          SEARCH_USERS: {
            target: "searchingUsers",
            actions: "resetSearchState",
          },
        },
      },
      error: {
        on: {
          RETRY: {
            target: "idle",
            actions: "clearError",
          },
          SEARCH_USERS: {
            target: "searchingUsers",
            actions: "assignSearchQuery",
          },
        },
      },
    },
  },
  {
    services: {
      searchUsers: async (context) => {
        const users = await githubApi.searchUsers(context.searchQuery)
        return users
      },
      loadRepositories: async (context) => {
        if (!context.selectedUser) throw new Error("No user selected")

        const result = await githubApi.getUserRepositories(context.selectedUser, context.currentPage)
        return result
      },
    },
    actions: {
      assignSearchQuery: assign({
        searchQuery: (_, event) => event.query,
        error: (_) => null,
      }),
      assignUsersAndSelectFirst: assign({
        users: (_, event) => event.data.slice(0, 5),
        selectedUser: (_, event) => event.data[0]?.login ?? null,
      }),
      assignError: assign({
        error: (_, event) => (event.data as Error).message || "Failed to load repositories",
      }),
      clearError: assign({
        error: (_) => null,
      }),
      assignRepositories: assign({
        repositories: (_, event) => event.data.repositories,
        hasMoreRepos: (_, event) => event.data.hasMore,
      }),
      appendRepositories: assign({
        repositories: (context, event) => [...context.repositories, ...event.data.repositories],
        hasMoreRepos: (_, event) => event.data.hasMore,
      }),
      incrementPage: assign({
        currentPage: (ctx) => ctx.currentPage + 1,
      }),
      assignSelectedUser: assign({
        selectedUser: (_, event) => event.username,
        repositories: (_) => [],
        currentPage: (_) => 1,
        hasMoreRepos: (_) => false,
      }),
      resetSearchState: assign({
        searchQuery: (_, event) => event.query,
        error: (_) => null,
        selectedUser: (_) => null,
        repositories: (_) => [],
      }),
    },
  }
)
