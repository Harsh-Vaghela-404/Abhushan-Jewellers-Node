import { db } from "./db";
import { return_with_data, return_without_data } from "./functions";
import { dbshowroom } from "./dbshowroom";
import dateFormat from "dateformat";
export class dbsubcategory extends db{
    constructor(){
        super();
        this.table = "subcategory";
        this.uniqueField = "id";
    }

    async createSubCategory(subcategoryname: string,category_id: number,showroom_id: number){
        let return_data = {...return_without_data}

        let validate:any = await this.validate(showroom_id,showroom_id,false)
        if(validate.error){
            return_data.message = validate.message
            return return_data
        }
        
        let check_duplicate = await this.getSubCategory(0, subcategoryname, category_id, showroom_id);
        if(!check_duplicate.error){
            return_data.message = 'Subcategory Already Exist'
            return return_data
        }

        const createdOn = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
        const updatedOn = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
        
        let subcategoryData = {
            subcategoryname: subcategoryname,
            category_id: category_id,
            showroom_id: showroom_id,
            created_on: createdOn,
            updated_on: updatedOn
        }
        let result = await this.insertRecord(subcategoryData);

        if(!result){
            return_data.message = 'Something Went wrong'
            return return_data
        }
        return_data.message = 'Subcategory Created Successfully'
        return_data.error = false
        return return_data
    }

    async updateSubCategory(subcategoryname: string,id: number,showroom_id: number){
        let return_data:any = {...return_without_data};

        let validate:any = await this.validate(showroom_id,showroom_id,true)
        if(validate.error){
            return_data.message = validate.message
            return return_data
        }

        const updatedOn = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

        let subcategoryData = {
            subcategoryname: subcategoryname,
            updated_on: updatedOn
        }
        let result = await this.updateRecord(id, subcategoryData);

        if(!result){
            return_data.message = 'Something Went wrong'
            return return_data
        }
        return_data.message = 'Subcategory Updated Successfully'
        return_data.error = false
        return return_data
    }

    async deleteSubCategory(id: number,showroom_id: number){
        let return_data:any = {...return_without_data};

        let validate:any = await this.validate(showroom_id,showroom_id,true)
        if(validate.error){
            return_data.message = validate.message
            return return_data
        }

        let result:any = await this.deleteRecord(id);
        if(!result){
            return_data.message = 'Something Went wrong'
            return return_data
        }
        return_data.message = 'Subcategory Deleted Successfully'
        return_data.error = false
        return return_data
    
    }

    async getSubCategory(id:number = 0, subcategoryname:string = '', category_id:number = 0, showroom_id:number = 0){
        let return_data:any = {...return_with_data}

        let validate:any = await this.validate(showroom_id,showroom_id,true)
        if(validate.error){
            return_data.message = validate.message
            return return_data
        }

        let result:any;

        if(id){
            result = await this.selectRecord(id,"*")
        }else{
            
            if(subcategoryname || showroom_id || category_id) this.where = "WHERE "

            if(subcategoryname) this.where = `subcategoryname = '${subcategoryname}'`
            if(showroom_id) this.where += ` AND showroom_id = ${showroom_id}`
            if(category_id) this.where += ` AND category_id = ${category_id}`

            result = await this.allRecords("*");
        }
        if(!result.length){
            return_data.message = 'Something Went wrong'
            return return_data
        }
        return_data.data = result
        return_data.error = false
        return return_data
    }

    async validate(showroom_id:number, subcategory_id:number, auth_valid:true | false= false){
        let return_data:any = {...return_without_data}
        
        if((showroom_id == 0 && !auth_valid) || (( showroom_id == 0 || subcategory_id == 0) && auth_valid)){
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
            this.where = " WHERE showroom_id = "+ showroom_id +" and id = "+ subcategory_id +""
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