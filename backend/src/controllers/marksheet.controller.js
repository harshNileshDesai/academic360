import { handleMarksheet } from "../actions/handleMarksheet.js";
import initializeMarksheetModel from ".././models/marksheet.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { readExcelFile } from "../utils/readExcelFile.js";
import path from "path";
import fs from "fs";
import { fetchDocuments } from "../actions/fetchDocuments.js";
import { filterByYear } from "../actions/filterByYear.js";
import { getPassingCountByStreamAndYear } from "../actions/getPassingCountByStreamAndYear.js";
import { handleAnotherAttemptData } from "../actions/handleAnotherAttemptData.js";
import { handleFirstAttemptData } from "../actions/handleFirstAttemptData.js";
import { getStatisticsByYear } from "../actions/getStatisticsByYear.js";
import { getStatisticsByYearAndCourseAndSemester } from "../actions/getStatisticsByYearAndCourseAndSemester.js";
import { count } from "console";
import { commonProcessing } from "../actions/commonProcessing.js";
import { createMarksheetObj } from "../actions/createMarksheetObj.js";
import { processMarksheet } from "../actions/processMarksheet.js";


// TODO
// CREATE THE MARKSHEET 
export const createMarksheet = async (req, res) => {
    try {
        let { marksheet } = req.body;
        let year;
        if (marksheet.stream.toUpperCase() === 'BCOM') {
            year = Number(marksheet._id.substring(5, 9));
        }
        else {
            year = Number(marksheet._id.substring(0, 4));
        }

        const MarksheetModel = await initializeMarksheetModel(year);

        if (await MarksheetModel.findOne({ _id: marksheet._id })) {
            return res.status(406).json(new ApiResponse(406, marksheet, "MARKSHEET DATA ALREADY EXIST...!"));
        }

        marksheet = await handleMarksheet(marksheet, MarksheetModel);

        const savedMarksheet = marksheet.save();

        return res.status(201).json(new ApiResponse(201, savedMarksheet, "MARKSHEET CREATED SUCCESSFULLY...!"));


    } catch (error) {
        console.error("Error in creating marksheet: -\n", error);
    }
}

// CREATE THE MARKSHEET - PERFORM THE INSERT MANY (failed data passes on)
export const createMarksheetByFile = async (req, res) => {
    console.log(req.file)
    try {
        const filePath = path.join(process.cwd(), `./public/temp/${req.file.originalname}`)
        console.log("reading file...");
        const excelData = readExcelFile(filePath);
        console.log(excelData.length)
        const streamArr = ["BA", "BSC", "BCOM", "BBA", "M.A", "M.COM"];
        console.log("going to loop...")

        for (let s = 0; s < streamArr.length; s++) {
            // Filter data by stream: streamArr[s]
            let streamData = excelData.filter(ele => ele.stream.toUpperCase() === streamArr[s]);
            // Loop over the years
            for (let y = 2017; y <= (new Date()).getFullYear(); y++) {
                let MarksheetModel = await initializeMarksheetModel(y);

                // Filter data by year: y
                let yearData = filterByYear(streamData, y, streamArr[s]);
                console.log(`Year = ${y}, Stream = ${streamArr[s]}, Total rows = ${yearData.length}`);
                // Iterrate over the yearData
                let doneArr = new Set();
                let formattedArr = [];
                for (let i = 0; i < yearData.length; i++) {
                    let marksheet = yearData[i];
                    // Skip the iteration if already process the marksheet
                    let tmpYear2 = marksheet.stream.toUpperCase() === 'BCOM' ? marksheet.year2 : -1;
                    let _id = `${y}/${tmpYear2}/${marksheet.stream.toUpperCase()}/${marksheet.semester}/${marksheet.roll_no}`;
                    if (doneArr.has(_id)) { continue; }

                    // Process the operation for rollNo = marksheet.roll_no
                    // 1. Fetch all the data for the year = y from the yearData[]
                    let dataArr = yearData.filter(ele => ele.roll_no === marksheet.roll_no);
                    // 2. Handle the dataArr[]
                    // ({formattedArr, doneArr} = await commonProcessing(dataArr, MarksheetModel, formattedArr, doneArr, y, streamArr[s]));




                    for (let sem = 1; sem <= 6; sem++) {
                        let tmpYear2 = streamArr[s].toUpperCase() === "BCOM" ? dataArr[0].year2 : -1;
                        let _id = `${dataArr[0].year1}/${tmpYear2}/${streamArr[s].toUpperCase()}/${sem}/${dataArr[0].roll_no}`;
                        // Get the all the subjects for the semester: sem 
                        let mksArr = dataArr.filter((ele) => (ele.semester == sem));
                        if (mksArr.length > 0) {
                            // Format (or create) the marksheet object
                            let marksheetObj = new MarksheetModel();
                            marksheetObj = createMarksheetObj(mksArr, _id);
                            if (marksheetObj.subjects[0].year1 > 2023) {
                                marksheetObj = await handleMarksheet(marksheetObj, MarksheetModel);
                            }

                            // Skip for duplicate data
                            if (formattedArr.find(ele => ele._id === marksheetObj._id)) { continue; }

                            // Add the marksheetObj to the arr[]
                            formattedArr.push(marksheetObj)

                            // Mark the marksheet data as done
                            doneArr.add(_id);

                        }
                    }




                }

                console.log(formattedArr?.length);
                if (!formattedArr) { continue; }
                // Save it in the database
                try {
                    const result = await MarksheetModel.insertMany(formattedArr, { ordered: false });
                    console.log(`${y} | ${streamArr[s]} | Inserted: ${result.length} `)
                    // Handle success 
                } catch (error) {

                    console.error("Error inserting data:", error);
                    break;
                }


            }
        }

        // Delete the file
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            } else {
                console.log('File deleted successfully');
            }
        });

        return res.status(201).json(new ApiResponse(201, "savedMarksheet", "MARKSHEET UPLOADED SUCCESSFULLY...!"));

    } catch (error) {
        console.error("Error in creating marksheet: -\n", error);
    }

}



// export const createMarksheetByFile = async (req, res) => {
//     console.log(req.file)
//     try {
//         const filePath = path.join(process.cwd(), `./public/temp/${req.file.originalname}`)
//         console.log("reading file...");
//         const excelData = readExcelFile(filePath);

//         const streamArr = ["BA", "BSC", "BCOM", "M.A", "M.COM"];

//         console.log("Going to loop...");
//         for (let s = 0; s < streamArr.length; s++) {
//             console.log("stream: ", streamArr[s]);
//             // Process iteration for stream = streamArr[s]
//             let dataByStream = excelData.filter(ele => ele.stream.toUpperCase() === streamArr[s]);

//             for (let y = 2017; y <= (new Date()).getFullYear(); y++) {
//                 console.log("year running:", y);
//                 let formattedArr = [];
//                 let  MarksheetModel = await initializeMarksheetModel(y);
//                 // Process iteration for year as y
//                 let databyYear = [];
//                 if (streamArr[s] === "BCOM") { // For BCOM
//                     databyYear = dataByStream.filter(ele => ele.year2 == y);
//                 }
//                 else { // For BA, BSC, M.A, M.COM
//                     databyYear = dataByStream.filter(ele => ele.year1 == y);
//                 }

//                 const doneArr = new Set();
//                 for (let i = 0; i < databyYear.length; i++) {
//                     // Skip if already processed
//                     let tmpYear = streamArr[s] === 'BCOM' ? databyYear[i].year2 : -1;
//                     let ele = `${databyYear[i].year1}/${tmpYear}/${streamArr[s]}/${databyYear[i].semester}/${databyYear[i].roll_no}`;
//                     if (doneArr.has(ele)) { continue; }
//                     doneArr.add(ele);


//                     let marksheetObj = new MarksheetModel();
//                     // Process the data by roll_no
//                     let excelObjArr = filterData(databyYear, databyYear[i]);
//                     marksheetObj = createMarksheetObj(excelObjArr);
//                     if (marksheetObj.subjects[0].year1 > 2023) { // For new data
//                         marksheetObj = await handleMarksheet(marksheetObj, MarksheetModel);
//                     }
//                     // console.log(marksheetObj)
//                     formattedArr.push(marksheetObj);
//                     // Do insert the data

//                 } 
//                 try {
//                     const result = await MarksheetModel.insertMany(formattedArr);
//                     console.log(`${y} | ${streamArr[s]} | Inserted: ${result.length} `)
//                     // Handle success
//                 } catch (error) {
//                     console.error("Error inserting data:", error);

//                 }
//                 formattedArr.length = 0; // Clear the array for the next iteration
//             }
//         }

//         // TODO: Handle Failed marksheets
//         // for(let y = 2018; y <= (new Date()).getFullYear(); y++) {
//         //     let  MarksheetModel = await initializeMarksheetModel(y);
//         //     let failedMarksheets = await MarksheetModel.find({
//         //         'subjects': {
//         //             $elemMatch: {
//         //                 'year1': { $ne: 'year2' },
//         //             }
//         //         }
//         //     });

//         //     // Process all marksheets
//         //     for(let i = 0; i <= (new Date()).getFullYear(); i++) {
//         //         rectifyFailedMarksheet(failedMarksheets[i]);
//         //     }

//         // }

//         // Delete the file
//         fs.unlink(filePath, (err) => {
//             if (err) {
//                 console.error('Error deleting file:', err);
//             } else {
//                 console.log('File deleted successfully');
//             }
//         });

//         return res.status(201).json(new ApiResponse(201, "savedMarksheet", "MARKSHEET UPLOADED SUCCESSFULLY...!"));

//     } catch (error) {
//         console.error("Error in creating marksheet: -\n", error);
//     }

// }











// TODO: UPDATE THE GIVEN MARKSHEET
export const updateMarksheet = async (req, res) => {
    try {

    } catch (error) {
        console.error("Error in creating marksheet: -\n", error);
    }
}

// GET ALL THE DOCUMENTS BY THE GIVEN SEARCH PARAMETER
export const getDocumentsBySearch = async (req, res) => {
    try {
        // Get the search parameter from the request
        const searchParam = req.query?.search;

        // Search the marksheet
        let marksheet;
        let dbData = [];
        for (let y = 2017; y <= (new Date()).getFullYear(); y++) {
            let MarksheetModel = await initializeMarksheetModel(y);
            let tmp = await MarksheetModel.findOne({
                $or: [
                    { rollNo: { $regex: searchParam, $options: 'i' } },
                    { registrationNo: { $regex: searchParam, $options: 'i' } },
                    { uid: { $regex: searchParam, $options: 'i' } }
                ]
            });

            if (tmp) {
                marksheet = tmp;
                dbData.push({
                    year: y, semester: marksheet.semester
                });
            }
        }
        if (!marksheet) {
            return res.status(404).json(new ApiResponse(404, null, `DATA NOT FOUND...!`));

        }

        // Fetch the documents
        let studentInfo = fetchDocuments(marksheet);

        studentInfo['metaData'] = {
            name: marksheet.name,
            rollNo: marksheet.rollNo,
            registrationNo: marksheet.registrationNo,
            stream: marksheet.stream,
            course: marksheet.course,
            phone: marksheet.phone,
            uid: marksheet.uid,
        }
        studentInfo["dbDataYear"] = dbData;



        return res.status(200).json(new ApiResponse(200, studentInfo, `DOCUMENTS FOR THE GIVEN SEARCH: ${searchParam}`));

    } catch (error) {
        console.error("Error in fetching marksheets: -\n", error);
    }
}

// GET THE DOCUMENT
export const getDocument = async (req, res) => {
    try {
        // Retrieve the information from the request object
        const { documentType, year, stream, semester, rollNo } = req.body;

        // Create the filePath for the requested document
        let dataDirectory = path.join(process.cwd(), `../../data`);
        let filePath;
        if (documentType !== 'marksheets' || documentType !== 'rcsi') {
            filePath = path.join(dataDirectory, `/${documentType}/${year}/${stream}/${rollNo}.pdf`);
        }
        else {
            filePath = path.join(dataDirectory, `/${documentType}/${year}/${stream}/${semester}/${rollNo}.pdf`);
        }

        // Send if the document exist
        if (fs.existsSync(filePath)) {
            const fileStream = fs.createReadStream(filePath);
            res.setHeader('Content-Type', 'application/pdf');
            fileStream.pipe(res);
        }
        else {
            res.status(404).json(new ApiResponse(404, null, "REQUESTED DOCUMENT NOT FOUND...!"));
        }

    } catch (error) {
        console.error("Error in fetching marksheet: -\n", error);
    }
}

// GET THE MARKSHEETS STATS BY YEAR
export const getMarksheetStats = async (req, res) => {
    try {
        const statsByYear = [];

        for (let y = 2017; y <= (new Date()).getFullYear(); y++) {
            let MarksheetModel = await initializeMarksheetModel(y);
            const stats = await getStatisticsByYear(MarksheetModel, y);
            statsByYear.push(stats);
        }

        return res.status(200).json(new ApiResponse(200, statsByYear, "STATS FOR EACH YEAR...!"));
    } catch (error) {
        console.error("Error in fetching marksheets stats: -\n", error);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
};

// GET THE MARKSHEETS STATS BY YEAR, COURSE, AND SEMESTER
export const getMarksheetStatsCourseSemester = async (req, res) => {
    try {

        const statsByYear = [];
        console.log(req.query.course.toLowerCase())
        for (let y = 2017; y <= (new Date()).getFullYear(); y++) {
            let MarksheetModel = await initializeMarksheetModel(y);
            const stats = await getStatisticsByYearAndCourseAndSemester(MarksheetModel, y, req.query.course.toLowerCase(), Number(req.query.semester));
            statsByYear.push(stats);
        }

        return res.status(200).json(new ApiResponse(200, statsByYear, "STATS FOR EACH YEAR...!"));
    } catch (error) {
        console.error("Error in fetching marksheets stats: -\n", error);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
};

// GET THE MARKSHEETS TOTAL STATS
export const getMarksheetTotal = async (req, res) => {
    try {
        const statsByYear = [];

        for (let y = 2017; y <= (new Date()).getFullYear(); y++) {
            let MarksheetModel = await initializeMarksheetModel(y);
            const stats = await getStatisticsByYear(MarksheetModel, y);
            statsByYear.push(stats);
        }

        let totalStats = {
            total: 0,
            ba: 0,
            bsc: 0,
            bcom: 0,
            ma: 0,
            mcom: 0
        }

        for (let i = 0; i < statsByYear.length; i++) {
            console.log(statsByYear[i]);
            totalStats.total += statsByYear[i].totalMarksheets;
            totalStats.ba += statsByYear[i]["ba"] || 0;
            totalStats.bsc += statsByYear[i]["bsc"] || 0;
            totalStats.bcom += statsByYear[i]["bcom"] || 0;
            totalStats.ma += statsByYear[i]["m.a"] || 0;
            totalStats.mcom += statsByYear[i]["m.com"] || 0;
        }

        return res.status(200).json(new ApiResponse(200, totalStats, "TOTAL STATS...!"));
    } catch (error) {
        console.error("Error in fetching marksheets stats: -\n", error);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
};

// GET THE PASSING PERCENTAGE FOR THE DATA
export const getPassingPercentage = async (req, res) => {
    try {
        const passingStatsArr = await getPassingCountByStreamAndYear();

        const statsByYear = [];

        for (let y = 2017; y <= (new Date()).getFullYear(); y++) {
            let MarksheetModel = await initializeMarksheetModel(y);
            const stats = await getStatisticsByYear(MarksheetModel, y);

            statsByYear.push(stats);
        }

        const passingArr = await getPassingCountByStreamAndYear();
        console.log(passingArr)



        // let baTotal = 0;
        // let bscTotal = 0;
        // let bcomTotal = 0;
        // let maTotal = 0;
        // let mcomTotal = 0;

        // let baPassing = 0;
        // let bscPassing = 0;
        // let bcomPassing = 0;
        // let maPassing = 0;
        // let mcomPassing = 0;
        let percentageArr = []


        for (let y = 2017; y <= (new Date()).getFullYear(); y++) {
            let statsObj = statsByYear.find(ele => ele.year === y);
            let passingObj = passingArr.find(ele => ele.year === y);
            let passingStatsObj = {
                year: y, ba: 0, bsc: 0, bcom: 0, bba: 0, ma: 0, mcom: 0
            };

            // For BA
            if (statsObj.ba && passingObj.baPassing !== 0) {
                passingStatsObj["ba"] = ((passingObj.baPassing * 100) / statsObj.ba).toFixed(1);
            }
            // For BSC
            if (statsObj.bsc && passingObj.bscPassing !== 0) {
                passingStatsObj["bsc"] = ((passingObj.bscPassing * 100) / statsObj.bsc).toFixed(1);
            }
            // For BCOM
            if (statsObj.bcom && passingObj.bcomPassing !== 0) {
                passingStatsObj["bcom"] = ((passingObj.bcomPassing * 100) / statsObj.bcom).toFixed(1);
            }
            // For BBA
            if (statsObj.bba && passingObj.bbaPassing !== 0) {
                passingStatsObj["bba"] = ((passingObj.bbaPassing * 100) / statsObj.bba).toFixed(1);
            }
            // For M.A
            if (statsObj["m.a"] && passingObj["m.aPassing"] !== 0) {
                passingStatsObj["ma"] = ((passingObj["m.aPassing"] * 100) / statsObj["m.a"]).toFixed(1);
            }
            // For M.COM
            if (statsObj["m.com"] && passingObj["m.comPassing"] !== 0) {
                passingStatsObj["mcom"] = ((passingObj["m.comPassing"] * 100) / statsObj["m.com"]).toFixed(1);
            }

            percentageArr.push(passingStatsObj);

        }


        // let passingPercent = {
        //     ba: ((baPassing * 100)/baTotal).toFixed(1),
        //     bsc: ((bscPassing * 100)/bscTotal).toFixed(1),
        //     bcom: ((bcomPassing * 100)/bcomTotal).toFixed(1),
        //     ma: ((maPassing * 100)/maTotal).toFixed(1),
        //     mcom: ((mcomPassing * 100)/mcomTotal).toFixed(1)
        // }




        // console.log(passingPercent)


        return res.status(200).json(new ApiResponse(200, percentageArr, "PASSING PERCENTAGE BY STREAM AND YEAR...!"));
    } catch (error) {
        console.error("Error in fetching passing percentage: -\n", error);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
};

// GET THE MARKSHEET BY ROLL_NO AND YEAR
export const getMarksheetByRollNoAndYear = async (req, res) => {
    try {
        const { year, rollNo } = req.query;
        const MarksheetModel = await initializeMarksheetModel(year);
        const marksheet = await MarksheetModel.findOne({ rollNo: rollNo });

        // Return if the marksheet not found
        if (!marksheet) {
            return res.status(404).json(new ApiResponse(404, null, "MARKSHEET NOT FOUND...!"));
        }

        // Get the all stats for the rollNo

        // Fetch all the marksheets data
        const dataArr = [];
        for (let y = 2017; y <= (new Date()).getFullYear(); y++) {
            let MarksheetModel = await initializeMarksheetModel(y);
            let mksArr = await MarksheetModel.find({ rollNo });
            if (mksArr.length !== 0) {
                dataArr.push(...mksArr);
            }
        }

        // All semester array
        const allSemArr = [];
        for (let i = 0; i < dataArr.length; i++) {
            for (let sem = 1; sem <= 6; sem++) {
                // console.log('-----------------------')
                // Select all semester = sem
                let tmpArr = dataArr.filter(ele => ele.semester === sem);
                if (tmpArr.length === 0) { continue; }

                if (tmpArr.length === 1) { // For only one data
                    if (allSemArr.some(ele => ele._id === tmpArr[0]._id)) { continue; }
                    allSemArr.push(tmpArr[0]);
                }
                else { // More than one attemp
                    // Get the years
                    let years = [];
                    for (let y = 0; y < tmpArr.length; y++) {
                        let year1 = Number(tmpArr[y]._id.substring(0, 4));
                        let year2 = Number(tmpArr[y]._id.substring(5, 9));
                        if (!years.includes(year1)) {
                            years.push(year1);
                        }
                        if (!years.includes(year2) && tmpArr[0].stream === 'BCOM') {
                            years.push(year2);
                        }
                    }
                    years = years.slice().sort((a, b) => a - b); // Sorted years in ascending order
                    console.log(years)
                    // Do operation
                    // Create latest marksheet
                    let marksheet;
                    let c = 0;
                    for(let x = 0; x < years.length; x++) {
                        if (tmpArr[0].stream === 'BCOM') {
                            marksheet = tmpArr.find(ele => ele._id === `${years[0]}/${years[x]}/${tmpArr[0].stream}/${sem}/${rollNo}`);
                            if(marksheet) {
                                break;
                            }
                        }
                        else {
                            marksheet = tmpArr.find(ele => ele._id === `${years[x]}/${-1}/${tmpArr[0].stream}/${sem}/${rollNo}`);
                            if(marksheet) {
                                break;
                            }
                        }
                        c++;
                        console.log("in loop, c =", c);
                    }
console.log("years[c+1] =", years[c + 1]);
console.log("semester = ",sem);
                    for (let y = c + 1; y < years.length; y++) {
                        let nextMarksheet = {};
                        if (marksheet.stream === 'BCOM') {
                            nextMarksheet = tmpArr.find(ele => ele._id === `${years[0]}/${years[y]}/${tmpArr[0].stream}/${sem}/${rollNo}`);
                        }
                        else {
                            nextMarksheet = tmpArr.find(ele => ele._id === `${years[0]}/${-1}/${tmpArr[0].stream}/${sem}/${rollNo}`);
                        }
                        
                        let nextSubjects = nextMarksheet.subjects;
                        console.log(nextSubjects)
                        // CC1.1CH, GE1.1CHG, CC1.1CHG, CC1.2CHG 
                        for (let k = 0; k < nextSubjects.length; k++) {
                            console.log("top condition:", marksheet.subjects.some(ele => ele.subjectName.toUpperCase() === nextSubjects[k].subjectName.toUpperCase()))
                            if (marksheet.subjects.some(ele => ele.subjectName.toUpperCase() === nextSubjects[k].subjectName.toUpperCase())) {
                                // Update the subject(s)
                                marksheet.subjects = marksheet.subjects.map(ele => {
                                    if (ele.subjectName.toUpperCase() === nextSubjects[k].subjectName.toUpperCase()) {
                                        console.log("change subject", nextSubjects[k])
                                        return nextSubjects[k];
                                    }
                                    else {
                                        return ele;
                                    }
                                });
                                // Update the _id
                                if (marksheet.stream === 'BCOM') {
                                    marksheet._id = `${years[0]}/${years[y]}/${tmpArr[0].stream}/${sem}/${rollNo}`;
                                }
                                else {
                                    marksheet._id = `${years[0]}/${-1}/${tmpArr[0].stream}/${sem}/${rollNo}`;
                                }

                                if (sem !== 6) { // For semester = 1, 2, 3, 4, 5
                                    marksheet = processMarksheet(marksheet, []);
                                }
                                else { // For semester = 6
                                    marksheet = processMarksheet(marksheet, allSemArr);
                                }
                                

                            }
                        }

                    }
                    
                    

                    if (allSemArr.some(ele => ele._id === marksheet._id)) { continue; }
                    allSemArr.push(marksheet);
                }

            }
        }



        return res.status(200).json(new ApiResponse(200, { marksheet, allSemArr }, "MARKSHEET FOUND...!"));

    } catch (error) {
        console.error("Error in finding marksheet: -\n", error);
        return res.status(500).json(new ApiResponse(500, null, "INTERNAL SERVER ERROR - OCCURED AT getMarksheetByRollNoAndYear()"));
    }
}

// DELETE THE MARKSHEET BY ID AND YEAR
export const deleteByIdAndYear = async (req, res) => {
    try {
        const { year, _id } = req.query;
        const MarksheetModel = await initializeMarksheetModel(year);
        const deletedMarksheet = await MarksheetModel.findByIdAndDelete(_id);

        if (deletedMarksheet) {
            return res.status(200).json(new ApiResponse(200, deletedMarksheet, "MARKSHEET DELETED SUCCESSFULLY...!"));
        } else {
            return res.status(404).json(new ApiResponse(404, null, "MARKSHEET NOT FOUND"));
        }
    } catch (error) {
        console.error("Error in deleting marksheet: -\n", error);
        return res.status(500).json(new ApiResponse(500, null, "INTERNAL SERVER ERROR - OCCURED AT deleteById()"));
    }
}

// DELETE THE MARKSHEETS BY STREAM AND YEAR
export const deleteByStreamAndYear = async (req, res) => {
    try {
        const { year, stream } = req.query;
        const MarksheetModel = await initializeMarksheetModel(year);

        // Use deleteMany to delete all marksheets matching the specified criteria
        const deleteResult = await MarksheetModel.deleteMany({ stream: stream });

        if (deleteResult.deletedCount > 0) {
            return res.status(200).json(new ApiResponse(200, null, `${deleteResult.deletedCount} MARKSHEETS DELETED SUCCESSFULLY...!`));
        } else {
            return res.status(404).json(new ApiResponse(404, null, "NO MARKSHEETS FOUND FOR DELETION"));
        }
    } catch (error) {
        console.error("Error in deleting marksheets: -\n", error);
        return res.status(500).json(new ApiResponse(500, null, "INTERNAL SERVER ERROR"));
    }
}

// FILTER THE MARKSHEETS DATA
export const filterStudentMarksheets = async (req, res) => {
    try {
        const { stream, course, year, semester, page } = req.body;
        console.log("\n\nin body:", req.body)
        const limit = 250;
        const skip = (page - 1) * limit;
        console.log(`Skip: ${skip}, pages: ${page}`)
        console.log(`from ${skip} to ${skip + limit}`);

        const MarksheetModel = await initializeMarksheetModel(year);
        const statsByYear = await getStatisticsByYearAndCourseAndSemester(MarksheetModel, year, course, semester);
        console.log(statsByYear);

        const totalMarksheets = statsByYear[stream.toLowerCase()]; // Retrieve the total number of marksheets
        const remainingMarksheets = totalMarksheets - skip;
        console.log("tot, rem:", totalMarksheets, remainingMarksheets)

        if (remainingMarksheets <= 0) {
            // No more marksheets left for the requested page
            return res.status(200).json(new ApiResponse(200, [], "No more marksheets left."));
        }

        // const tot = await MarksheetModel.find({ stream, course, semester })
        // console.log(tot.length)

        console.log("Math.min(limit, remainingMarksheets) = ", Math.min(limit, remainingMarksheets))
        console.log(skip);
        const marksheets = await MarksheetModel.find({ stream, course, semester }).skip(skip).limit(Math.min(limit, remainingMarksheets));
        console.log("length from db:", marksheets.length);

        const allArr = [];
        for (let i = 0; i < marksheets.length; i++) {
            // console.log(marksheets[i]._id)
            let { _id, name, registrationNo, rollNo, uid, stream, course, semester, sgpa, remarks, totalMarksObtained, fullMarksSum, totalCredit, marksheetPercentage, classifications, cgpa } = marksheets[i];
            let marksheet = { _id, name, registrationNo, rollNo, uid, stream, course, semester, sgpa, remarks, totalMarksObtained, fullMarksSum, totalCredit, marksheetPercentage, classifications, cgpa };

            let arr = [];
            for (let s = 0; s < marksheets[i].subjects.length; s++) {
                let { fullMarks, year1, year2, ngp, credit, tgp, subjectName, internalMarks, practicalMarks, total, status, theoryMarks, letterGrade } = marksheets[i].subjects[s]
                let subject = { fullMarks, year1, year2, ngp, credit, tgp, subjectName, internalMarks, practicalMarks, total, status, theoryMarks, letterGrade }
                arr.push({ ...marksheet, ...subject });
            }
            allArr.push(...arr);
        }
        console.log("allArr:", allArr.length)


        return res.status(200).json(new ApiResponse(200, allArr, "MARKSHEETS FOR THE GIVEN FILTERS"));

    } catch (error) {
        console.error("Error in filter marksheets: -\n", error);
        return res.status(500).json(new ApiResponse(500, null, "INTERNAL SERVER ERROR"));
    }
}



// export const createMarksheet = async (req, res) => {
//     console.log(req.file)
//     try {
//         const filePath = path.join(process.cwd(), `./public/temp/${req.file.originalname}`)
//         console.log("reading file...");
//         const excelData = readExcelFile(filePath);

//         const streamArr = ["BA", "BSC", "BCOM", "M.A", "M.COM"];

//         console.log("Going to loop...");
//         for (let s = 0; s < streamArr.length; s++) {
//             console.log("stream: ", streamArr[s]);
//             // Process iteration for stream = streamArr[s]
//             let dataByStream = excelData.filter(ele => ele.stream.toUpperCase() === streamArr[s]);

//             for (let y = 2017; y <= (new Date()).getFullYear(); y++) {
//                 console.log("year running:", y);
//                 let formattedArr = [];
//                 let  MarksheetModel = await initializeMarksheetModel(y);
//                 // Process iteration for year as y
//                 let databyYear = [];
//                 if (streamArr[s] === "BCOM") { // For BCOM
//                     databyYear = dataByStream.filter(ele => ele.year2 == y);
//                 }
//                 else { // For BA, BSC, M.A, M.COM
//                     databyYear = dataByStream.filter(ele => ele.year1 == y);
//                 }

//                 const doneArr = new Set();
//                 for (let i = 0; i < databyYear.length; i++) {
//                     // Skip if already processed
//                     let tmpYear = streamArr[s] === 'BCOM' ? databyYear[i].year2 : -1;
//                     let ele = `${databyYear[i].year1}/${tmpYear}/${streamArr[s]}/${databyYear[i].semester}/${databyYear[i].roll_no}`;
//                     if (doneArr.has(ele)) { continue; }
//                     doneArr.add(ele);


//                     let marksheetObj = new MarksheetModel();
//                     // Process the data by roll_no
//                     let excelObjArr = filterData(databyYear, databyYear[i]);
//                     marksheetObj = createMarksheetObj(excelObjArr);
//                     if (marksheetObj.subjects[0].year1 > 2023) { // For new data
//                         marksheetObj = await handleMarksheet(marksheetObj, MarksheetModel);
//                     }
//                     // console.log(marksheetObj)
//                     formattedArr.push(marksheetObj);
//                     // Do insert the data

//                 } 
//                 try {
//                     const result = await MarksheetModel.insertMany(formattedArr);
//                     console.log(`${y} | ${streamArr[s]} | Inserted: ${result.length} `)
//                     // Handle success
//                 } catch (error) {
//                     console.error("Error inserting data:", error);

//                 }
//                 formattedArr.length = 0; // Clear the array for the next iteration
//             }
//         }

//         // TODO: Handle Failed marksheets
//         // for(let y = 2018; y <= (new Date()).getFullYear(); y++) {
//         //     let  MarksheetModel = await initializeMarksheetModel(y);
//         //     let failedMarksheets = await MarksheetModel.find({
//         //         'subjects': {
//         //             $elemMatch: {
//         //                 'year1': { $ne: 'year2' },
//         //             }
//         //         }
//         //     });

//         //     // Process all marksheets
//         //     for(let i = 0; i <= (new Date()).getFullYear(); i++) {
//         //         rectifyFailedMarksheet(failedMarksheets[i]);
//         //     }

//         // }

//         // Delete the file
//         fs.unlink(filePath, (err) => {
//             if (err) {
//                 console.error('Error deleting file:', err);
//             } else {
//                 console.log('File deleted successfully');
//             }
//         });

//         return res.status(201).json(new ApiResponse(201, "savedMarksheet", "MARKSHEET UPLOADED SUCCESSFULLY...!"));

//     } catch (error) {
//         console.error("Error in creating marksheet: -\n", error);
//     }

// }






