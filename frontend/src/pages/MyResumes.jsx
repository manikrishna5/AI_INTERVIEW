import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function MyResumes() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] =
    useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await api.get(
        "/resume/my-resumes"
      );

      setResumes(res.data.data);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data
          ?.message ||
          "Failed to fetch resumes"
      );
    } finally {
      setLoading(false);
    }
  };

  const generateInterview = async (
    resumeId
  ) => {
    try {
      setGenerating(resumeId);

      const res = await api.post(
        `/interview/generate/${resumeId}`
      );

      const interviewId =
        res.data.data._id;

      navigate(
        `/interview/${interviewId}`
      );
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data
          ?.message ||
          "Failed to generate interview"
      );
    } finally {
      setGenerating(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl">
          Loading Resumes...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">
          My Resumes
        </h1>

        <button
          onClick={() =>
            navigate("/dashboard")
          }
          className="bg-slate-700 px-5 py-3 rounded"
        >
          Dashboard
        </button>
      </div>

      {resumes.length === 0 ? (
        <div className="bg-slate-900 p-10 rounded text-center">
          <h2 className="text-2xl mb-4">
            No resumes uploaded yet.
          </h2>

          <button
            onClick={() =>
              navigate("/upload")
            }
            className="bg-blue-500 px-5 py-3 rounded"
          >
            Upload Resume
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="bg-slate-900 p-6 rounded-lg flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold">
                  {resume.fileName}
                </h2>

                <p className="text-gray-400 mt-2">
                  Uploaded on{" "}
                  {new Date(
                    resume.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>

              <button
                onClick={() =>
                  generateInterview(
                    resume._id
                  )
                }
                disabled={
                  generating ===
                  resume._id
                }
                className="bg-blue-500 px-5 py-3 rounded disabled:opacity-50"
              >
                {generating ===
                resume._id
                  ? "Generating..."
                  : "Start Interview"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyResumes;