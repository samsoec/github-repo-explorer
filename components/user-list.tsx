"use client"

import type { GitHubUser } from "@/types/github"
import { AvatarImage } from "./ui/avatar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"

interface UserListProps {
  users: GitHubUser[]
  selectedUser: string | null
  onUserSelect: (username: string) => void
  renderRepositories: (username: string) => React.ReactNode
}

export function UserList({ users, selectedUser, onUserSelect, renderRepositories }: UserListProps) {

  return (
    <Accordion 
      type="single"
      value={selectedUser!}
      collapsible 
      onValueChange={(val) => onUserSelect(Array.isArray(val) ? val[0] : val)} 
    >
      {users.map((user) => {
        return (
          <AccordionItem key={user.id} value={user.login}>
            <AccordionTrigger>
              <div className="flex items-center gap-3">
                <AvatarImage
                  src={user.avatar_url || "/placeholder.svg?height=32&width=32"}
                  alt={user.login}
                  className="w-8 h-8"
                />
                <span className="font-medium text-left">{user.login}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>{renderRepositories(user.login)}</AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
