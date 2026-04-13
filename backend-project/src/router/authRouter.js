const express=require('express');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../config/db');


router.post('/register',async(req,res) =>{
    try {
        const{username, email, password} = req.body;
        const [rows] = await db.query('select * from users where email=?',[email]);
        if(rows.length > 0){
           return res.status(200).json({message:'User Exist'});
        }
        const sql = 'insert into users(username,email,password) values(?,?,?)';
        const hashPassword = await bcrypt.hash(password,10);
        await db.query(sql,[username,email,hashPassword]);
        return res.status(200).json({message:'user inserted'});

    } catch (err) {
        console.error(err);
        res.status(500).json({message:'enternol server error'});
    }
});

router.post('/login', async (req,res)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(401).json({message: 'Email and Password Required'});
          }  
          const [rows] = await db.query('SELECT * FROM users where email = ?',[email]);
          if(rows.length === 0){
            return res.status(404).json({message:'User Not Found'})
          }
 const user = rows[0];
 const match = await bcrypt.compare(password,user.password);
 if(!match){
    return res.status(400).json({message:'Incorect Password'});
 }
 const token = jwt.sign({
    user_id:user.user_id,
    Username:user.Username,
    email:user.email
 }, process.env.JWT_SECRET,{expiresIn:'1h'}
);

return res.status(200).json({message:'Login Successfully',
    token,
    user:{user_id:user.user_id,
        Username:user.Username
    }
});
        
        
    } catch (err) {
        console.error(err);
        res.status(500).json({message:'enternol server error'});

    }
})



module.exports=router;