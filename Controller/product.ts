import express from "express"
import { output } from "../Model/functions";
import { dbproducts } from "../Model/dbproduct";
import { upload } from "../Model/functions";
import Joi from "joi";
const router = express.Router()
module.exports = router;

router.post("/addProduct", addProductSchema, upload.fields([{ name: 'product_small_img', maxCount: 1 },{ name: 'product_img', maxCount: 1 }]), addProduct);
router.post("/getProduct", getProductSchema, getProduct);
router.post("/deleteProduct", deleteProductSchema, deleteProduct);

function addProductSchema(req:any, res:any, next:any) {
    let schema = Joi.object({
        product_name: Joi.string().required(),
        product_price: Joi.number().required(),
        product_weight: Joi.number().required(),
        product_small_desc: Joi.string().required(),
        product_large_desc: Joi.string().required(),
        category_id: Joi.number().required(),
        subcategory_id: Joi.number().required(),
        showroom_id: Joi.number().required()
    })
    const { error } = schema.validate(req.body)
    if(error){
        res.status(400).send(output(0, error.details[0].message));
    }else{
        next();
    }
}

async function addProduct(req: any, res:any){
    const productObj = new dbproducts()
    const product_small_img = req.files['product_small_img'][0];
    const product_img = req.files['product_img'][0];
    req.body = JSON.parse(req.body.body);

    let result:any = await productObj.addProduct(req.body.product_name, req.body.product_price, req.body.product_weight, req.body.product_small_desc, req.body.product_large_desc, product_small_img, product_img, req.body.category_id, req.body.subcategory_id, req.body.showroom_id)
    if(result.error){
        res.status(400).send(output(0, result.message));
    }else{
        res.status(200).send(output(1, result.message));
    }
}

function getProductSchema(req:any, res:any, next:any) {
    let schema = Joi.object({
        id: Joi.number(),
        category_id: Joi.number(),
        subcategory_id: Joi.number(),
        showroom_id: Joi.number().required(),
        product_name: Joi.string()
    })
    const { error } = schema.validate(req.body)
    if(error){
        res.status(400).send(output(0, error.message));
    }else{
        next();
    }
}

async function getProduct(req:any,res:any) {
    const productObj = new dbproducts()
    let result:any = await productObj.getProduct(req.body.id, req.body.category_id, req.body.subcategory_id, req.body.showroom_id, req.body.product_name, true);
    if(result.error){
        res.status(400).send(output(0, result.message));
    }else{
        res.status(200).send(output(1, result.message, result.data));
    }
}

function deleteProductSchema(req:any, res:any, next:any) {
    let schema = Joi.object({
        id: Joi.number().required(),
        showroom_id: Joi.number().required()
    })
    const { error } = schema.validate(req.body)
    if(error){
        res.status(400).send(output(0, error.message));
    }else{
        next();
    }
}

async function deleteProduct(req:any, res:any) {
    const productObj = new dbproducts()
    let result:any = await productObj.deleteProduct(req.body.id, req.body.showroom_id)
    if(result.error){
        res.status(400).send(output(0, result.message));
    }else{
        res.status(200).send(output(1, result.message));
    }
}