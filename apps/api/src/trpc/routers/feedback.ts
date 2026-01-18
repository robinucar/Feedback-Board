import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { router, publicProcedure } from "../router"
import {
  createFeedback,
  listFeedback,
  updateFeedbackById,
  deleteFeedbackById,
} from "db"

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

  update: publicProcedure
    .input(
      z
        .object({
          id: z.string(),
          title: z.string().min(1).max(200).optional(),
          message: z.string().min(1).max(2000).optional(),
        })
        .refine(
          (data) => data.title !== undefined || data.message !== undefined,
          {
            message: "At least one field must be provided",
          },
        ),
    )
    .mutation(async ({ input }) => {
      const updated = await updateFeedbackById(input.id, {
        title: input.title,
        message: input.message,
      })

      if (!updated) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Feedback not found",
        })
      }

      return updated
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const deleted = await deleteFeedbackById(input.id)

      if (!deleted) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Feedback not found",
        })
      }

      return { success: true }
    }),
})
