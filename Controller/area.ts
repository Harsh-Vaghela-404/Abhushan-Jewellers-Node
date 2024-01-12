import express from "express"
import { dbarea } from "../Model/dbarea"
import { output } from "../Model/functions"
import Joi from "joi"
const router = express.Router()

router.post("/createArea", createAreaSchema , crateArea)
router.post("/updateArea", updateAreaSchema, updateArea)
router.post("/deleteArea", deleteAreaSchema, deleteArea)
router.post("/getArea", getAreaSchema, getArea)

module.exports = router;

function createAreaSchema(req:any, res:any, next:any) {
    const schema = Joi.object({
        areaname: Joi.string().required()
    })
    const { error } = schema.validate(req.body)
    if(error){
        res.status(400).send(output(0, error.message));
    }else{
        next()
    }
}

async function crateArea(req:any, res:any) {
    let areaObj = new dbarea()
    let result = await areaObj.createAreas(req.body.areaname)
    if(result.error){
        res.status(400).send(output(0, result.message));
    }else{
        res.status(200).send(output(1, result.message));
    }
}

function updateAreaSchema(req:any, res:any, next:any) {
    const schema = Joi.object({
        areaname: Joi.string().required(),
        id: Joi.number().required()
    })
    const { error } = schema.validate(req.body)
    if(error){
        res.status(400).send(output(0, error.message));
    }else{
        next()
    }
}

async function updateArea(req:any, res:any) {
    let areaObj = new dbarea()
    let result = await areaObj.updateArea(req.body.areaname, req.body.id)

    if(result.error){
        res.status(400).send(output(0, result.message));
    }else{
        res.status(200).send(output(1, result.message));
    }
}

function deleteAreaSchema(req:any, res:any, next:any) {
    const schema = Joi.object({
        id: Joi.number().required()
    })
    const { error } = schema.validate(req.body)
    if(error){
        res.status(400).send(output(0, error.message));
    }else{
        next()
    }
}

async function deleteArea(req:any, res:any) {
    let areaObj = new dbarea()
    let result = await areaObj.deleteArea(req.body.id)

    if(result.error){
        res.status(400).send(output(0, result.message));
    }else{
        res.status(200).send(output(1, result.message));
    }
}

function getAreaSchema(req:any, res:any, next:any) {
    const schema = Joi.object({
        id: Joi.number(),
        areaname: Joi.string()
    })
    const { error } = schema.validate(req.body)
    if(error){
        res.status(400).send(output(0, error.message));
    }else{
        next()
    }
}

async function getArea(req:any, res:any) {
    let areaObj = new dbarea()
    if(!req.body.id){
        req.body.id = 0
    }
    let result = await areaObj.getArea(req.body.id, req.body.areaname)
    if(result.error){
        res.status(400).send(output(0, result.message));
    }else{
        res.status(200).send(output(1, result.message));
    }
}