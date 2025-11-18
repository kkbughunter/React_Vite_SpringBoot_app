import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  const { login, register, loading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await register({ username, password });
        alert("Registration successful! Please login.");
        setIsRegister(false);
      } else {
        await login({ username, password });
        navigate("/dashboard");
      }
    } catch (err) {
      // Error is handled by the hook
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-80 space-y-3"
      >
        <h2 className="text-xl font-bold text-center">
          {isRegister ? "Register" : "Login"}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
            {error}
          </div>
        )}

        <input
          className="w-full border p-2 rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button 
          className="w-full bg-blue-600 text-white p-2 rounded disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Processing..." : (isRegister ? "Register" : "Login")}
        </button>

        <p className="text-center text-sm">
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="ml-1 text-blue-600 underline"
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </form>
    </div>
  );
}
