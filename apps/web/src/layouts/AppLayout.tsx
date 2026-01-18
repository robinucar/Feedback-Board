import { Link, Outlet } from "react-router-dom"

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <Link to="/" className="font-semibold">
            Feedback Board
          </Link>

          <nav className="flex items-center gap-3 text-sm">
            <Link to="/" className="hover:underline">
              List
            </Link>
            <Link to="/new" className="hover:underline">
              Create
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
