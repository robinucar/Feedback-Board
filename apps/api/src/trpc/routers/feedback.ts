import { z } from "zod"
import { router, publicProcedure } from "../router"
import { createFeedback, listFeedback } from "db"

export const feedbackRouter = router({
  list: publicProcedure.query(async () => {
    return listFeedback()
  }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1).max(200),
        message: z.string().min(1).max(2000),
      }),
    )
    .mutation(async ({ input }) => {
      return createFeedback(input)
    }),
})
