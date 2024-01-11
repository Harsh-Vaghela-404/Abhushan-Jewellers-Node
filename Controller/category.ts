import express from "express"
import { dbcategory } from "../Model/dbcategory"
import { output } from "../Model/functions"
const router = express.Router()

router.post("/createCategory", createCategory)
router.post("/updateCategory", updateCategory)
router.post("/deleteCategory", deleteCategory)
router.post("/getCategory", getCategory)

module.exports = router
async function createCategory(req:any, res:any) {
    let CategoryObj = new dbcategory()
    let result = await CategoryObj.addCategory(req.body.category_name, req.body.showroom_id)
    if(result.error){
        res.status(400).send(output(0, result.message));
    }else{
        res.status(200).send(output(1, result.message));
    }
}

async function updateCategory(req:any, res:any) {
    let categoryObj = new dbcategory()
    let result = await categoryObj.updateCategory(req.body.category_name, req.body.category_id, req.body.user_id)

    if(result.error){
        res.status(400).send(output(0, result.message));
    }else{
        res.status(200).send(output(1, result.message));
    }
}

async function deleteCategory(req:any, res:any) {
    let categoryObj = new dbcategory()
    let result = await categoryObj.deleteCategory(req.body.category_id, req.body.user_id)

    if(result.error){
        res.status(400).send(output(0, result.message));
    }else{
        res.status(200).send(output(1, result.message));
    }
}

async function getCategory(req:any, res:any) {
    let categoryObj = new dbcategory()
    if(!req.body.category_id){
        req.body.category_id = 0
    }
    let result = await categoryObj.getCategory(req.body.category_id, req.body.category_name, req.body.user_id)
    if(result.error){
        res.status(400).send(output(0, result.message));
    }else{
        res.status(200).send(output(1, result.message));
    }
}