const dotenv =require( 'dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');


app.use(express.json());
app.use(cors());



const authRouter = require('./router/authRouter');
const IndexRouter = require('./router/index');

app.get('/', (req,res)=>{
   res.send('hello');
});


app.use('/api',authRouter);
app.use('/api', IndexRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`http://localhost:5000`)
})