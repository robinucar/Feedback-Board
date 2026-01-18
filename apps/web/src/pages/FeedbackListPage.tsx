import { useEffect, useState } from "react"
import { fetchFeedbackList, type Feedback } from "../lib/feedback"

export const FeedbackListPage = () => {
  const [items, setItems] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchFeedbackList()
        setItems(data)
      } catch (err) {
        setError("Failed to load feedback")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  if (loading) {
    return <p className="text-white/70">Loading...</p>
  }

  if (error) {
    return <p className="text-red-400">{error}</p>
  }

  if (items.length === 0) {
    return <p className="text-white/70">No feedback yet.</p>
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Feedback</h1>

      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="rounded-md border border-white/10 bg-white/5 p-4"
          >
            <h2 className="font-semibold">{item.title}</h2>
            <p className="mt-1 text-sm text-white/80">{item.message}</p>
            <p className="mt-2 text-xs text-white/50">
              {new Date(item.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
