import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

function Interview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterview();
  }, []);

  const fetchInterview = async () => {
    try {
      const res = await api.get(`/interview/${id}`);
      setInterview(res.data.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load interview");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!answer.trim()) {
      return alert("Please enter an answer.");
    }

    try {
      await api.post(`/interview/${id}/answer`, {
        questionIndex: currentQuestion,
        answer,
      });

      setAnswer("");

      if (
        currentQuestion <
        interview.questions.length - 1
      ) {
        setCurrentQuestion((prev) => prev + 1);
      } else {
        await api.post(
  `/interview/${id}/complete`
);

navigate(`/report/${id}`);
      }
    } catch (err) {
      console.log(err);
      alert("Failed to submit answer.");
    }
  };

  if (loading) {
  return <Loader />;
}

  const question =
    interview.questions[currentQuestion];

  return (
    <>
      <Navbar />
    <div className="min-h-screen p-10">
      <div className="max-w-4xl mx-auto bg-slate-900 p-8 rounded-xl">

        <h1 className="text-3xl font-bold mb-2">
          Technical Interview
        </h1>

        <p className="mb-8 text-gray-400">
          Question {currentQuestion + 1} of{" "}
          {interview.questions.length}
        </p>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {question.question}
          </h2>

          <div className="flex gap-2 flex-wrap">
            {question.skills?.map((skill) => (
              <span
                key={skill}
                className="bg-blue-500 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <textarea
          rows="8"
          value={answer}
          onChange={(e) =>
            setAnswer(e.target.value)
          }
          className="w-full rounded-lg p-4 text-black"
          placeholder="Type your answer here..."
        />

        <button
          onClick={handleSubmit}
          className="mt-6 bg-blue-500 px-6 py-3 rounded-lg"
        >
          {currentQuestion ===
          interview.questions.length - 1
            ? "Finish Interview"
            : "Next Question"}
        </button>
      </div>
    </div>
    </>
  );
}

export default Interview;