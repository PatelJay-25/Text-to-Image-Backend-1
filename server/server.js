const express=require('express')
require('dotenv').config();
const route=require('./routes/route');

const paymentRoute = require('./routes/paymentRoute');

const cors =require('cors')

const port=process.env.PORT || 4000

const app= express()

app.use(cors({
  origin: 'http://localhost:5173', // allow your frontend
  credentials: true // if you use cookies/auth
}));
//use the inbuilt middleware
app.use(express.json())


app.use('/api/v1',route)

app.use('/api/payment', paymentRoute);

const imageRoute = require('./routes/ImageRoutre');
app.use('/api/image', imageRoute);
const db=require('./config/mogodb')
db();

app.get('/',(req,res)=>{
    res.send('the server is started')
})

app.listen(port, ()=>{
    console.log(`the port is runing from port number ${port}`)
})