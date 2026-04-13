import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

function UpdateSalary() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const navigate = useNavigate();

  const [form, setForm] = useState({
    GrossSalary: "",
    TotalDeduction: "",
    Month: "",
    EmployeeNumber: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // fetch one salary
  useEffect(() => {
    const fetchOne = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/salary/${id}`
        );
        setForm(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (id) fetchOne();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/updatesalary/${id}`,
        form
      );

      alert("Updated successfully");
      navigate("/salary");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-lg rounded w-96"
      >
        <h2 className="text-xl mb-4">Update Salary</h2>

        <input
          type="number"
          name="GrossSalary"
          placeholder="Gross Salary"
          value={form.GrossSalary}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
        />

        <input
          type="number"
          name="TotalDeduction"
          placeholder="Total Deduction"
          value={form.TotalDeduction}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
        />

        <input
          type="text"
          name="Month"
          placeholder="Month"
          value={form.Month}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
        />

        <input
          type="text"
          name="EmployeeNumber"
          placeholder="Employee Number"
          value={form.EmployeeNumber}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
        />

        <button className="bg-green-500 text-white w-full p-2">
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateSalary;