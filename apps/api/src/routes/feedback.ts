import { Router } from "express";
import { z } from "zod";
import {
  createFeedback,
  deleteFeedbackById,
  listFeedback,
  updateFeedbackById,
  type CreateFeedbackInput,
  type UpdateFeedbackInput,
} from "db";
import { NotFoundError } from "../errors";

const router = Router();

const CreateFeedbackSchema: z.ZodType<CreateFeedbackInput> = z.object({
  title: z.string().min(1).max(200),
  message: z.string().min(1).max(2000),
});

const UpdateFeedbackSchema: z.ZodType<UpdateFeedbackInput> = z
  .object({
    title: z.string().min(1).max(200).optional(),
    message: z.string().min(1).max(2000).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

const IdParamSchema = z.object({
  id: z.string().uuid(),
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

router.get("/", async (_req, res, next) => {
  try {
    const items = await listFeedback();
    res.status(200).json({ items });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = IdParamSchema.parse(req.params);
    const input = UpdateFeedbackSchema.parse(req.body);

    const updated = await updateFeedbackById(id, input);

    if (!updated) {
      return next(new NotFoundError("Feedback not found"));
    }

    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = IdParamSchema.parse(req.params);

    const deleted = await deleteFeedbackById(id);

    if (!deleted) {
      return next(new NotFoundError("Feedback not found"));
    }

    res.status(200).json(deleted);
  } catch (error) {
    next(error);
  }
});

export default router;
