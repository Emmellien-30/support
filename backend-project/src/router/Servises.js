const express = require('express');
const router = express.Router();
const {db} = require('../config/db');

router.post('/services', async(req,res)=>{
    try {
        const {ServiceName,ServicePrice} = req.body;
        const insert = `INSERT INTO Services(ServiceName,ServicePrice) Values(?,?);`;
        const [result] = await db.query(insert,[ServiceName,ServicePrice]);
        res.status(201).json({message: "Servise Sucessfull Inserted"})
         
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

router.delete('/services/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const sql = `delete from Services where ServiceCode = ?`;
        const [result] = await db.query(sql,[id]);
        if(result.affectedRows === 0){
             return res.status(404).json({ success:false,message: "Services not Found",result});
        }
         res.status(201).json({message: "Servise Sucessfull deleted",result});
    } catch (err) {
     res.status(500).json({message: err.message});  
     console.error(err)  ;
    }
});

module.exports = router