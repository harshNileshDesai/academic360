import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { marksheetRouter } from "./routes/marksheet.routes.js";
import { ApiResponse } from "./utils/ApiResponse.js"
import { userRouter } from "./routes/user.routes.js";
 
const app = express();

// app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cookieParser());


// Available routes

app.use('/api/marksheet', marksheetRouter);
app.use('/api/auth', userRouter);
app.use('/', (req, res)=> { // Default route
    return res.status(200).json(new ApiResponse(
        200,
        {
            author: "Harsh Nilesh Desai",
            version: "2.0.1",
            lastUpdated: "26/01/2024"
        },
        "academic360-backend service is live running...",
    ));
})

export default app;