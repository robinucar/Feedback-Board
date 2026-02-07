CREATE TYPE "public"."feedback_label" AS ENUM('bug', 'improvement', 'feature', 'other');--> statement-breakpoint
ALTER TABLE "feedback" ADD COLUMN "label" "feedback_label" DEFAULT 'other' NOT NULL;