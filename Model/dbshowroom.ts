import { db } from "./db"
import dateFormat from "dateformat";
import { return_with_data, return_without_data } from "./constant";
import bcrypt from "bcrypt";
export class dbshowroom extends db{
    constructor() {
        super();
        this.table = 'showroom';
        this.uniqueField = 'id';
    }

    /**
     * User Sign up According to the given role
     */
    async ShowroomSignup(email:string, contact:number, address:string, role_id:string, showroom_name:string, areaid_id:number, password:string){
        //Hashed Password to overcome the data security of users
        let return_data:any = {...return_without_data}
        
        //check user exsist

        let check_user = await this.getShowroomData(0, {contact:contact})
        
        if(check_user.error == false){
            return_data.error = true;
            return_data.message = `Showroom already exist try with different mobile`
            return return_data
        }

        const hashedpassword = await bcrypt.hash(password, 10)

        const createdOn = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
        const updatedOn = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
        let user_data = {
            email:email,
            contact:contact,
            address:address,
            showroom_name:showroom_name,
            created_on:createdOn,
            areaid_id:areaid_id,
            password:hashedpassword,
            updated_on: updatedOn       
        }
        try{
            let user = await this.insertRecord(user_data)
            if(user){
                return_data.error = false;
                return_data.message = `Showroom created successfully`
                return return_data
            }
        }catch(e){
            return_data.message = `Something went wrong`
            return_data.error = true;
            return return_data; 
        }
    }

    /**
     * User Login according to the given contact no and password
     */
    async ShowroomLogin(contact:string, password:string){
        let return_data:any = {...return_without_data}
        let user_data:any = await this.getShowroomData(0, {contact:contact})
        //check user exsist
        if(user_data.error == true){
            return_data.error = true;
            return_data.message = `Showroom Not Found`
            return return_data
        }
        
        //Check password is correct or not
        const isMatch = await bcrypt.compare(password, user_data.data[0].password)
        if(!isMatch){
            return_data.error = true;
            return_data.message = `Password is incorrect`
            return return_data
        }

        return_data.error = false;
        return_data.message = `Showroom Login Successfully`
        return_data.data = user_data.data
        return return_data
    }

    /**
     * Common function to get user data
     */
    async getShowroomData(id:number = 0, where:any = {}){
        let return_data:any = {...return_with_data}
        if(id){ 
            let user_data:any = await this.selectRecord(id,"*")
            
            if(user_data.length == 0){
                return_data.error = true;
                return_data.message = `Showroom Not Found`
                // return_data.data = user_data[0]
                return return_data
            }

            return_data.error = false;
            return_data.message = `Showroom Found`
            return_data.data = user_data[0]
            return return_data
        }else{ // give all user data

            if(where){ // find user according to the condition
                this.where = `WHERE ${Object.entries(where).map(([key, value]) => `${key} = '${value}'`).join(' AND ')};`
            }

            let user_data:any = await this.allRecords("*")
            
            if(user_data.length == 0){
                return_data.error = true;
                return_data.message = `No Showroom Found`
                return return_data
            }

            return_data.error = false;
            return_data.message = `Total ${user_data.length} Showroom Found`
            return_data.data = user_data
            return return_data
        }
    }
}