import jwt from 'jsonwebtoken';
import { ApiResponse } from '../utils/ApiResponse.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateUser = async (req, res, next) => {
    // Get the user from the jwt_token and add id to req object
    const accessToken = req.header('Authorization');
    // console.log(accessToken)
    // console.log(process.env.JWT_SECRET)
    if(!accessToken) {
        return res.status(401).json(new ApiResponse(401, null, "PLEASE TRY TO LOGIN AGAIN...!"));
    }

    try {
        const data = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.user = data.user;
        next();

    } catch (error) {
        console.log(error)
    }
}