
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.githubSearch.searchingUsers:invocation[0]": { type: "done.invoke.githubSearch.searchingUsers:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
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
  