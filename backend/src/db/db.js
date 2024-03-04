import mongoose from "mongoose";
import { config } from 'dotenv';
// import { connectToDB } from "./db/db.js";

config({ path: './config.env' });

const connectToDB = async (dbName) => {
    try {
        // connectionInstance = await mongoose.connect(`${process.env.DB_URI}`);
        // console.log(`\Database Connected Successfully...!`);
        // console.log(`DB_HOST: ${connectionInstance.connection.host} || DB_PORT: ${connectionInstance.connection.port}`);
        console.log(`${process.env.DB_URI}/${dbName}`)
        return await mongoose.connect(`${process.env.DB_URI}/${dbName}`)

    } catch (error) {
        console.error("Database Connection Failed...\n", error);
        throw error;
    }
}



export { connectToDB };