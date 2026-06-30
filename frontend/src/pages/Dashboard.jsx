import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-8">
        AI Interview Copilot
      </h1>

      <div className="flex gap-4 mb-10">
        <button
          onClick={() =>
            navigate("/upload")
          }
          className="bg-black text-white px-5 py-3 rounded"
        >
          Upload Resume
        </button>

        <button
          onClick={() =>
            navigate("/resumes")
          }
          className="bg-blue-500 text-white px-5 py-3 rounded"
        >
          My Resumes
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-5 py-3 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;