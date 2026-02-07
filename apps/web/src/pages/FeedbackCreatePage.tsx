import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { trpc } from "../lib/trpc"
import { FeedbackForm } from "../components/FeedbackForm/FeedbackForm"

export const FeedbackCreatePage = () => {
  const [error, setError] = useState<string | null>(null)

  const navigate = useNavigate()
  const utils = trpc.useUtils()

  const createFeedbackMutation = trpc.feedback.create.useMutation({
    onSuccess: () => {
      utils.feedback.list.invalidate()
      navigate("/")
    },
    onError: () => {
      setError("Failed to create feedback")
    },
  })

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Create feedback</h1>

      <FeedbackForm
        initialValues={{ title: "", message: "", label: "other" }}
        submitLabel="Create"
        isSubmitting={createFeedbackMutation.isPending}
        onSubmit={(values) => {
          setError(null)
          createFeedbackMutation.mutate(values)
        }}
      />

      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  )
}
