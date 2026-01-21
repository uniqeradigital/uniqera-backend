import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import leadRoutes from "./src/routes/leadRoutes.js";

dotenv.config();

const app = express();

// Body parser
app.use(express.json());

// CORS (uses env, fallback to your domain)
const allowedOrigin = process.env.CLIENT_URL || "https://uniqeradigital.com";
app.use(
  cors({
    origin: [allowedOrigin],
    methods: ["GET", "POST"],
  })
);

// Health route (Render test)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Routes
app.use("/api/leads", leadRoutes);

// Port
const PORT = process.env.PORT || 5000;

// Start server with DB first
const start = async () => {
  try {
    console.log("ENV CHECK MONGODB_URI exists?", !!process.env.MONGODB_URI);
    console.log("ENV CHECK PORT =", PORT);
    console.log("Connecting to MongoDB...");

    await connectDB();

    console.log("MongoDB connected. Starting server...");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Startup failed:", err.message);
    process.exit(1);
  }
};

start();
