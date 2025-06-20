import { AlertCircle } from "lucide-react"

interface ErrorMessageProps {
  message: string
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
      <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
      <p className="text-red-700">{message}</p>
    </div>
  )
}
