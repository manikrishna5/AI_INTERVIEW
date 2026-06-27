import express from "express";

import protect from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

import {
  uploadResume,
  getResume,
  getMyResumes,
} from "../controllers/resume.controller.js";

const router = express.Router();

router.post(
  "/upload",
  protect,
  upload.single("resume"),
  uploadResume
);

router.get(
  "/my-resumes",
  protect,
  getMyResumes
);

router.get(
  "/:id",
  protect,
  getResume
);

export default router;