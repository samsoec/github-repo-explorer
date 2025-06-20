"use client"

import type React from "react"
import { Search } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
  isLoading: boolean
}

export function SearchInput({ value, onChange, onSearch, isLoading }: SearchInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch()
    }
  }

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Enter username"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isLoading}
      />
      <Button onClick={onSearch} disabled={isLoading || !value.trim()} className="w-full gap-2">
        <Search className="w-4 h-4" />
        Search
      </Button>
    </div>
  )
}
