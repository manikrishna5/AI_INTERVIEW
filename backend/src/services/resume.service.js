import Resume from "../models/Resume.js";

export const createResume = async (
  data
) => {
  const resume =
    await Resume.create(data);

  return resume;
};

export const getUserResumes =
  async (userId) => {
    return await Resume.find({
      user: userId,
    }).sort({
      createdAt: -1,
    });
  };

export const getResumeById =
  async (resumeId) => {
    return await Resume.findById(
      resumeId
    );
  };

  export const updateParsedData =
  async (
    resumeId,
    parsedData
  ) => {
    return await Resume.findByIdAndUpdate(
      resumeId,
      {
        parsedData,
      },
      {
        new: true,
      }
    );
  };