import uploadToCloudinary from "../utils/uploadToCloudinary.js";

import {
  createResume,
} from "../services/resume.service.js";

export const uploadResume =
  async (req, res) => {
    console.log(req.file);
    console.log(req.body);
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message:
            "Please upload a PDF",
        });
      }

      const result =
        await uploadToCloudinary(
          req.file.buffer,
          `${Date.now()}-${
            req.file.originalname
          }`
        );

      const resume =
        await createResume({
          user: req.user._id,

          fileName:
            req.file.originalname,

          resumeUrl:
            result.secure_url,

          publicId:
            result.public_id,
        });

      res.status(201).json({
        success: true,
        message:
          "Resume uploaded successfully",

        data: resume,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Resume upload failed",
      });
    }
  };

  import {
  getUserResumes,
  getResumeById,
} from "../services/resume.service.js";

export const getMyResumes =
  async (req, res) => {
    try {
      const resumes =
        await getUserResumes(
          req.user._id
        );

      res.json({
        success: true,
        data: resumes,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Failed to fetch resumes",
      });
    }
  };

  export const getResume =
  async (req, res) => {
    try {
      const resume =
        await getResumeById(
          req.params.id
        );

      if (!resume) {
        return res.status(404).json({
          success: false,
          message:
            "Resume not found",
        });
      }

      res.json({
        success: true,
        data: resume,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          "Failed to fetch resume",
      });
    }
  };

  import extractPdfText from "../utils/extractPdfText.js";

import {
  parseResume,
} from "../services/ai.service.js";

import {
  updateParsedData,
} from "../services/resume.service.js";

export const parseResumeAI =
  async (req, res) => {
    try {
      const resume =
        await getResumeById(
          req.params.id
        );

      if (!resume) {
        return res.status(404).json({
          success: false,
          message:
            "Resume not found",
        });
      }

      const text =
        await extractPdfText(
          resume.resumeUrl
        );

      const parsedText =
        await parseResume(text);

      const parsedData =
        JSON.parse(parsedText);

      const updatedResume =
        await updateParsedData(
          resume._id,
          parsedData
        );

      res.json({
        success: true,
        data: updatedResume,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Resume parsing failed",
      });
    }
  };