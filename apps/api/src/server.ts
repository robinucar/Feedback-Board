import express from "express";
import { validateEnv } from "./env";

validateEnv();

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

const port = process.env.PORT ? Number(process.env.PORT) : 4000;

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
