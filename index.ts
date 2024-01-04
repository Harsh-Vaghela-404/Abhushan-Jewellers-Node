import express from "express"
import bodyParser from "body-parser"
require('dotenv').config()
import { connectDB } from "./Model/connection";
const app = express();
app.use(bodyParser.json());

let port = process.env.PORT

app.listen(port, ()=>{
    console.log(`Server Connected on port ${port}`);
    connectDB()
})