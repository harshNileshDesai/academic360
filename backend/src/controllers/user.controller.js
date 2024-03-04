import { validationResult } from "express-validator";
import initializeUserModel from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET;

export const createUser = async (req, res) => {
    try {
        const { username, email, password, userType, menues } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(new ApiResponse(400, { errors: errors.array() }, "PLEASE PROVIDE THE VALID CREDENTIALS...!"));
        }


        const User = await initializeUserModel();
        const existUser = await User.findOne({ email });
        // Return if the user already exist
        if (existUser) {
            return res.status(406).json(new ApiResponse(406, req.body, "USER ALREADY CREATED...!"));
        }

        // Decode the given raw password
        const salt = await bcrypt.genSalt(10);
        let secPass = await bcrypt.hash(password, salt);

        // Create the user
        const createdUser = await User.create({
            username, email, password: secPass, userType, menues
        });

        return res.status(201).json(new ApiResponse(201, createdUser, "USER CREATED...!"));

    } catch (error) {
        console.log(error)
    }
}

export const getLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(new ApiResponse(400, { errors: errors.array() }, "PLEASE PROVIDE THE VALID CREDENTIALS...!"));
        }

        const User = await initializeUserModel();
        const user = await User.findOne({ email });
        // Return if the user already exist
        if (!user) {
            return res.status(406).json(new ApiResponse(406, req.body, "USER ALREADY CREATED...!"));
        }

        // Compare the password
        console.log(JWT_SECRET, user)
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(401).json(new ApiResponse(401, req.body, "PLEASE TRY TO LOGIN WITH CORRECT CREDENTIALS...!"));
        }

        const data = { user };

        const accessToken = jwt.sign(data, JWT_SECRET);

        return res.status(201).json(new ApiResponse(201, accessToken, "LOGGED IN SUCCESS...!"));

    } catch (error) {
        console.log(error)
    }
}

export const getAllUsers = async (req, res) => {
    try {

        const User = await initializeUserModel();
        const users = await User.find();

        return res.status(201).json(new ApiResponse(201, users, "ALL USERS...!"));

    } catch (error) {
        console.log(error)
    }
}

export const updateUser = async (req, res) => {
    try {
        const { user } = req.body;

        const User = await initializeUserModel();
        const updatedUser = await User.findByIdAndUpdate(user._id, user);
        // Return if the user already exist
        if (!user) {
            return res.status(400).json(new ApiResponse(406, req.body, "USER NOT UPDATED...!"));
        }

        return res.status(201).json(new ApiResponse(201, updatedUser, "USER UPDATED SUCCESSFULLY...!"));

    } catch (error) {
        console.log(error)
    }
}

export const deleteUser = async (req, res) => {
    try {
        const userId = req.query?.userId;

        const User = await initializeUserModel();
        const user = await User.findOne({ _id: userId });
        // Return if the user already exist
        if (!user) {
            return res.status(400).json(new ApiResponse(406, req.body, "USER NOT DELETED...!"));
        }

        return res.status(201).json(new ApiResponse(201, user, "USER DELETED SUCCESSFULLY...!"));

    } catch (error) {
        console.log(error)
    }
}