import { db } from "./db";
import { return_with_data, return_without_data } from "./constant";
import dateFormat from "dateformat";

export class dbarea extends db{
    constructor(){
        super();
        this.table = "area";
        this.uniqueField = "id";
    }
    
    async createAreas(area:string){
        let return_data = {...return_without_data}
        const createdOn = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
        const updatedOn = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");

        let check_exsist = await this.getArea(0,area);
        
        if(!check_exsist.error){
            return_data.message = "Area already exsist";
            return return_data;
        }

        let areaData = {
            "areaname": area,
            "created_on": createdOn,
            "updated_on": updatedOn
        }

        let result = await this.insertRecord(areaData);
        if(!result){
            return_data.message = "Something went wrong";
            return return_data;
        }
        return_data.error = false;
        return_data.message = "Area created successfully";
        return return_data;
    }

    async updateArea(area:string, id:number){
        let return_data = {...return_without_data}
        const updatedOn = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
        let areaData = {
            "area": area,
            "updated_on": updatedOn
        }
        let result = await this.updateRecord(id, areaData);
        if(!result){
            return_data.message = "Something went wrong";
            return return_data;
        }
        return_data.error = false;
        return_data.message = "Area updated successfully";
        return return_data;
    
    }

    async deleteArea(id:number){
        let return_data = {...return_without_data}
        
        let result = await this.deleteRecord(id);
        if(!result){
            return_data.message = "Something went wrong";
            return return_data;
        }
        return_data.error = false;
        return_data.message = "Area deleted successfully";
        return return_data;
    }

    async getArea(id:number = 0, area:string = ''){
        let return_data = {...return_with_data}
        let result:any = false
        if(area){
            this.where = "WHERE areaname = '"+ area +"'"
            result = await this.allRecords("*")
        }else if(id){
            result = await this.selectRecord(id,"*")
        }else{
            result = await this.allRecords("*")
        }
        if(result.length == 0){
            return_data.message = "Something went wrong";
            return return_data;
        }
        return_data.error = false;
        return_data.message = "Area fetched successfully";
        return_data.data = result;
        return return_data;
    }
    
}