import express from "express";
import { authenticateUser } from "../middlewares/authenticateUser.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { 
    createMarksheet, createMarksheetByFile, deleteByIdAndYear, filterStudentMarksheets, getDocumentsBySearch, getMarksheetByRollNoAndYear, getMarksheetStats, getMarksheetStatsCourseSemester, getMarksheetTotal, getPassingPercentage, updateMarksheet 
} from "../controllers/marksheet.controller.js";
import { upload } from "../middlewares/uploadFile.middleware.js";
import { body } from "express-validator"
const router = express.Router();

// TODO
// ROUTE 1: Create a marksheet | Method: 'POST' | Login required | URL: '/api/marksheet/add'
router.post('/add', authenticateUser, asyncHandler(createMarksheet));

// ROUTE 2: Add marksheets by file | Method: 'POST' | Login required | URL: '/api/marksheet/add-file'
router.post('/add-file', authenticateUser, upload.single('file'), asyncHandler(createMarksheetByFile));

// ROUTE 3: Get all the documents by search | Method: 'GET' | Login required | URL: '/api/marksheet/v2/get-documents/?search=search'
router.get('/v2/get-documents', authenticateUser, asyncHandler(getDocumentsBySearch));

// ROUTE 4: Get the marksheets stats by year | Method: 'GET' | Login required | URL: '/api/marksheet/v1/get-stats-by-year
router.get('/v1/get-stats-by-year', authenticateUser, asyncHandler(getMarksheetStats));

// ROUTE 5: Get all the marksheets total | Method: 'GET' | Login required | URL: '/api/marksheet/v2/get-total
router.get('/v2/get-total', authenticateUser, asyncHandler(getMarksheetTotal));

// ROUTE 6: Get the % passing stats | Method: 'GET' | Login required | URL: '/api/marksheet/get-passing
router.get('/v1/get-passing', authenticateUser, asyncHandler(getPassingPercentage));

// ROUTE 7: Get the marksheet by roll_no and year | Method: 'GET' | Login required | URL: '/api/marksheet/get-marksheet
router.get('/get-marksheet', authenticateUser, asyncHandler(getMarksheetByRollNoAndYear));

// TODO
// ROUTE 8: UPDATE the marksheet by id and year | Method: 'PUT' | Login required | URL: '/api/marksheet/update
router.put('/update', authenticateUser, asyncHandler(updateMarksheet));

// ROUTE 9: DELETE the marksheet by id and year | Method: 'DELETE' | Login required | URL: '/api/marksheet/delete
router.delete('/delete', authenticateUser, asyncHandler(deleteByIdAndYear));

// ROUTE 10: DELETE the marksheet by stream and year | Method: 'DELETE' | Login required | URL: '/api/marksheet/delete-by-stream-year
router.delete('/delete-by-stream-year', authenticateUser, asyncHandler(deleteByIdAndYear));

// ROUTE 11: Fiter the marksheet by stream, course, year and semester | Method: 'POST' | Login required | URL: '/api/marksheet/v2/filter
router.post('/v2/filter', [
    body("stream", "Enter the stream").exists(),
    body("course", "Enter the course").exists(),
    body("year", "Enter the year").exists(),
    body("semester", "Enter the semester").exists(),
    body("page", "Enter the page").exists(),
], authenticateUser, asyncHandler(filterStudentMarksheets));

// ROUTE 12: Get the marksheets stats by course | Method: 'GET' | Login required | URL: '/api/marksheet/v1/get-stats-by-course?course=
router.get('/v1/get-stats-by-course', authenticateUser, asyncHandler(getMarksheetStatsCourseSemester));



export { router as marksheetRouter }  