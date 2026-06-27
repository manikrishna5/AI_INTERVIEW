import Interview from "../models/Interview.js";

export const createInterview =
  async (data) => {
    return await Interview.create(
      data
    );
  };

export const getInterview =
  async (id) => {
    return await Interview.findById(
      id
    )
      .populate("resume")
      .populate(
        "user",
        "-password"
      );
  };

export const saveAnswer =
  async (
    interviewId,
    questionIndex,
    answer,
    evaluation
  ) => {
    const interview =
      await Interview.findById(
        interviewId
      );

    const question =
      interview.questions[
        questionIndex
      ];

    question.answer = answer;

    question.score =
      evaluation.score;

    question.feedback = {
      summary:
        evaluation.summary,

      strengths:
        evaluation.strengths,

      improvements:
        evaluation.improvements,
    };

    await interview.save();

    return interview;
  };