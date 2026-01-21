import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import leadRoutes from "./src/routes/leadRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST"],
  })
);

// Health check route (VERY IMPORTANT for Render)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Routes
app.use("/api/leads", leadRoutes);

// Port
const PORT = process.env.PORT || 5000;

// Start server AFTER DB connects
const startServer = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await connectDB();
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
