import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import api from "../services/api";

import {
  useAuth,
} from "../context/AuthContext";

function Login() {
  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const navigate =
    useNavigate();

  const { setToken } =
    useAuth();

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const res =
          await api.post(
            "/auth/login",
            {
              email,
              password,
            }
          );

        setToken(
          res.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            res.data.user
          )
        );

        navigate(
          "/dashboard"
        );
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Login failed"
        );
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={
          handleSubmit
        }
        className="flex flex-col gap-4 w-80"
      >
        <h1 className="text-3xl font-bold">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button className="bg-black text-white p-3 rounded">
          Login
        </button>
        <p className="text-center mt-4 text-gray-400">
  Don't have an account?{" "}
  <span
    onClick={() => navigate("/register")}
    className="text-blue-500 cursor-pointer hover:underline"
  >
    Register
  </span>
</p>
      </form>
    </div>
  );
}

export default Login;