import { Router } from "express";
import { z } from "zod";
import { createFeedback, type CreateFeedbackInput } from "db";

const router = Router();

const CreateFeedbackSchema: z.ZodType<CreateFeedbackInput> = z.object({
  title: z.string().min(1).max(200),
  message: z.string().min(1).max(2000),
});

router.post("/", async (req, res, next) => {
  try {
    const input = CreateFeedbackSchema.parse(req.body);
    const created = await createFeedback(input);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

export default router;
