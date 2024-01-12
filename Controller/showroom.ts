import express from "express";
import { output } from "../Model/functions";
import { dbshowroom } from "../Model/dbshowroom";
import Joi from "joi";

const router = express.Router();

module.exports = router;

router.post('/signUp', signupSchema, Signup)
router.post('/login', loginSchema, Login)

function signupSchema(req:any, res:any, next:any){
    const schema = Joi.object({
        email: Joi.string().email().required(),
        contact: Joi.number().required(),
        address: Joi.string().required(),
        showroom_name: Joi.string().required(),
        area_id: Joi.number().required(),
        password: Joi.string().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send(output(0, error.details[0].message));
    } else {
        next();
    }
}

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

function loginSchema(req:any, res:any, next:any){
    const schema = Joi.object({
        contact: Joi.number().required(),
        password: Joi.string().required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send(output(0, error.details[0].message));
    } else {
        next();
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