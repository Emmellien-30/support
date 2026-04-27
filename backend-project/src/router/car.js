const express = require('express');
const router = express.Router();
const {db} = require("../config/db");

router.get('/car', async(req,res)=>{
    try {
        const select = `Select * from Car`;
        const [rows] = await db.query(select);

        if(rows.length ===0){
            res.status(404).json({message: "Car not Found"});
        }

        res.status(201).json(rows);
    } catch (err) {
         res.status(500).json({message: err.message});  
    }
});
 
router.post('/car', async(req ,res) =>{
    try {
       const {PlateNumber, type, Model,ManufacturingYear, DriverPhone,MechanicName} = req.body;

       await db.query(
            "INSERT INTO Car (PlateNumber, type, Model,ManufacturingYear, DriverPhone,MechanicName) VALUES (?, ?, ?, ?, ?,?)",
            [PlateNumber, type, Model,ManufacturingYear, DriverPhone,MechanicName]
        );

        res.status(201).json({ message: "Car registered successfully" });
        
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

router.get('/car/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const select = `select * from Car where PlateNumber = ?`;

        const [result] = await db.query(select,[id]);
        if(result.length ===0){
            
            return res.status(404).json({ success:false,message: "Car not Found",result});
        }

     res.status(201).json(result);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

router.delete('/car/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const sql = `delete from Car where PlateNumber = ?`;

        const [result] = await db.query(sql,[id]);
        if(result.affectedRows ===0){
            
            return res.status(404).json({ success:false,message: "Car not Found",result});
        }

     res.status(201).json(result);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}); 
router.put('/car/:id',async(req,res)=>{
   try {
     const {id} = req.params.id;
   const {PlateNumber, type, Model,ManufacturingYear, DriverPhone,MechanicName} = req.body;
    const update = 'UPDATE Car SET PlateNumber = ?, type = ?, Model = ?,ManufacturingYear = ?, DriverPhone = ?,MechanicName = ?';

    const [result] = await db.query(update,[PlateNumber, type, Model,ManufacturingYear, DriverPhone,MechanicName]);
    res.status(201).json({messaage: 'car updated successfully',result});
   } catch (err) {
    console.error("Error",err);
      res.status(500).json({message: err.message});
   }
})

module.exports = router;