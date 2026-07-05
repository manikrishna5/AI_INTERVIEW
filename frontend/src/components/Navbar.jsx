import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 px-8 py-5 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        AI Interview Copilot
      </h1>

      <div className="flex gap-6">
        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/upload">
          Upload
        </Link>

        <Link to="/resumes">
          My Resumes
        </Link>

        <button
          onClick={handleLogout}
          className="text-red-400"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;