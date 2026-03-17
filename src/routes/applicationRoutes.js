import express from "express";
import {
  createApplication,
  getApplications,
} from "../controllers/applicationController.js";

const router = express.Router();

router.post("/", createApplication);
router.get("/", getApplications);

export default router;