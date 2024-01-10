import express from "express"
import bodyParser from "body-parser"

const userRoute = require('./Controller/users')
const categoryRoute = require('./Controller/category')
const showroomRoute = require('./Controller/showroom')
const areaRoute = require('./Controller/area')
const subcategory = require('./Controller/subcategory')

// Documentation Link
// https://documenter.getpostman.com/view/30940488/2s9YsM8WHm

require('dotenv').config()
const app = express();
app.use(bodyParser.json());

let port = process.env.PORT

app.use('/users', userRoute)
app.use('/category', categoryRoute)
app.use('/showroom', showroomRoute)
app.use('/area', areaRoute)
app.use('/subcategory', subcategory)

app.listen(port, ()=>{
    console.log(`Server Connected on port ${port}`);
})