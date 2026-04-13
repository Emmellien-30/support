import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Layout() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 flex-1 p-6">
        <div className="bg-white rounded-xl shadow-md p-6 min-h-[calc(100vh-3rem)]">
          <Outlet />
        </div>
      </div>

    </div>
  );
}

export default Layout;