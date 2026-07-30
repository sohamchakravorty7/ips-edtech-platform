"use client"

import { Button } from "@/components/ui/button"
import { AlertCircleIcon } from "lucide-react"

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <AlertCircleIcon className="mb-4 h-12 w-12 text-destructive" aria-hidden="true" />
      <h1 className="text-2xl font-semibold tracking-tight">Something went wrong</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        {error.message ?? "An unexpected error occurred. Please try again."}
      </p>
      <Button variant="outline" className="mt-6" onClick={reset}>
        Try Again
      </Button>
    </div>
  )
}