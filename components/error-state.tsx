import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ErrorStateProps {
  message: string
}

export default function ErrorState({ message }: ErrorStateProps) {
  const handleRetry = () => {
    window.location.reload()
  }

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Connection Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-2">
        <p>{message}</p>
        <p>Make sure your Go backend is running and accessible.</p>
        <Button variant="outline" size="sm" className="w-fit mt-2" onClick={handleRetry}>
          Retry Connection
        </Button>
      </AlertDescription>
    </Alert>
  )
}

