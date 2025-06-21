# GitHub Repo Explorer 🔍

An interactive CLI extension for exploring GitHub repositories without needing to clone them — built as a `gh` (GitHub CLI) plugin.

---

## 🚀 Features

- Search and browse repo contents (files, directories) interactively  
- View file contents with syntax highlighting  
- Navigate branches and revisions without leaving terminal  
- Works offline once initial data is cached  

---

## 📁 Project Structure

```
github-repo-explorer/
├── README.md                 # Project documentation
├── app/                      # Main Next.js app directory
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page component
├── components/               # Reusable UI components
│   ├── ui/                   # Stateless design system components
│   │   ├── accordion.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   └── input.tsx
│   ├── error-message.tsx     # Form or API error display
│   ├── loading-spinner.tsx   # Loading indicator
│   ├── repository-card.tsx   # Card UI for a single repo
│   ├── repository-list.tsx   # List layout for search results
│   ├── search-input.tsx      # Search input field
│   └── user-list.tsx         # Contributor/user list component
├── lib/                      # Core logic and GitHub service layer
│   ├── github-api.ts         # GitHub API + cache
│   ├── github-machine.ts     # XState machine for GitHub search
│   ├── github-machine-types.ts # Auto-generated types from XState
│   └── utils.ts              # General utility functions
├── types/                    # Shared TypeScript types and interfaces
└── ...
```


---

## 📦 Dependencies

- Main framework: [NextJS](https://nextjs.org/), [React](https://react.dev/)
- Styling: [TailwindCSS](https://tailwindcss.com/)
- State management: [XState](https://xstate.js.org/)
- GitHub API: [GitHub API Docs](https://docs.github.com/en/rest)
- Icons: [Lucide](https://lucide.dev/)

---

## 🧭 State Machine

Try out our state machine in simulation mode:

[Open in Stately](https://stately.ai/registry/editor/embed/aee52c41-8cca-4059-b6ae-735448026c41?machineId=544096ea-9b65-4252-8202-9cac7a3da8ee)

**What is this?**

This is a simulation of our state machine, built using [Stately](https://stately.ai/). You can interact with the machine by sending events and observing the resulting state changes.

**How to use**

1. Click on the simulation link above to open the Stately editor.
2. Send events to the machine by clicking on the event buttons.
3. Observe the resulting state changes in the state chart.

---

## 🚀 Quick Start

1. Clone the repository: git clone [https://github.com/your-username/github-repo-explorer.git](https://github.com/your-username/github-repo-explorer.git)
2. Install dependencies: `npm install` or `yarn install`
3. Start the development server: `npm run dev` or `yarn dev`
4. Open the application in your web browser: [http://localhost:3000](http://localhost:3000)
5. Search for a repository by keyword in the search bar
6. Click on a repository to view its details

---

## 📧 Contact

Feel free to reach out if you have any questions or suggestions!

email: <a href="mailto:sam.fauzy@gmail.com">sam.fauzy@gmail.com</a>