// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Report from "./components/Report";
import Employee from "./components/Employee";
import Salary from "./components/Salary";
import Department from "./components/Department";
import Login from "./components/Login";
import Register from "./components/Register";
import UpdateSalary from "./components/UpdateSalary";
import SalaryReport from "./components/SalaryReport";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Layout with Sidebar */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="employee" element={<Employee />} />
          <Route path="salary" element={<Salary />} />
          <Route path="department" element={<Department />} />
          <Route path="report" element={<Report />} />
          <Route path="updatesalary" element={<UpdateSalary />} />
          <Route path="salaryreport" element={<SalaryReport/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
