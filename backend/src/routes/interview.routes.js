import express from "express";

import protect from "../middleware/auth.middleware.js";

import {
  generateInterview,
  submitAnswer,
  completeInterview,
} from "../controllers/interview.controller.js";
const router =
  express.Router();

router.post(
  "/generate/:resumeId",
  protect,
  generateInterview
);

router.post(
  "/:id/answer",
  protect,
  submitAnswer
);

router.post(
  "/:id/complete",
  protect,
  completeInterview
);
export default router;