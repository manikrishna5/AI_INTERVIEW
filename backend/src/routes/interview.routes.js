import express from "express";

import protect from "../middleware/auth.middleware.js";

import {
  generateInterview,
  submitAnswer,
  completeInterview,
  getMyInterviews,
  getInterviewDetails,
} from "../controllers/interview.controller.js";

const router =
  express.Router();

router.get(
  "/my-interviews",
  protect,
  getMyInterviews
);

router.get(
  "/:id",
  protect,
  getInterviewDetails
);

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