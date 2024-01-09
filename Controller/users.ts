import express from "express";
import { output } from "../Model/constant";
import { dbUser } from "../Model/dbuser";

const router = express.Router();

module.exports = router;

router.post('/signUp', Signup)
router.post('/login', Login)

//Create different Users(Admin, Customer)
async function Signup(req:any, res:any) {
    let UserObj = new dbUser();
    let result:any = await UserObj.Signup(req.body.first_name, req.body.last_name, req.body.second_name, req.body.contact, req.body.address, req.body.role_id, req.body.password);
    if(result.error){
        res.status(400).send(output(0, result.message));
    }else{
        res.status(200).send(output(1, result.message));
    }
}

async function Login(req:any, res:any) {
    let UserObj = new dbUser();
    let result:any = await UserObj.Login(req.body.contact, req.body.password);
    if(result.error){
        res.status(400).send(output(0, result.message));
    }else{
        res.status(200).send(output(1, result.message));
    }
}