import { useState } from "react"
import { createFeedback } from "../lib/feedback"

export const FeedbackCreatePage = () => {
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await createFeedback({ title, message })
      setSuccess(true)
      setTitle("")
      setMessage("")
    } catch {
      setError("Failed to create feedback")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Create feedback</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Title</label>
          <input
            className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Message</label>
          <textarea
            className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold disabled:opacity-50"
        >
          {loading ? "Saving..." : "Create"}
        </button>
      </form>

      {success && (
        <p className="text-sm text-emerald-400">
          Feedback created successfully.
        </p>
      )}

      {error && (
        <p className="text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
