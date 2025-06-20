import type React from "react"
import { cn } from "@/lib/utils"

type AvatarImageProps = React.ImgHTMLAttributes<HTMLImageElement>

export function AvatarImage({ className, ...props }: AvatarImageProps) {
  return <img className={cn("aspect-square h-full w-full object-cover rounded-full", className)} {...props} />
}
