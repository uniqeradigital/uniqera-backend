import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import leadRoutes from "./src/routes/leadRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: ["https://YOUR_FRONTEND_DOMAIN.com"], // replace with real domain
  methods: ["GET", "POST"],
}));

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api/leads", leadRoutes);

const PORT = process.env.PORT || 5000;

await connectDB();

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
