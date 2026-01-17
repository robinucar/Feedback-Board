import express from "express";
import { validateEnv } from "./env";
import feedbackRouter from "./routes/feedback";
import { errorHandler } from "./middleware/errorHandler";
import { NotFoundError } from "./errors";

validateEnv();

const app = express();

// middleware
app.use(express.json());

// routes
app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.use("/feedback", feedbackRouter);

// 404
app.use((_req, _res, next) => {
  next(new NotFoundError("Route not found"));
});

// error handler
app.use(errorHandler);

// server
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
