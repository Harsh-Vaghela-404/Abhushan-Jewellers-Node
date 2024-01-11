import dateFormat from "dateformat";
import { return_with_data, return_without_data } from "./functions";
import { dbshowroom } from "../Model/dbshowroom";
import { db } from "./db";

export class dbcategory extends db{
    constructor(){
        super();
        this.table="category";
        this.uniqueField = "id";
    }

    async addCategory(category_name:string, showroom_id:number){
        let return_data:any = {...return_without_data};
        
        let validate:any = await this.validate(showroom_id, 0, false);
        if(validate.error){
            return_data.message = validate.message
            return return_data
        }

        let check_category:any = await this.getCategory(0,category_name, showroom_id)
        
        if(!check_category.error){
            return_data.message = 'Category Already Exist'
            return return_data
        }
        
        const createdOn = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
        const updatedOn = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
        
        let result = await this.insertRecord({categoryname:category_name, showroom_id:showroom_id, created_on:createdOn, updated_on: updatedOn});
        if(!result){    
            return_data.message = 'Something Went wrong'
            return return_data
        }

        return_data.message = 'Category Added Successfully'
        return_data.error = false
        return return_data
    }

    async updateCategory(category_name:string, id:number, showroom_id:number){
        let return_data:any = {...return_without_data};

        let validate:any = await this.validate(showroom_id,id,true);
        if(validate.error){
            return_data.message = validate.message
            return return_data
        }

        const updatedOn = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

        let result = await this.updateRecord(id,{categoryname:category_name, updated_on:updatedOn});
        if(!result){
            return_data.message = 'Something Went wrong'
            return return_data
        }

        return_data.message = 'Category Updated Successfully'
        return_data.error = false
        return return_data
    }

    async deleteCategory(id:number, showroom_id:number){
        let return_data:any = {...return_without_data};

        let validate:any = await this.validate(showroom_id,id,true);
        if(validate.error){
            return_data.message = validate.message
            return return_data
        }

        let result:any = await this.deleteRecord(id);
        if(!result){
            return_data.message = 'Something Went wrong'
            return return_data
        }

        return_data.message = 'Category Deleted Successfully'
        return_data.error = false
        return return_data

    }

    async getCategory(id:number = 0, category_name:string = '', showroom_id:number){
        let return_data:any = {...return_with_data}
        
        let validate:any = await this.validate(showroom_id,id,true);
        if(validate.error){
            return_data.message = validate.message
            return validate
        }

        let result:any = []
        if(id){
            result = await this.selectRecord(id,"*")
        }else{
            if(category_name){
                this.where = " WHERE categoryname = '"+ category_name +"'";
            }
            if(showroom_id){
                this.where += " AND showroom_id = "+ showroom_id;
            }
            result = await this.allRecords("*")
        }
        if(result.length == 0){
            return_data.message = 'Something went wrong';
            return return_data
        }

        return_data.error = false;
        return_data.message = result.length+" Category found";
        return_data.data = result;
        return return_data;
    }

    async validate(showroom_id:number, category_id:number, auth_valid:true | false= false){
        let return_data:any = {...return_without_data}
        
        if((showroom_id == 0 && !auth_valid) || (( showroom_id == 0 || category_id == 0) && auth_valid)){
            return_data.message = 'Invalid Data'
            return return_data
        }

        let showroomObj = new dbshowroom();
        let check_user:any = await showroomObj.getShowroomData(showroom_id,"")

        if(check_user.error){
            return_data.message = 'Showroom Does Not Exist'
            return return_data
        }

        if(auth_valid){
            this.where = " WHERE showroom_id = "+ showroom_id +" and id = "+ category_id +""
            let result = await this.allRecords("*");
            if(result.length == 0){
                return_data.message = 'UnAuthorized Access'
                return return_data
            }
        }

        return_data.error = false
        return_data.message = 'Authorized Access'
        return return_data
    }
}