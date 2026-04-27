const express = require('express');
const router = express.Router();
const {db} = require('../config/db');


router.get('/record', async(req,res)=>{
    try {
        const select = `Select * from ServiceRecord `;
        const [rows] = await db.query(select);

        if(rows.length ===0){
            res.status(404).json({message: "Service not Found"});
        }

        res.status(201).json(rows);
    } catch (err) {
         res.status(500).json({message: err.message});  
    }
});

router.post('/report', async(req ,res) =>{
    try {
       const {PlateNumber, type, Model,ManufacturingYear, DriverPhone,MechanicName} = req.body;

       await db.query(
            "INSERT INTO Car (PlateNumber, type, Model,ManufacturingYear, DriverPhone,MechanicName) VALUES (?, ?, ?, ?, ?,?)",
            [PlateNumber, type, Model,ManufacturingYear, DriverPhone,MechanicName]
        );

        res.status(201).json({ message: "Record recorded successfully" });
        
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});
 

module.exports = router;