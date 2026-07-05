import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";

function Report() {
  const { id } = useParams();

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

  return (
    <>
      <Navbar />
    <div className="min-h-screen p-10">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-10">
          Interview Report
        </h1>

        <div className="bg-slate-900 p-6 rounded-xl mb-8">
          <h2 className="text-2xl">
            Overall Score
          </h2>

          <p className="text-5xl font-bold mt-4">
            {report.overallScore}%
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-slate-900 p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4">
              Strengths
            </h2>

            <ul className="space-y-2">
              {report.strengths?.map(
                (item, i) => (
                  <li key={i}>
                    • {item}
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4">
              Weaknesses
            </h2>

            <ul className="space-y-2">
              {report.weaknesses?.map(
                (item, i) => (
                  <li key={i}>
                    • {item}
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4">
              Recommendations
            </h2>

            <ul className="space-y-2">
              {report.recommendations?.map(
                (item, i) => (
                  <li key={i}>
                    • {item}
                  </li>
                )
              )}
            </ul>
          </div>

        </div>
      </div>
    </div>
    </>
  );
}

export default Report;