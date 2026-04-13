import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [stats, setStats] = useState({
    employees: 0,
    salaries: 0,
    departments: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const emp = await axios.get("http://localhost:5000/api/employee");
        const sal = await axios.get("http://localhost:5000/api/salary");
        const dep = await axios.get("http://localhost:5000/api/department");

        setStats({
          employees: emp.data.length,
          salaries: sal.data.length,
          departments: dep.data.length,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Welcome */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-700">
          Welcome to EPMS 🎉
        </h2>
        <p className="text-gray-500 mt-2">
          Employee Payroll Management System Dashboard
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Employees */}
        <div className="bg-blue-500 text-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg">Employees</h3>
          <p className="text-3xl font-bold">{stats.employees}</p>
        </div>

        {/* Salaries */}
        <div className="bg-green-500 text-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg">Salaries</h3>
          <p className="text-3xl font-bold">{stats.salaries}</p>
        </div>

        {/* Departments */}
        <div className="bg-purple-500 text-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg">Departments</h3>
          <p className="text-3xl font-bold">{stats.departments}</p>
        </div>

      </div>

      {/* Quick Info Section */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-3">System Overview</h3>
        <p className="text-gray-600">
          Manage employees, salaries, and departments efficiently. 
          Use the sidebar to navigate through different sections.
        </p>
      </div>

    </div>
  );
}

export default Home;