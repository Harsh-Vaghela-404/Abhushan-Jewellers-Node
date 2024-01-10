import express from "express"
import { dbarea } from "../Model/dbarea"
import { output } from "../Model/constant"
const router = express.Router()

router.post("/createArea", crateArea)
router.post("/updateArea", updateArea)
router.post("/deleteArea", deleteArea)
router.post("/getArea", getArea)

module.exports = router
async function crateArea(req:any, res:any) {
    let areaObj = new dbarea()
    let result = await areaObj.createAreas(req.body.areaname)
    if(result.error){
        res.status(400).send(output(0, result.message));
    }else{
        res.status(200).send(output(1, result.message));
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

async function deleteArea(req:any, res:any) {
    let areaObj = new dbarea()
    let result = await areaObj.deleteArea(req.body.id)

    if(result.error){
        res.status(400).send(output(0, result.message));
    }else{
        res.status(200).send(output(1, result.message));
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