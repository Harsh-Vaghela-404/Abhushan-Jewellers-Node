import express from "express"
import { dbsubcategory } from "../Model/dbsubcategory"
import { output } from "../Model/functions"
import Joi from "joi"
const router = express.Router()

router.post("/createSubcategory", createSubcategorySchema, createSubcategory)
router.post("/updateSubcategory", updateSubCategorySchema, updateSubcategory)
router.post("/deleteSubcategory", deleteSubCategorySchema, deleteSubcategory)
router.post("/getSubcategory", getSubCategorySchema, getSubcategory)

module.exports = router

function createSubcategorySchema(req:any, res:any, next:any) {
    let schema = Joi.object({
        subcategoryname: Joi.string().required(),
        category_id: Joi.number().required(),
        showroom_id: Joi.number().required()
    })
    const { error } = schema.validate(req.body)
    if(error){
        res.status(400).send(output(0, error.details[0].message));
    }else{
        next()
    }
}

async function createSubcategory(req:any, res:any) {
    let SubcategoryObj = new dbsubcategory()
    let result = await SubcategoryObj.createSubCategory(req.body.subcategoryname, req.body.category_id, req.body.showroom_id)
    if(result.error){
        res.status(400).send(output(0, result.message));
    }else{
        res.status(200).send(output(1, result.message));
    }
}

function updateSubCategorySchema(req:any, res:any, next:any) {
    let schema = Joi.object({
        subcategoryname: Joi.string().required(),
        id: Joi.number().required(),
        showroom_id: Joi.number().required()
    })
    const { error } = schema.validate(req.body)
    if(error){
        res.status(400).send(output(0, error.message));
    }else{
        next()
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

function deleteSubCategorySchema(req:any, res:any, next:any) {
    let schema = Joi.object({
        id: Joi.number().required(),
        showroom_id: Joi.number().required()
    })
    const { error } = schema.validate(req.body)
    if(error){
        res.status(400).send(output(0, error.message));
    }else{
        next()
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

function getSubCategorySchema(req:any, res:any, next:any) {
    let schema = Joi.object({
        id: Joi.number().required(),
        subcategoryname: Joi.string(),
        showroom_id: Joi.number().required()
    })
    const { error } = schema.validate(req.body)
    if(error){
        res.status(400).send(output(0, error.message));
    }else{
        next()
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