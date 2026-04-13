import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkClass =
    "px-3 py-2 rounded-lg transition hover:bg-gray-700";

  const activeClass = "bg-gray-700";

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5 fixed left-0 top-0 flex flex-col justify-between">
      
      {/* Top */}
      <div>
        <h1 className="text-2xl font-bold mb-6 text-center">
          Dashboard
        </h1>

        <nav className="flex flex-col gap-2">
          <NavLink to="/" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
            Home
          </NavLink>

          <NavLink to="/employee" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
            Employee
          </NavLink>

          <NavLink to="/salary" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
            Salary
          </NavLink>

          <NavLink to="/department" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
            Department
          </NavLink>

          <NavLink to="/report" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
            Report
          </NavLink>

          <NavLink to="/salaryreport" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
            Salary Report
          </NavLink>
        </nav>
      </div>

      {/* Bottom (Logout) */}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 w-full py-2 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;