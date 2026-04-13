const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/employee', async(req,res)=>{
    try {
       const { FirstName, LastName, Position, Address, Telephone, Gender, DepartmentCode,hiredDate } = req.body;
       const sql ='insert into Employee(FirstName, LastName, Position, Address, Telephone, Gender, DepartmentCode,hiredDate) values(?,?,?,?,?,?,?,?)';
       await db.query(sql,[FirstName, LastName, Position, Address, Telephone, Gender, DepartmentCode,hiredDate]);
       res.status(201).json({message: 'Employee inserted successfull'})
        
    } catch (err) {
        console.error("Error",err);
        return res.status(500).json({message:'Internal Error'});
    }
});



router.get('/report', async(req,res)=>{
    try {
        const sql = `SELECT e.FirstName, e.LastName ,d.DepartmentName ,e.Position, s.NetSalary
FROM Employee e
JOIN Department d ON e.DepartmentCode = d.DepartmentCode
JOIN Salary s ON e.EmployeeNumber = s.EmployeeNumber;
`;
        const [rows] = await db.query(sql)
        if(rows.length === 0){
            return res.status(404).json({message: 'Salary not found'});
        }
          res.status(200).json(rows);
        
    } catch (err) {
          console.error("Error",err);
        return res.status(500).json({message:'Internal Error'});
    }
});

router.post('/department' , async(req,res) =>{
    try {
        const { DepartmentCode, DepartmentName, GrossSalary, TotalDeduction} = req.body;
        const sql = `insert into Department( DepartmentCode, DepartmentName, GrossSalary, TotalDeduction)
           values (?,?,?,?);`
    await db.query(sql, [  DepartmentCode, DepartmentName, GrossSalary, TotalDeduction]);
      res.status(201).json({message: 'Department inserted '});
        
    } catch (err) {
        console.error("erro",err);
        return res.status(500).json({message:"Internal error"});
        
    }
});

//crud for salary
router.post('/salary', async(req,res)=>{
    try {
        const { GrossSalary, TotalDeduction, Month, EmployeeNumber} = req.body;
        const sql= 'INSERT INTO Salary(GrossSalary, TotalDeduction, NetSalary,	Month, EmployeeNumber) values(?,?,?,?,?)';
        const NetSalary = GrossSalary - TotalDeduction ;
;        await db.query(sql,[GrossSalary, TotalDeduction, NetSalary,Month, EmployeeNumber]);
         res.status(201).json({message: 'Salary inserted '});
        
    } catch (err) {
        console.error("Error",err);
        return res.status(500).json({message:'Internal Error'});
    }
});

router.delete('/deletesalary/:id', async (req,res) =>{
    try {
        const { id} = req.params;
        
       const sql = 'DELETE FROM Salary where SalaryID = ?';

       const result = await db.query(sql,[id]);
      if(result.affectedRows === 0){
        return res.status(404).json({
            success:false,
             message: `Record not found ${id}` ,result});
      }
     res.status(200).json({ success: true,message: `Record Deleted Successfully with id ${id}`,result });
    } catch (err) {
            console.error("Error",err);
        return res.status(500).json({message:'Internal Error'});
    }
});

router.put('/updatesalary/:id' , async(req,res)=>{
    const   { id} = req.params;
    const {GrossSalary, TotalDeduction, Month, EmployeeNumber} = req.body;
    try {
        const NetSalary = GrossSalary - TotalDeduction ;
        const sql = `UPDATE Salary 
        SET GrossSalary = ?, TotalDeduction = ?, NetSalary = ?, Month = ?, EmployeeNumber = ? 
        WHERE SalaryID = ?`;
       const result = await db.query(sql,[GrossSalary,TotalDeduction,NetSalary,Month,EmployeeNumber,id]);
        res.status(200).json({message:"Salary record updated successfully!",result})
        
    } catch (err) {
            console.error("Error",err);
        return res.status(500).json({message:'Internal Error'});
    }
});

router.get('/salary' , async (req,res) =>{
try {
    const [rows] =await db.query('SELECT * FROM Salary');
    if(rows.length === 0){
        return res.status(404).json({message:"No Data Salary Are Founde"});
    }
     res.status(200).json(rows);
} catch (err) {
      console.error("Error",err);
        return res.status(500).json({message:'Internal Error'});
}
});




module.exports = router ;