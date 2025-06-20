"use client"

import React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

type AccordionProps = {
  type: "single" | "multiple"
  collapsible?: boolean
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  children: React.ReactNode
  className?: string
}

export function Accordion({ type, collapsible = false, value, onValueChange, children, className }: AccordionProps) {
  const [internalValue, setInternalValue] = useState<string | string[]>(type === "single" ? "" : [])

  const currentValue = value !== undefined ? value : internalValue

  const handleValueChange = (newValue: string | string[]) => {
    if (onValueChange) {
      onValueChange(newValue)
    } else {
      setInternalValue(newValue)
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              currentValue,
              onValueChange: handleValueChange,
              type,
              collapsible,
            } as any)
          : child,
      )}
    </div>
  )
}

type AccordionItemProps = {
  value: string
  children: React.ReactNode
  currentValue?: string | string[]
  onValueChange?: (value: string | string[]) => void
  type?: "single" | "multiple"
  collapsible?: boolean
}

export function AccordionItem({
  value,
  children,
  currentValue,
  onValueChange,
  type = "single",
  collapsible,
}: AccordionItemProps) {
  const isOpen =
    type === "single" ? currentValue === value : Array.isArray(currentValue) && currentValue.includes(value)

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              isOpen,
              value,
              onToggle: () => {
                if (type === "single") {
                  const newValue = isOpen && collapsible ? "" : value
                  onValueChange?.(newValue)
                } else {
                  const currentArray = Array.isArray(currentValue) ? currentValue : []
                  const newValue = isOpen ? currentArray.filter((v) => v !== value) : [...currentArray, value]
                  onValueChange?.(newValue)
                }
              },
            } as any)
          : child,
      )}
    </div>
  )
}

type AccordionTriggerProps = {
  children: React.ReactNode
  className?: string
  isOpen?: boolean
  onToggle?: () => void
}

export function AccordionTrigger({ children, className, isOpen, onToggle }: AccordionTriggerProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "flex w-full items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors",
        className,
      )}
    >
      {children}
      <ChevronDown className={cn("h-4 w-4 transition-transform text-gray-500", isOpen && "rotate-180")} />
    </button>
  )
}

type AccordionContentProps = {
  children: React.ReactNode
  className?: string
  isOpen?: boolean
}

export function AccordionContent({ children, className, isOpen }: AccordionContentProps) {
  if (!isOpen) return null

  return <div className={cn("px-4 pb-4 pt-0 border-t border-gray-200 bg-gray-50", className)}>{children}</div>
}
