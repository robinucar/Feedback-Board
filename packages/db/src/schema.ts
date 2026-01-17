import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";

export const feedback = pgTable("feedback", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});