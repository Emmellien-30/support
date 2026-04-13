import axios from "axios";
import { useEffect, useState } from "react";

function Salary() {
  const [data, setData] = useState({
    GrossSalary: "",
    TotalDeduction: "",
    Month: "",
    EmployeeNumber: "",
  });

  const [salaries, setSalaries] = useState([]);
  const [editId, setEditId] = useState(null);

  // fetch salaries
  const fetchSalaries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/salary");
      setSalaries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // ADD or UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        // UPDATE
        await axios.put(
          `http://localhost:5000/api/updatesalary/${editId}`,
          data
        );
        alert("Updated Successfully");
      } else {
        // ADD
        await axios.post("http://localhost:5000/api/salary", data);
        alert("Added Successfully");
      }

      setData({
        GrossSalary: "",
        TotalDeduction: "",
        Month: "",
        EmployeeNumber: "",
      });

      setEditId(null);
      fetchSalaries();
    } catch (err) {
      console.error(err);
      alert("Error");
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/deletesalary/${id}`
      );
      fetchSalaries();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // EDIT
  const handleEdit = (sal) => {
    setData({
      GrossSalary: sal.GrossSalary,
      TotalDeduction: sal.TotalDeduction,
      Month: sal.Month,
      EmployeeNumber: sal.EmployeeNumber,
    });
    setEditId(sal.SalaryID);
  };

  const netSalary =
    Number(data.GrossSalary || 0) - Number(data.TotalDeduction || 0);

  return (
    <div className="p-6 space-y-6">
      
      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md grid grid-cols-2 gap-4"
      >
        <h2 className="col-span-2 text-xl font-bold">
          {editId ? "Update Salary" : "Add Salary"}
        </h2>

        <input
          type="number"
          name="GrossSalary"
          placeholder="Gross Salary"
          value={data.GrossSalary}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="TotalDeduction"
          placeholder="Total Deduction"
          value={data.TotalDeduction}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="Month"
          placeholder="Month"
          value={data.Month}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="EmployeeNumber"
          placeholder="Employee Number"
          value={data.EmployeeNumber}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        {/* Net Salary */}
        <div className="col-span-2 bg-gray-100 p-2 rounded text-center">
          Net Salary: <strong>{netSalary}</strong>
        </div>

        <button className="col-span-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          {editId ? "Update" : "Save"}
        </button>
      </form>

      {/* TABLE */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Salary List</h2>

        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th>ID</th>
              <th>Gross</th>
              <th>Deduction</th>
              <th>Net</th>
              <th>Month</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {salaries.map((sal) => (
              <tr key={sal.SalaryID} className="text-center border">
                <td>{sal.SalaryID}</td>
                <td>{sal.GrossSalary}</td>
                <td>{sal.TotalDeduction}</td>
                <td>{sal.NetSalary}</td>
                <td>{sal.Month}</td>

                <td className="space-x-2">
                  <button
                    onClick={() => handleEdit(sal)}
                    className="bg-yellow-400 px-2 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(sal.SalaryID)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Salary;