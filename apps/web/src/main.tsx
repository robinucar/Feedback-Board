import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
