import { db } from "./db";
import { upload_image_S3, randomImageName, return_with_data, return_without_data, get_image_s3, delete_image_s3 } from "./functions";
import dateFormat from "dateformat";

export class dbproducts extends db{
    constructor(){
        super();
        this.table = "product";
        this.uniqueField = "id";
    }

    async addProduct(product_name:string, product_price:string, product_weight:number, product_small_desc:string, product_large_desc:string, product_small_img:any, product_img:any, category_id:number, subcategory_id:number, showroom_id:number){
        let return_data = {...return_without_data}

        let check_product = await this.getProduct(0, category_id, subcategory_id, showroom_id, product_name, false);
        
        if(!check_product.error){
            return_data.message = 'Product Already Exist'
            return return_data
        }

        const smallImageKey = randomImageName()
        const largeImageKey = randomImageName()
        const createdOn = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
        const updatedOn = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
        
        let product = {
            product_name : product_name ,
            product_price : product_price,
            product_weight : product_weight,
            product_small_desc: product_small_desc,
            product_large_desc: product_large_desc,
            product_small_img: smallImageKey,
            product_img: largeImageKey,
            category_id : category_id,
            subcategory_id : subcategory_id,
            showroom_id : showroom_id,
            created_on : createdOn,
            updated_on : updatedOn
        };

        let result = await this.insertRecord(product);
        if(!result){
            return_data.message = 'Something Went wrong'
            return return_data
        }

        await upload_image_S3(product_img.buffer, largeImageKey)
        await upload_image_S3(product_small_img.buffer, smallImageKey)

        return_data.message = 'Product Added Successfully'
        return_data.error = false
        return return_data
    }

    async getProduct(id:number, category_id:number, subcategory_id:number, showroom_id:number, product_name:string, get_image:true | false = true){
        let return_data = {...return_with_data};

        let result:any;
        if(id){
            result = await this.selectRecord(id);
        }else{
            if(category_id || subcategory_id || showroom_id){
                this.where = "WHERE ";
            }
            if(category_id){
                this.where += "category_id = "+category_id+" AND " ;
            }
            if(subcategory_id){
                this.where += "subcategory_id = "+subcategory_id+ " AND " ;
            }
            if(product_name){
                this.where += "product_name = '"+product_name+"' AND ";
            }
            if(showroom_id){
                this.where += "showroom_id = "+showroom_id;
            }
            result = await this.allRecords("*");
        }

        if(result.length == 0){
            return_data.message = 'Something Went wrong';
            return return_data;
        }
        if(get_image){
            for(let i=0; i<result.length; i++){
                result[i].product_small_img = await get_image_s3(result[i].product_small_img);
                result[i].product_img = await get_image_s3(result[i].product_img);
            }
        }
        return_data.data = result;
        return_data.error = false;
        return_data.message = result.length+" Record Found";
        return return_data;
    }

    async deleteProduct(id:number){
        let return_data = {...return_without_data}

        let delete_data:any = await this.getProduct(id, 0, 0, 0, "", false);

        if(delete_data.error){
            return_data.message = 'Product Does Not Exist'
            return return_data
        }

        let result = await this.deleteRecord(id);
        if(!result){
            return_data.message = 'Something Went wrong'
            return return_data
        }
        await delete_image_s3(delete_data.data[0].product_small_img)
        await delete_image_s3(delete_data.data[0].product_img)
        return_data.message = 'Product Deleted Successfully'
        return return_data
    }
}