import { trpc } from "../lib/trpc"

export const FeedbackListPage = () => {
  const { data, isLoading, error } = trpc.feedback.list.useQuery()

  if (isLoading) {
    return <p className="text-white/70">Loading...</p>
  }

  if (error) {
    return <p className="text-red-400">{error.message}</p>
  }

  const items = data ?? []

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

            <div className="mt-3 flex gap-2">
              <button
                type="button"
                className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs hover:bg-white/10"
              >
                Edit
              </button>

              <button
                type="button"
                className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs hover:bg-white/10"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
