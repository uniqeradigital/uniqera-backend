import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import leadRoutes from "./src/routes/leadRoutes.js";

dotenv.config();

const app = express();

// =======================
// Middleware
// =======================
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "https://uniqeradigital.com",
    methods: ["GET", "POST"],
  })
);

// =======================
// BASIC ROUTES (IMPORTANT)
// =======================
app.get("/", (req, res) => {
  res.status(200).send("Uniqera Backend is running ✅");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// =======================
// API ROUTES
// =======================
app.use("/api/leads", leadRoutes);

// =======================
// START SERVER
// =======================
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log("ENV CHECK MONGODB_URI exists?", !!process.env.MONGODB_URI);
    console.log("ENV CHECK PORT =", PORT);

    console.log("Connecting to MongoDB...");
    await connectDB();

    console.log("MongoDB connected ✅");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Startup failed ❌", error.message);
    process.exit(1);
  }
};

startServer();
