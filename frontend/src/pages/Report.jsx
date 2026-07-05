import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import api from "../services/api";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

function Report() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [report, setReport] =
    useState(null);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const res = await api.get(
        `/interview/${id}`
      );

      setReport(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!report) {
    return <Loader />;
  }

  const getScoreColor = (score) => {
    if (score >= 8)
      return "bg-green-500";

    if (score >= 6)
      return "bg-yellow-500";

    return "bg-red-500";
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <h1 className="text-4xl font-bold mb-10">
            Interview Report
          </h1>

          {/* Overall Score */}
          <div className="bg-slate-900 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Overall Score
            </h2>

            <div className="w-36 h-36 mx-auto">
              <CircularProgressbar
                value={report.overallScore}
                text={`${report.overallScore}%`}
                styles={buildStyles({
                  textColor: "#ffffff",
                  pathColor: "#3b82f6",
                  trailColor: "#1e293b",
                })}
              />
            </div>
          </div>

          {/* Take Another Interview */}
          <div className="flex justify-center mb-12">
            <button
              onClick={() =>
                navigate("/dashboard")
              }
              className="
                bg-blue-600
                hover:bg-blue-700
                px-6
                py-3
                rounded-lg
                font-semibold
                transition
              "
            >
              Take Another Interview
            </button>
          </div>

          {/* Strengths / Weaknesses / Recommendations */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">

            <div className="bg-slate-900 p-6 rounded-xl">
              <h2 className="text-2xl font-bold mb-5">
                Strengths
              </h2>

              <ul className="space-y-3">
                {report.strengths?.map(
                  (item, index) => (
                    <li key={index}>
                      • {item}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="bg-slate-900 p-6 rounded-xl">
              <h2 className="text-2xl font-bold mb-5">
                Weaknesses
              </h2>

              <ul className="space-y-3">
                {report.weaknesses?.map(
                  (item, index) => (
                    <li key={index}>
                      • {item}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="bg-slate-900 p-6 rounded-xl">
              <h2 className="text-2xl font-bold mb-5">
                Recommendations
              </h2>

              <ul className="space-y-3">
                {report.recommendations?.map(
                  (item, index) => (
                    <li key={index}>
                      • {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Question Feedback */}
          <div>
            <h2 className="text-3xl font-bold mb-8">
              Question Wise Feedback
            </h2>

            <div className="grid lg:grid-cols-2 gap-6">

              {report.questions?.map(
                (question, index) => (
                  <details
                    key={index}
                    className="bg-slate-900 rounded-xl overflow-hidden"
                  >
                    <summary className="cursor-pointer p-6 list-none">

                      <div className="flex justify-between items-center">

                        <h3 className="text-xl font-bold">
                          Question {index + 1}
                        </h3>

                        <span
                          className={`${getScoreColor(
                            question.score
                          )} px-3 py-1 rounded-full text-sm font-semibold`}
                        >
                          {question.score}/10
                        </span>
                      </div>

                      <p className="text-gray-400 mt-4 line-clamp-2">
                        {question.feedback
                          ?.summary ||
                          "Click to view feedback"}
                      </p>

                      <p className="text-blue-400 text-sm mt-4">
                        View Details ↓
                      </p>
                    </summary>

                    <div className="border-t border-slate-700 p-6">

                      <h4 className="font-semibold">
                        Question
                      </h4>

                      <p className="text-gray-300 mt-2">
                        {
                          question.question
                        }
                      </p>

                      <h4 className="font-semibold mt-6">
                        Your Answer
                      </h4>

                      <p className="text-gray-400 whitespace-pre-wrap mt-2">
                        {question.answer ||
                          "No answer submitted"}
                      </p>

                      {question.feedback && (
                        <>
                          <h4 className="font-semibold mt-6">
                            Summary
                          </h4>

                          <p className="text-gray-400 mt-2">
                            {
                              question
                                .feedback
                                .summary
                            }
                          </p>

                          <h4 className="font-semibold mt-6">
                            Strengths
                          </h4>

                          <ul className="list-disc ml-6 mt-2 space-y-2">
                            {question.feedback.strengths?.map(
                              (
                                item,
                                i
                              ) => (
                                <li key={i}>
                                  {item}
                                </li>
                              )
                            )}
                          </ul>

                          <h4 className="font-semibold mt-6">
                            Improvements
                          </h4>

                          <ul className="list-disc ml-6 mt-2 space-y-2">
                            {question.feedback.improvements?.map(
                              (
                                item,
                                i
                              ) => (
                                <li key={i}>
                                  {item}
                                </li>
                              )
                            )}
                          </ul>
                        </>
                      )}
                    </div>
                  </details>
                )
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Report;