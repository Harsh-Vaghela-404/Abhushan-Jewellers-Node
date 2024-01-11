import { db } from "./db"
import dateFormat from "dateformat";
import { return_with_data, return_without_data } from "./functions";
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
    async ShowroomSignup(email:string, contact:string, address:string, showroom_name:string, area_id:number, password:string){
        //Hashed Password to overcome the data security of users
        let return_data:any = {...return_without_data}
        
        //check user exsist

        let showroom_data = await this.getShowroomData(0, contact);
        
        if(showroom_data.error == false){
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
            area_id:area_id,
            password:hashedpassword,
            updated_on: updatedOn       
        }
        
        let user = await this.insertRecord(user_data)
        if(!user){
            return_data.message = `Something went wrong`
            return return_data; 
        }
        return_data.error = false;
        return_data.message = `Showroom created successfully`
        return return_data;
    }

    /**
     * User Login according to the given contact no and password
     */
    async ShowroomLogin(contact:string, password:string){
        let return_data:any = {...return_without_data}
        
        let showroom_data:any = await this.getShowroomData(0, contact)
        
        //check user exsist
        if(showroom_data.error == true){
            return_data.error = true;
            return_data.message = `Showroom Not Found`
            return return_data
        }
        
        //Check password is correct or not
        const isMatch = await bcrypt.compare(password, showroom_data.data[0].password)
        if(!isMatch){
            return_data.error = true;
            return_data.message = `Password is incorrect`
            return return_data
        }

        return_data.error = false;
        return_data.message = `Showroom Login Successfully`
        return_data.data = showroom_data.data
        return return_data
    }

    /**
     * Common function to get user data
     */
    async getShowroomData(id:number = 0, contact:string){
        let return_data:any = {...return_with_data}
        let showroom_data:any = []
        
        if(id){ 
            showroom_data = await this.selectRecord(id,"*");
        }else{ // give all user data
            if(contact){
                this.where += "WHERE contact = "+contact;
            }
            let showroom_data:any = await this.allRecords("*")
        }

        if(showroom_data.length == 0){
            return_data.message = `No Showroom Found`
            return return_data
        }

        return_data.error = false;
        return_data.message = `Total ${showroom_data.length} Showroom Found`
        return_data.data = showroom_data
        return return_data
    }
}