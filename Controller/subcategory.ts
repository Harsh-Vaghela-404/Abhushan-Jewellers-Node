import express from "express"
import { dbsubcategory } from "../Model/dbsubcategory"
import { output } from "../Model/functions"
const router = express.Router()

router.post("/createSubcategory", createSubcategory)
router.post("/updateSubcategory", updateSubcategory)
router.post("/deleteSubcategory", deleteSubcategory)
router.post("/getSubcategory", getSubcategory)

module.exports = router
async function createSubcategory(req:any, res:any) {
    let SubcategoryObj = new dbsubcategory()
    let result = await SubcategoryObj.createSubCategory(req.body.subcategoryname, req.body.category_id, req.body.showroom_id)
    if(result.error){
        res.status(400).send(output(0, result.message));
    }else{
        res.status(200).send(output(1, result.message));
    }
}

async function updateSubcategory(req:any, res:any) {
    let SubcategoryObj = new dbsubcategory()
    let result = await SubcategoryObj.updateSubCategory(req.body.subcategoryname, req.body.id, req.body.showroom_id)

    if(result.error){
        res.status(400).send(output(0, result.message));
    }else{
        res.status(200).send(output(1, result.message));
    }
}

async function deleteSubcategory(req:any, res:any) {
    let SubcategoryObj = new dbsubcategory()
    let result = await SubcategoryObj.deleteSubCategory(req.body.id, req.body.showroom_id)

    if(result.error){
        res.status(400).send(output(0, result.message));
    }else{
        res.status(200).send(output(1, result.message));
    }
}

async function getSubcategory(req:any, res:any) {
    let SubcategoryObj = new dbsubcategory()
    let result = await SubcategoryObj.getSubCategory(req.body.id, req.body.subcategoryname, req.body.showroom_id)
    if(result.error){
        res.status(400).send(output(0, result.message));
    }else{
        res.status(200).send(output(1, result.message));
    }
}