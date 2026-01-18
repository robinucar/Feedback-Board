import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { trpc } from "../lib/trpc"

export const FeedbackCreatePage = () => {
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const navigate = useNavigate()
  const utils = trpc.useUtils()

  const createFeedbackMutation = trpc.feedback.create.useMutation({
    onSuccess: () => {
      utils.feedback.list.invalidate()
      setSuccess(true)
      setTitle("")
      setMessage("")
      navigate("/")
    },
    onError: () => {
      setError("Failed to create feedback")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    createFeedbackMutation.mutate({ title, message })
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Create feedback</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="title" className="block text-sm mb-1">
            Title
          </label>
          <input
            id="title"
            className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm mb-1">
            Message
          </label>
          <textarea
            id="message"
            className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={createFeedbackMutation.isPending}
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold disabled:opacity-50"
        >
          {createFeedbackMutation.isPending ? "Saving..." : "Create"}
        </button>
      </form>

      {success && (
        <p className="text-sm text-emerald-400">
          Feedback created successfully.
        </p>
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  )
}
