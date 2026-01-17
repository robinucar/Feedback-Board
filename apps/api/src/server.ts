import express from "express";
import { validateEnv } from "./env";
import feedbackRouter from "./routes/feedback";
import { errorHandler } from "./middleware/errorHandler";
import { NotFoundError } from "./errors";

validateEnv();

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});


app.use("/feedback", feedbackRouter);

app.use((_req, _res, next) => {
  next(new NotFoundError("Route not found"));
});

app.use(errorHandler);

const port = process.env.PORT ? Number(process.env.PORT) : 4000;

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
