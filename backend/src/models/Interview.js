import mongoose from "mongoose";

const questionSchema =
  new mongoose.Schema(
    {
      question: {
        type: String,
        required: true,
      },

      skill: {
        type: [String],
        default: [],
      },

      difficulty: {
        type: String,
        default: "Medium",
      },

      answer: {
        type: String,
        default: "",
      },

      score: {
        type: Number,
        default: 0,
      },

      feedback: {
        summary: {
          type: String,
          default: "",
        },

        strengths: {
          type: [String],
          default: [],
        },

        improvements: {
          type: [String],
          default: [],
        },
      },
    },
    {
      _id: false,
    }
  );

const interviewSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      resume: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Resume",
        required: true,
      },

      title: {
        type: String,
        default:
          "Technical Interview",
      },

      status: {
        type: String,
        enum: [
          "generated",
          "in_progress",
          "completed",
        ],
        default: "generated",
      },

      questions: [questionSchema],

      overallScore: {
        type: Number,
        default: 0,
      },

      strengths: {
        type: [String],
        default: [],
      },

      weaknesses: {
        type: [String],
        default: [],
      },

      recommendations: {
        type: [String],
        default: [],
      },
    },
    {
      timestamps: true,
    }
  );

const Interview =
  mongoose.model(
    "Interview",
    interviewSchema
  );

export default Interview;