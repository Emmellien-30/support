import React, {useState, useEffect} from "react";
import axios from "axios";
function SalaryReport(){
const [data, setData] = useState([]);

 useEffect(() => {
    axios.get("http://localhost:5000/api/salary",data)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return(
    
         <table className="w-full border">
      <thead className="bg-gray-200">
        <tr>
          <th>SalaryId</th>
          <th>Gloss Salary</th>
          <th>Total Deduction</th>
          <th>Net Salary</th>
          <th>Month</th>
          <th>Employee Number</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d, i) => (
          <tr key={i} className="text-center border">
            <td>{d.SalaryID}</td>
            <td>{d.GlossSalary}</td>
            <td>{d.TotalDeduction}</td>
            <td>{d.NetSalary}</td>
            <td>{d.Month}</td>
            <td>{d.EmployeeNumber}</td>
          </tr>
        ))}
      </tbody>  
    </table>
  );
}
export default SalaryReport;
