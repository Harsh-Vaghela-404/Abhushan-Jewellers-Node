import dateFormat from "dateformat";
import { return_with_data, return_without_data } from "../Model/constant";
// import { dbUser } from "../Model/dbuser";
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

        let ShowroomObj = new dbshowroom()
        
        let check_user:any = await ShowroomObj.getShowroomData(showroom_id)

        if(check_user.error){
            return_data.message = 'User Does Not Exist'
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

        let ShowroomObj = new dbshowroom()
        let check_user:any = await ShowroomObj.getShowroomData(showroom_id)
        if(check_user.error){
            return_data.message = 'User Does Not Exist'
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

        let ShowroomObj = new dbshowroom()
        let check_user:any = await ShowroomObj.getShowroomData(showroom_id)
        if(check_user.error){
            return_data.message = 'User Does Not Exist'
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
        let return_data1:any = {...return_with_data}

        let ShowroomObj = new dbshowroom()
        let check_user:any = await ShowroomObj.getShowroomData(showroom_id)
        if(check_user.error){
            return_data1.message = 'User Does Not Exist'
            return return_data1
        }

        if(id){
            let result:any = await this.selectRecord(id,"*")
            
            if(result.length == 0){
                return_data1.message = 'Category Not Found'
                return return_data1
            }

            return_data1.data = result[0]
            return_data1.error = false
            return_data1.message = 'Category Found'
        }else{
            if(category_name && showroom_id){
                this.where = " WHERE categoryname = '"+ category_name +"' and showroom_id = "+ showroom_id +""
            }else if(showroom_id){
                this.where = " WHERE showroom_id = "+ showroom_id +""
            }

            let result:any = await this.allRecords("*")
            
            if(result.length == 0){
                return_data1.data = []
                return_data1.message = 'Category Not Found'
                return return_data1
            }

            return_data1.data = result
            return_data1.error = false
            return_data1.message = 'Categories Found'
            return return_data1;
        
        }
    }
}