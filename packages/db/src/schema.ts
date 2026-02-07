import { pgTable, text, uuid, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const feedbackEnumLabel =pgEnum("feedback_label",[
  "bug",
  "improvement",
  "feature",
  "other"
])


export const feedback = pgTable("feedback", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  label: feedbackEnumLabel("label").default("other").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});