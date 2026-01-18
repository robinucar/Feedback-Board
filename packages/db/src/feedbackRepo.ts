import { desc, eq } from "drizzle-orm";
import { db } from "./client";
import { feedback } from "./schema";

export type CreateFeedbackInput = {
  title: string;
  message: string;
};

export type UpdateFeedbackInput = {
  title?: string;
  message?: string;
};

export async function createFeedback(input: CreateFeedbackInput) {
  const rows = await db
    .insert(feedback)
    .values({
      title: input.title,
      message: input.message,
    })
    .returning();

  return rows[0];
}

export async function listFeedback() {
  return db.select().from(feedback).orderBy(desc(feedback.createdAt));
}

export async function updateFeedbackById(id: string, input: UpdateFeedbackInput) {
  const rows = await db
    .update(feedback)
    .set({
      ...(input.title !== undefined ? { title: input.title } : {}),
      ...(input.message !== undefined ? { message: input.message } : {}),
    })
    .where(eq(feedback.id, id))
    .returning();

  return rows[0];
}


export async function deleteFeedbackById(id: string) {
  const rows = await db
    .delete(feedback)
    .where(eq(feedback.id, id))
    .returning();

  return rows[0];
}

