import { Link, useNavigate } from 'react-router-dom';

export default function Layout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-6">
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/items"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Items
              </Link>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}