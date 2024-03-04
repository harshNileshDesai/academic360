import mongoose, { Schema } from "mongoose";
import { DB_MARKSHEET } from "../constants.js";
import { connectToDB } from "../db/db.js";

let connectionInstance;

const initializeUserModel = async () => {

    if (!connectionInstance) {
        connectionInstance = await connectToDB(DB_MARKSHEET);
    }
    if (!connectionInstance.models[`User`]) {
        // User Structure
        const userSchema = new Schema(
            {
                username: {
                    type: String,
                    required: true,
                },
                email: {
                    type: String,
                    required: true,
                    unique: true
                },
                password: {
                    type: String,
                    required: [true, "Password is required!"]
                },
                userType: {
                    type: String,
                    required: true
                },
                menues: {
                    type: [{ type: String }]
                }
            },
            { timestamps: true }
        );
        return connectionInstance.model('User', userSchema);
    }
    else {
        return connectionInstance.model('User');
    }

};

export default initializeUserModel;