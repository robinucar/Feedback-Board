import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { NotFoundError } from "../errors";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "ValidationError",
      details: err.issues,
    });
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json({
      error: "NotFound",
      message: err.message,
    });
  }

  return res.status(500).json({
    error: "InternalServerError",
  });
}
