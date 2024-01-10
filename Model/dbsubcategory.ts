import { db } from "./db";
import { return_with_data, return_without_data } from "./constant";
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

        let ShowroomObj = new dbshowroom()
        let check_user:any = await ShowroomObj.getShowroomData(showroom_id)
        if(check_user.error){
            return_data.message = 'Showroom Does Not Exist'
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

        let ShowroomObj = new dbshowroom()
        let check_user:any = await ShowroomObj.getShowroomData(showroom_id)
        if(check_user.error){
            return_data.message = 'Showroom Does Not Exist'
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

    async getSubCategory(id:number = 0, subcategoryname:string = '', showroom_id:number){
        let return_data:any = {...return_with_data}

        let ShowroomObj = new dbshowroom()
        let check_user:any = await ShowroomObj.getShowroomData(showroom_id)
        if(check_user.error){
            return_data.message = 'User Does Not Exist'
            return return_data
        }

        let result:any;

        if(id){
            result = await this.selectRecord(id,"*")
        }else if(subcategoryname){
            this.where = `WHERE subcategoryname = '${subcategoryname}'`
            if(showroom_id)
                this.where += ` AND showroom_id = ${showroom_id}`
            result = await this.allRecords("*")
        }else{
            result = await this.allRecords("*")
        }
        if(!result){
            return_data.message = 'Something Went wrong'
            return return_data
        }
        return_data.data = result
        return_data.error = false
        return return_data
    }
}