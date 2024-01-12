import express from "express"
import { dbcategory } from "../Model/dbcategory"
import { output } from "../Model/functions"
import Joi from "joi"
const router = express.Router()

router.post("/createCategory", createCategorySchema, createCategory)
router.post("/updateCategory", updateCategorySchema, updateCategory)
router.post("/deleteCategory", deleteCategory)
router.post("/getCategory", getCategorySchema, getCategory)

module.exports = router

function createCategorySchema(req:any, res:any, next:any) {
    let schema = Joi.object({
        category_name: Joi.string().required(),
        showroom_id: Joi.number().required()
    })
    const { error } = schema.validate(req.body)
    if(error){
        res.status(400).send(output(0, error.message));
    }else{
        next()
    }
}

async function createCategory(req:any, res:any) {
    let CategoryObj = new dbcategory()
    let result = await CategoryObj.addCategory(req.body.category_name, req.body.showroom_id)
    if(result.error){
        res.status(400).send(output(0, result.message));
    }else{
        res.status(200).send(output(1, result.message));
    }
}

function updateCategorySchema(req:any, res:any, next:any) {
    let schema = Joi.object({
        category_name: Joi.string().required(),
        showroom_id: Joi.number().required(),
        category_id: Joi.number().required()
    })
    const { error } = schema.validate(req.body)
    if(error){
        res.status(400).send(output(0, error.message));
    }else{
        next()
    }
}


async function updateCategory(req:any, res:any) {
    let categoryObj = new dbcategory()
    let result = await categoryObj.updateCategory(req.body.category_name, req.body.category_id, req.body.showroom_id)

    if(result.error){
        res.status(400).send(output(0, result.message));
    }else{
        res.status(200).send(output(1, result.message));
    }
}

function deleteCategorySchema(req:any, res:any, next:any) {
    let schema = Joi.object({
        category_id: Joi.string().required(),
        showroom_id: Joi.number().required()
    })
    const { error } = schema.validate(req.body)
    if(error){
        res.status(400).send(output(0, error.message));
    }else{
        next()
    }
}

async function deleteCategory(req:any, res:any) {
    let categoryObj = new dbcategory()
    let result = await categoryObj.deleteCategory(req.body.category_id, req.body.showroom_id)

    if(result.error){
        res.status(400).send(output(0, result.message));
    }else{
        res.status(200).send(output(1, result.message));
    }
}

function getCategorySchema(req:any, res:any, next:any) {
    let schema = Joi.object({
        category_name: Joi.string(),
        showroom_id: Joi.number().required(),
        category_id: Joi.number()
    })
    const { error } = schema.validate(req.body)
    if(error){
        res.status(400).send(output(0, error.message));
    }else{
        next()
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