import {
  getResumeById,
} from "../services/resume.service.js";

import {
  generateQuestions,
} from "../services/ai.service.js";

import {
  createInterview,
  getInterview,
} from "../services/interview.service.js";

 import {
  evaluateAnswer,
} from "../services/ai.service.js";

import {
  saveAnswer,
} from "../services/interview.service.js";

import cleanJson
  from "../utils/cleanJson.js";

import {
  generateFinalReport,
} from "../services/ai.service.js";

import {
  getUserInterviews,
  getInterviewById,
} from "../services/interview.service.js";

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

      const response =
        await generateQuestions(
          resume.parsedData
        );

      const cleaned =
  response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

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

      const question =
        interview.questions[
          questionIndex
        ];

      const response =
        await evaluateAnswer(
          question.question,
          answer
        );

const evaluation =
  JSON.parse(
    cleanJson(response)
  );

      const updated =
        await saveAnswer(
          interview._id,
          questionIndex,
          answer,
          evaluation
        );

      res.json({
        success: true,
        data: updated,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Evaluation failed",
      });
    }
  };

export const completeInterview = async (req, res) => {
  try {
    const interview = await getInterview(req.params.id);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    const total = interview.questions.reduce(
      (sum, q) => sum + (q.score || 0),
      0
    );

    const score = Math.round(
      (total / (interview.questions.length * 10)) * 100
    );

    interview.overallScore = score;
    interview.status = "completed";

    // Generate report only once
    const reportResponse =
      await generateFinalReport(interview);

    const report = JSON.parse(
      cleanJson(reportResponse)
    );

    interview.strengths =
      report.strengths || [];

    interview.weaknesses =
      report.weaknesses || [];

    interview.recommendations =
      report.recommendations || [];

    await interview.save();

    res.json({
      success: true,
      data: interview,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to complete interview",
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