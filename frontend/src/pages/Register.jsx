import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert(
        "Registration successful. Please login."
      );

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-80"
      >
        <h1 className="text-3xl font-bold">
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="border p-3 rounded"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
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
          required
        />

        <button className="bg-black text-white p-3 rounded">
          Register
        </button>

        <p className="text-center">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-500"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;