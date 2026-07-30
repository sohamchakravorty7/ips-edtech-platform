import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestionIcon } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <FileQuestionIcon className="mb-4 h-12 w-12 text-muted-foreground" aria-hidden="true" />
      <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        The page you{"'"}re looking for doesn{"'"}t exist or has been moved.
      </p>
      <Link href="/">
        <Button variant="outline" className="mt-6">
          Go Home
        </Button>
      </Link>
    </div>
  )
}