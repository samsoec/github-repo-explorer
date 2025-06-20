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
  searchUsers: { data: GitHubUser[] };
  loadRepositories: { data: { repositories: GitHubRepository[]; hasMore: boolean } }
};

export const githubSearchMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5RQJYBcAWBXARgZTAEMAnAYwwDoUIAbMAYjwFEBBAJQGEAJAfQFVmbPAG0ADAF1EoAA4B7WOhSyAdlJAAPRAGYtARgoA2AJwBWLaIMAWABzWdlkwBoQAT20GA7BQd7dlix46HgYmAL6hzqiYuAQk5BSwRGQYKMpQfInEsPQQKmBUygBusgDW+VHY+EnxiXEpaRlgWQipxaSEaErKYuI9anIKnSpqmggATB6iFCaWBtaBRvNzWgbObgi6YwYGFFsmBhMHRlpGY5bhkeiVsckJ1fXpmdlNxLLEFNI0HQBmbwC2FAqMXudzqqUeTVgLSKsnaQ26Ej6SBAA0Uw2Ro02a0QmwuICBVTqFCwTwAMrJCBBIIwmKSmBwACr8QRImTyNGqDGIGxeCxnTzGSweEwmDzYjZjExjXYhAzmXQeMYKvR4gk3eIkyHkynU5jsbjMphCVko9nwkaICZTGZzBZLOyrVyIYw7Ix8oVjURuo6qq7AomarLaqkQCg0CkQcFsMADHJ5ArFMqAv2E26B2DByBhiNRmPyaFtDpdHom1HmrkbXSiaW6Ux7Iwefw88VV3QmCiiawmU6iSwTGZhCL4lPqyjpzOh8OU3Oxl5vD5fNC-YgAtUg8cRrNTyNpaMDAuwosqEsSfpmroWjYirQdyaShvXmxjFubazeEWKhxGXR6KW+6KphqZKbqGxB5hmIH0KSADyLAACI8AAstBbBMDwqEAArQSIp7ImWF4VoEOyeLo1iWJYpH+LWlgtqIuj6J2JjWG61ikUqKpDmuAbATqoHgRONJ0oyhpsKW57oqAmJVjWdYhA2TbzC+nbTCcohmJMdhSgY-7XOuPEhtm05pIhbxgHu8hxso+StKU5QjnpWogYZO5QCZYHmVCNlwsWiK4WygwEZJiBER2bZMZYxwNqY1hKV4ZhumMJzdscdg6f6ab6VuObGaZHn0HO7yfD8-zJgBo7Eplk7Za5uXgQe3nHr5kh4eJnJBQgIV0SKZGRR40XivM0pdsclhaMxFF2OcnH2dxjm8RQBX0KhDJsAAmmJAUSRoOIhPoDYhF6EWsRRThOhsohaNKojVnK0l+EqaWAZQi3LWtG0cpeP47CYYVRYqWx2M+Z0rF4Pj0f4nhBCEj3lYteqcLwAhGjhzX+R9FZ+N9v19f9yxA+sYyJRQiohKKY1GKNYzWOEQ7KLIVLwMiXHJGem1tdtCAALQrOKnPCtM12C1YtbWNsg6XGVILUHQrPo+1ZxvrWZi1pdUpqeKqkUKcRhzFYHgeJsf7TZLRK1Mk4KNFksvlu1origbUxjEYFNzKKJMijDDlBiB1uBRzo1GB2ByzMEFPCnbZ0eF2FBaN2KxqVYg1GJ7s3e-N24zvIvtbZieiWBQ9EG32P0XZ2L70aF+xaA7an61NEu6anEHzWBAwTtn7OjGHWvV7MfjBGpUovkTxyE8sR0U+Lw4mxlc0GRnOXueBHeXjyQf8qHQofrRdgx26TEGG2sebGMKez2nBkFSvGPBDesq1psfVnGKZ1ViK3h9aRKwOE7Whn-EV8Wps1XvjHEFcuxtgMKXWwdYprhCAA */
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
            actions: assign({
              searchQuery: (_, event) => event.query,
              error: null,
            }),
          },
        },
      },
      searchingUsers: {
        invoke: {
          src: "searchUsers",
          onDone: {
            target: "usersLoaded",
            actions: assign({
              users: (_, event) => event.data.slice(0, 5), // Limit to 5 users,
              selectedUser: (_, event) => event.data[0].login,
            }),
          },
          onError: {
            target: "error",
            actions: assign({
              error: (_, event) => event.data?.message || "Failed to search users",
            }),
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
                actions: assign({
                  repositories: (_, event) => event.data.repositories,
                  hasMoreRepos: (_, event) => event.data.hasMore,
                }),
              },
              onError: {
                target: "error",
                actions: assign({
                  error: (_, event) => event.data?.message || "Failed to load repositories",
                }),
              },
            },
          },
          reposLoaded: {
            on: {
              LOAD_MORE_REPOS: {
                target: "loadingMoreRepos",
                actions: assign({
                  currentPage: (context) => context.currentPage + 1,
                }),
              },
              SELECT_USER: {
                target: "loadingRepos",
                actions: assign({
                  selectedUser: (_, event) => event.username,
                  repositories: [],
                  currentPage: 1,
                  hasMoreRepos: false,
                }),
              },
            },
          },
          loadingMoreRepos: {
            invoke: {
              src: "loadRepositories",
              onDone: {
                target: "reposLoaded",
                actions: assign({
                  repositories: (context, event) => [...context.repositories, ...event.data.repositories],
                  hasMoreRepos: (_, event) => event.data.hasMore,
                }),
              },
              onError: {
                target: "error",
                actions: assign({
                  error: (_, event) => event.data?.message || "Failed to load more repositories",
                }),
              },
            },
          },
          error: {
            on: {
              RETRY: {
                target: "loadingRepos",
                actions: assign({
                  error: null,
                }),
              },
            },
          },
        },
        on: {
          SELECT_USER: {
            target: "usersLoaded.loadingRepos",
            actions: assign({
              selectedUser: (_, event) => event.username,
              repositories: [],
              currentPage: 1,
              hasMoreRepos: false,
            }),
          },
          SEARCH_USERS: {
            target: "searchingUsers",
            actions: assign({
              searchQuery: (_, event) => event.query,
              error: null,
              selectedUser: null,
              repositories: [],
            }),
          },
        },
      },
      error: {
        on: {
          RETRY: {
            target: "idle",
            actions: assign({
              error: null,
            }),
          },
          SEARCH_USERS: {
            target: "searchingUsers",
            actions: assign({
              searchQuery: (_, event) => event.query,
              error: null,
            }),
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
  },
)
