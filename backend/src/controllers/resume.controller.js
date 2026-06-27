import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import extractPdfText from "../utils/extractPdfText.js";

import {
  createResume,
  getUserResumes,
  getResumeById,
} from "../services/resume.service.js";

import {
  parseResume,
} from "../services/ai.service.js";

import cleanJson
  from "../utils/cleanJson.js";

export const uploadResume = async (
  req,
  res
) => {
  console.log(req.file);
  console.log(req.body);

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF",
      });
    }

    // Upload PDF to Cloudinary
    const result =
      await uploadToCloudinary(
        req.file.buffer,
        `${Date.now()}-${req.file.originalname}`
      );

    // Extract text from PDF
    const text =
      await extractPdfText(
        req.file.buffer
      );

    // Parse with Gemini
    const parsedText =
      await parseResume(text);

    console.log(
      "Gemini Response:",
      parsedText
    );

    const parsedData =
  JSON.parse(
    cleanJson(parsedText)
  );

    // Save resume
    const resume =
      await createResume({
        user: req.user._id,
        fileName:
          req.file.originalname,
        resumeUrl:
          result.secure_url,
        publicId:
          result.public_id,
        parsedData,
      });

    res.status(201).json({
      success: true,
      message:
        "Resume uploaded successfully",
      data: resume,
    });
  } catch (error) {
    console.log(
      "Upload Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Resume upload failed",
      error: error.message,
    });
  }
};

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
      console.log(error);

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
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch resume",
      });
    }
  };