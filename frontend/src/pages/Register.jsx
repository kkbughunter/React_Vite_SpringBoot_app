import { useState } from "react";
import API from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { username, password });
      alert("Registration successful! Please login.");
      navigate("/"); // redirect to login
    } catch (err) {
      alert("Registration failed (username may exist)");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form
        onSubmit={registerUser}
        className="bg-white p-6 rounded shadow w-80 space-y-3"
      >
        <h2 className="text-xl font-bold text-center">Register</h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Choose a password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-green-600 text-white p-2 rounded">
          Create Account
        </button>

        <p className="text-center text-sm">
          Already have an account?
          <span
            className="text-blue-600 cursor-pointer ml-1"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
