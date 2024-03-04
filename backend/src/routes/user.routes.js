import express from "express";
import { body } from 'express-validator';
import { authenticateUser } from "../middlewares/authenticateUser.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createUser, deleteUser, getAllUsers, getLogin, updateUser } from "../controllers/user.controller.js";

const router = express.Router();

// ROUTE 1: Create an user | Method: 'POST' | Login not required | URL: '/api/auth/v2/create'
router.post('/v2/create', [
    body('username', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be of atleast 3 characters!').isLength({ min: 3 }),
    body('userType', 'Enter the userType!').exists(),
    body('menues', 'Enter the menues!').exists()
], asyncHandler(createUser));

// ROUTE 2: Get all user | Method: 'GET' | Login required | URL: '/api/auth/v1/find-all'
router.get('/v1/find-all', authenticateUser, asyncHandler(getAllUsers));

// ROUTE 3: Login an user | Method: 'POST' | Login not required | URL: '/api/auth/v1/login'
router.post('/v1/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be of atleast 3 characters!').isLength({ min: 3 })
], asyncHandler(getLogin));

// ROUTE 4: Update an user | Method: 'PUT' | Login required | URL: '/api/auth/v2/update/:userID'
router.put('/v2/update/:userId', [], authenticateUser, asyncHandler(updateUser));

// ROUTE 5: Delete an user | Method: 'PUT' | Login required | URL: '/api/auth/v1/delete/:userID'
router.delete('/v1/delete/:userId', [], authenticateUser, asyncHandler(deleteUser));

export { router as userRouter };