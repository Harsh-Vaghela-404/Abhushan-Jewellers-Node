import { db } from "./db"
import dateFormat from "dateformat";
import { return_with_data, return_without_data } from "./functions";
import bcrypt from "bcrypt";
export class dbUser extends db{
    constructor() {
        super();
        this.table = 'users';
        this.uniqueField = 'id';
    }

    /**
     * User Sign up According to the given role
     */
    async Signup(first_name:string, last_name:string, second_name:string, contact:number, address:string, role_id:string, password:string){
        //Hashed Password to overcome the data security of users
        let return_data:any = {...return_without_data}
        
        //check user exsist

        let check_user = await this.getUser(0, {contact:contact})
        
        if(check_user.error == false){
            return_data.error = true;
            return_data.message = `User already exist try with different mobile`
            return return_data
        }

        const hashedpassword = await bcrypt.hash(password, 10)

        const createdOn = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
        const updatedOn = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
        let user_data = {
            first_name:first_name,
            last_name:last_name,
            second_name:second_name,
            contact:contact,
            address:address,
            created_on:createdOn,
            password:hashedpassword,
            updated_on: updatedOn       
        }
        try{
            let user = await this.insertRecord(user_data)
            if(user){
                return_data.error = false;
                return_data.message = `User created successfully`
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
    async Login(contact:string, password:string){
        let return_data:any = {...return_without_data}
        let user_data:any = await this.getUser(0, {contact:contact})
        //check user exsist
        if(user_data.error == true){
            return_data.error = true;
            return_data.message = `User Not Found`
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
        return_data.message = `User Login Successfully`
        return_data.data = user_data.data
        return return_data
    }

    /**
     * Common function to get user data
     */
    async getUser(id:number = 0, where:any = {}){
        let return_data:any = {...return_with_data}
        if(id){ 
            let user_data:any = await this.selectRecord(id,"*")
            
            if(user_data.length == 0){
                return_data.error = true;
                return_data.message = `User Not Found`
                // return_data.data = user_data[0]
                return return_data
            }

            return_data.error = false;
            return_data.message = `User Found`
            return_data.data = user_data[0]
            return return_data
        }else{ // give all user data

            if(where){ // find user according to the condition
                this.where = `WHERE ${Object.entries(where).map(([key, value]) => `${key} = '${value}'`).join(' AND ')};`
            }

            let user_data:any = await this.allRecords("*")
            
            if(user_data.length == 0){
                return_data.error = true;
                return_data.message = `No User Found`
                return return_data
            }

            return_data.error = false;
            return_data.message = `Total ${user_data.length} User Found`
            return_data.data = user_data
            return return_data
        }
    }
}