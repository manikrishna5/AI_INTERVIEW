import express from "express";

import healthRoutes from "./health.routes.js";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import resumeRoutes from "./resume.routes.js";
import interviewRoutes from "./interview.routes.js";


const router = express.Router();

router.use("/", healthRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use(
  "/resume",
  resumeRoutes
);
router.use(
  "/interview",
  interviewRoutes
);

export default router;