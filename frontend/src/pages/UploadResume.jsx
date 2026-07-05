import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

function UploadResume() {
  const [file, setFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const navigate =
    useNavigate();

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      if (!file) {
        return alert(
          "Please select a PDF."
        );
      }

      try {
        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "resume",
          file
        );

        await api.post(
          "/resume/upload",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        alert(
          "Resume uploaded successfully!"
        );

        navigate("/resumes");
      } catch (error) {
        console.log(error);

        alert(
          error.response?.data
            ?.message ||
            "Upload failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <>
      <Navbar />
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={
          handleSubmit
        }
        className="bg-slate-900 p-8 rounded-lg w-[500px]"
      >
        <h1 className="text-3xl font-bold mb-6">
          Upload Resume
        </h1>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setFile(
              e.target.files[0]
            )
          }
          className="mb-6"
        />

        <button
          className="bg-blue-500 px-5 py-3 rounded w-full"
          disabled={loading}
        >
          {loading
            ? "Uploading..."
            : "Upload Resume"}
        </button>
      </form>
    </div>
    </>
  );
}

export default UploadResume;