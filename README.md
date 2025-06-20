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

## 🚀 Quick Start

- Getting Started
- Clone the repository: git clone [https://github.com/your-username/github-repo-explorer.git](https://github.com/your-username/github-repo-explorer.git)
- Install dependencies: `npm install` or `yarn install`
- Start the development server: `npm run dev` or `yarn dev`
- Open the application in your web browser: [http://localhost:3000](http://localhost:3000)
- Search for a repository by keyword in the search bar
- Click on a repository to view its details

---

## 📧 Contact

Feel free to reach out if you have any questions or suggestions!

email: <a href="mailto:sam.fauzy@gmail.com">sam.fauzy@gmail.com</a>