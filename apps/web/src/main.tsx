import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"

import { trpc } from "./lib/trpc"
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary"

import "./index.css"

import { AppLayout } from "./layouts/AppLayout"
import { FeedbackListPage } from "./pages/FeedbackListPage"
import { FeedbackCreatePage } from "./pages/FeedbackCreatePage"

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: (
      <div className="mx-auto mt-10 max-w-xl rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold">Something went wrong</h2>
        <p className="mt-2 text-sm text-white/70">
          Please refresh the page. If the problem continues, try again later.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold"
        >
          Refresh
        </button>
      </div>
    ),
    children: [
      { path: "/", element: <FeedbackListPage /> },
      { path: "/new", element: <FeedbackCreatePage /> },
    ],
  },
])

const queryClient = new QueryClient()

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${import.meta.env.VITE_API_BASE_URL}/trpc`,
    }),
  ],
})

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </QueryClientProvider>
    </trpc.Provider>
  </StrictMode>,
)
