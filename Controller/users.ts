import express from "express";
import { output } from "../Model/functions";
import { dbUser } from "../Model/dbuser";
import Joi from "joi";

const router = express.Router();

module.exports = router;

router.post('/signUp', signupSchema, Signup)
router.post('/login', loginSchema, Login)

function signupSchema(req:any, res:any, next:any) {
    const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        second_name: Joi.string().required(),
        contact: Joi.string().required(),
        address: Joi.string().required(),
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
    let UserObj = new dbUser();
    let result:any = await UserObj.Signup(req.body.first_name, req.body.last_name, req.body.second_name, req.body.contact, req.body.address, req.body.password);
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
    let UserObj = new dbUser();
    let result:any = await UserObj.Login(req.body.contact, req.body.password);
    if(result.error){
        res.status(400).send(output(0, result.message));
    }else{
        res.status(200).send(output(1, result.message));
    }
}