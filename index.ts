import express from "express"
import bodyParser from "body-parser"
const userRoute = require('./Controller/users')
const categoryRoute = require('./Controller/category')
require('dotenv').config()
const app = express();
app.use(bodyParser.json());

let port = process.env.PORT

app.use('/users', userRoute)
app.use('/category', categoryRoute)
app.listen(port, ()=>{
    console.log(`Server Connected on port ${port}`);
})