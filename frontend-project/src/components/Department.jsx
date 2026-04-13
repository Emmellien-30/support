import axios from "axios";
import { useState } from "react";

function Department() {
  const [data, setData] = useState({
    DepartmentCode: "",
    DepartmentName: "",
    GrossSalary: "",
    TotalDeduction: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/department", data);
      alert("Department added");
      setData({
        DepartmentCode: "",
        DepartmentName: "",
        GrossSalary: "",
        TotalDeduction: ""
      });
    } catch (err) {
      console.error(err);
      alert("Error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Add Department
        </h2>

        {/* Department Code */}
        <input
          name="DepartmentCode"
          placeholder="Department Code"
          value={data.DepartmentCode}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Department Name */}
        <input
          name="DepartmentName"
          placeholder="Department Name"
          value={data.DepartmentName}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Gross Salary */}
        <input
          type="number"
          name="GrossSalary"
          placeholder="Gross Salary"
          value={data.GrossSalary}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Total Deduction */}
        <input
          type="number"
          name="TotalDeduction"
          placeholder="Total Deduction"
          value={data.TotalDeduction}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Button */}
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-200">
          Save Department
        </button>
      </form>
    </div>
  );
}

export default Department;