import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import leadRoutes from "./src/routes/leadRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 10,
  })
);

app.get("/", (req, res) => {
  res.json({ ok: true, message: "uniqera backend running" });
});

app.use("/api/leads", leadRoutes);

export default app;
