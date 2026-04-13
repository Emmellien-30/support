
// components/Report.jsx
import axios from "axios";
import { useState, useEffect } from "react";

function Report() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/report")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <table className="w-full border">
      <thead className="bg-gray-200">
        <tr>
          <th>Full Name</th>
          <th>Position</th>
          <th>Department</th>
          <th>Net Salary</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d, i) => (
          <tr key={i} className="text-center border">
            <td>{d.FirstName} {d.LastName}</td>
            <td>{d.Position}</td>
            <td>{d.DepartmentName}</td>
            <td>{d.NetSalary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default Report;