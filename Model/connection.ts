import { Client } from "pg";

const client = new Client({
    host:process.env.PGHOST,
    password:process.env.PGPASSWORD,
    user:process.env.PGUSER,
    database:process.env.PGDATABASE,
    port:5432
})


export async function connectDB() {
    try{
        await client.connect()
        console.log("Database Connected");
    }catch(err){
        console.log(err)
    }
}

export async function query(query:string) {
    try{
        let result = await client.query(query)
        return result.rows;
    }catch(err){
        console.log(err);
    }
}