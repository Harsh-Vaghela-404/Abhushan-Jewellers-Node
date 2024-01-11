import express from "express";
import { output } from "../Model/functions";
import { dbshowroom } from "../Model/dbshowroom";

const router = express.Router();

module.exports = router;

router.post('/signUp', Signup)
router.post('/login', Login)

//Create different Users(Admin, Customer)
async function Signup(req:any, res:any) {
    let ShowroomObj = new dbshowroom();
    let result:any = await ShowroomObj.ShowroomSignup(req.body.email, req.body.contact, req.body.address, req.body.showroom_name, req.body.area_id, req.body.password);
    if(result.error){
        res.status(400).send(output(0, result.message));
    }else{
        res.status(200).send(output(1, result.message));
    }
}

async function Login(req:any, res:any) {
    let ShowroomObj = new dbshowroom();
    let result:any = await ShowroomObj.ShowroomLogin(req.body.contact, req.body.password);
    if(result.error){
        res.status(400).send(output(0, result.message));
    }else{
        res.status(200).send(output(1, result.message));
    }
}