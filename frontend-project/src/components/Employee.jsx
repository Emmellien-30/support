// components/Employee.jsx
import axios from "axios";
import { useState } from "react";

function Employee() {
  const [data, setData] = useState({
    FirstName: "",
    LastName: "",
    Position: "",
    Address: "",
    Telephone: "",
    Gender: "",
    DepartmentCode: "",
    hiredDate: ""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/employee", data);
      alert("Employee added");
    } catch (err) {
      console.error(err);
      alert("Error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h2 className="text-xl font-bold">Employee</h2>
      <input name="FirstName" placeholder="First Name" onChange={handleChange} className="border p-2 w-full" />
      <input name="LastName" placeholder="Last Name" onChange={handleChange} className="border p-2 w-full" />
      <input name="Position" placeholder="Position" onChange={handleChange} className="border p-2 w-full" />
      <input name="Address" placeholder="Address" onChange={handleChange} className="border p-2 w-full" />
      <input name="Telephone" placeholder="Telephone" onChange={handleChange} className="border p-2 w-full" />
      <input name="Gender" placeholder="Gender" onChange={handleChange} className="border p-2 w-full" />
      <input name="DepartmentCode" placeholder="Department Code" onChange={handleChange} className="border p-2 w-full" />
      <input name="hiredDate" type="date" onChange={handleChange} className="border p-2 w-full" />
      <button className="bg-purple-500 text-white px-4 py-2">Save</button>
    </form>
  );
}
export default Employee;