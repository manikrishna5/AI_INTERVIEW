import {
  getResumeById,
} from "../services/resume.service.js";

import {
  generateQuestions,
  evaluateInterview,
} from "../services/ai.service.js";

import {
  createInterview,
  getInterview,
  saveAnswer,
  getUserInterviews,
  getInterviewById,
} from "../services/interview.service.js";

import cleanJson from "../utils/cleanJson.js";

export const generateInterview =
  async (req, res) => {
    try {
      const resume =
        await getResumeById(
          req.params.resumeId
        );

      if (!resume) {
        return res.status(404).json({
          success: false,
          message:
            "Resume not found",
        });
      }

      // SECURITY CHECK
      if (
        resume.user.toString() !==
        req.user._id.toString()
      ) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const response =
        await generateQuestions(
          resume.parsedData
        );

      const parsed =
        JSON.parse(
          cleanJson(response)
        );

      const interview =
        await createInterview({
          user: req.user._id,
          resume: resume._id,
          questions:
            parsed.questions,
        });

      res.status(201).json({
        success: true,
        data: interview,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to generate interview",
      });
    }
  };

export const submitAnswer =
  async (req, res) => {
    try {
      const {
        questionIndex,
        answer,
      } = req.body;

      const interview =
        await getInterview(
          req.params.id
        );

      if (!interview) {
        return res.status(404).json({
          success: false,
          message:
            "Interview not found",
        });
      }

      if (
        interview.user._id.toString() !==
        req.user._id.toString()
      ) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized",
        });
      }

      interview.questions[
        questionIndex
      ].answer = answer;

      await interview.save();

      res.json({
        success: true,
        message:
          "Answer saved successfully",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to save answer",
      });
    }
  };

export const completeInterview =
  async (req, res) => {
    try {
      const interview =
        await getInterview(
          req.params.id
        );

      if (!interview) {
        return res.status(404).json({
          success: false,
          message:
            "Interview not found",
        });
      }

      if (
        interview.user._id.toString() !==
        req.user._id.toString()
      ) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const response =
        await evaluateInterview(
          interview
        );

      const report =
        JSON.parse(
          cleanJson(response)
        );

      interview.overallScore =
        report.overallScore;

      interview.strengths =
        report.strengths || [];

      interview.weaknesses =
        report.weaknesses || [];

      interview.recommendations =
        report.recommendations ||
        [];

      report.questions.forEach(
        (item, index) => {
          interview.questions[
            index
          ].score =
            item.score > 10
    ? Math.round(item.score / 10)
    : item.score;

          interview.questions[
            index
          ].feedback = {
            summary:
              item.summary,
            strengths:
              item.strengths,
            improvements:
              item.improvements,
          };
        }
      );

      interview.status =
        "completed";

      await interview.save();

      res.json({
        success: true,
        data: interview,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to complete interview",
      });
    }
  };

export const getMyInterviews =
  async (req, res) => {
    try {
      const interviews =
        await getUserInterviews(
          req.user._id
        );

      res.json({
        success: true,
        data: interviews,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch interviews",
      });
    }
  };

export const getInterviewDetails =
  async (req, res) => {
    try {
      const interview =
        await getInterviewById(
          req.params.id
        );

      if (!interview) {
        return res.status(404).json({
          success: false,
          message:
            "Interview not found",
        });
      }

      // SECURITY CHECK
      if (
        interview.user._id.toString() !==
        req.user._id.toString()
      ) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized",
        });
      }

      res.json({
        success: true,
        data: interview,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch interview",
      });
    }
  };