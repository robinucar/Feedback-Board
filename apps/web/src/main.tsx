import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"

import { trpc } from "./lib/trpc"

import "./index.css"

import { AppLayout } from "./layouts/AppLayout"
import { FeedbackListPage } from "./pages/FeedbackListPage"
import { FeedbackCreatePage } from "./pages/FeedbackCreatePage"

const router = createBrowserRouter([
  {
    element: <AppLayout />,
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
        <RouterProvider router={router} />
      </QueryClientProvider>
    </trpc.Provider>
  </StrictMode>,
)
