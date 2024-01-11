import express from "express"
import { output } from "../Model/functions";
import { dbproducts } from "../Model/dbproduct";
import { upload, upload_image_S3 } from "../Model/functions";
const router = express.Router()
module.exports = router;

router.post("/addProduct", upload.fields([{ name: 'product_small_img', maxCount: 1 },{ name: 'product_img', maxCount: 1 }]), addProduct);
router.post("/getProduct", getProduct);
router.post("/deleteProduct", deleteProduct);

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

async function getProduct(req:any,res:any) {
    const productObj = new dbproducts()
    let result:any = await productObj.getProduct(req.body.id, req.body.category_id, req.body.subcategory_id, req.body.showroom_id, req.body.product_name, true);
    if(result.error){
        res.status(400).send(output(0, result.message));
    }else{
        res.status(200).send(output(1, result.message, result.data));
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