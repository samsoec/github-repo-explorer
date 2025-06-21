
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.githubSearch.searchingUsers:invocation[0]": { type: "done.invoke.githubSearch.searchingUsers:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.githubSearch.usersLoaded.loadingMoreRepos:invocation[0]": { type: "done.invoke.githubSearch.usersLoaded.loadingMoreRepos:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.githubSearch.usersLoaded.loadingRepos:invocation[0]": { type: "done.invoke.githubSearch.usersLoaded.loadingRepos:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.githubSearch.searchingUsers:invocation[0]": { type: "error.platform.githubSearch.searchingUsers:invocation[0]"; data: unknown };
"error.platform.githubSearch.usersLoaded.loadingMoreRepos:invocation[0]": { type: "error.platform.githubSearch.usersLoaded.loadingMoreRepos:invocation[0]"; data: unknown };
"error.platform.githubSearch.usersLoaded.loadingRepos:invocation[0]": { type: "error.platform.githubSearch.usersLoaded.loadingRepos:invocation[0]"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "loadRepositories": "done.invoke.githubSearch.usersLoaded.loadingMoreRepos:invocation[0]" | "done.invoke.githubSearch.usersLoaded.loadingRepos:invocation[0]";
"searchUsers": "done.invoke.githubSearch.searchingUsers:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "appendRepositories": "done.invoke.githubSearch.usersLoaded.loadingMoreRepos:invocation[0]";
"assignError": "error.platform.githubSearch.searchingUsers:invocation[0]" | "error.platform.githubSearch.usersLoaded.loadingMoreRepos:invocation[0]" | "error.platform.githubSearch.usersLoaded.loadingRepos:invocation[0]";
"assignRepositories": "done.invoke.githubSearch.usersLoaded.loadingRepos:invocation[0]";
"assignSearchQuery": "SEARCH_USERS";
"assignSelectedUser": "SELECT_USER";
"assignUsersAndSelectFirst": "done.invoke.githubSearch.searchingUsers:invocation[0]";
"clearError": "RETRY";
"incrementPage": "LOAD_MORE_REPOS";
"resetSearchState": "SEARCH_USERS";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "loadRepositories": "LOAD_MORE_REPOS" | "RETRY" | "SELECT_USER" | "done.invoke.githubSearch.searchingUsers:invocation[0]";
"searchUsers": "SEARCH_USERS";
        };
        matchesStates: "error" | "idle" | "searchingUsers" | "usersLoaded" | "usersLoaded.error" | "usersLoaded.loadingMoreRepos" | "usersLoaded.loadingRepos" | "usersLoaded.reposLoaded" | { "usersLoaded"?: "error" | "loadingMoreRepos" | "loadingRepos" | "reposLoaded"; };
        tags: never;
      }
  