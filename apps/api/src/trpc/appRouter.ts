import { router } from "./router"
import { feedbackRouter } from "./routers/feedback"

export const appRouter = router({
  feedback: feedbackRouter,
})

export type AppRouter = typeof appRouter
