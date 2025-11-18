import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axiosConfig";
import Layout from "../components/Layout";

export default function Dashboard() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await API.get("/user/me");
        setUsername(res.data);
      } catch (err) {
        console.error("Error fetching user", err);
      }
    }
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <Layout>
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-8">
            Welcome, {username} 👋
          </h1>
          <div className="space-y-4">
            <Link
              to="/items"
              className="block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Manage Items
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
