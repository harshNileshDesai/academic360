import { stream } from "xlsx";
import { createMarksheetObj } from "./src/actions/createMarksheetObj";
import { handleMarksheet } from "./src/actions/handleMarksheet";
import { createMarksheet } from "./src/controllers/marksheet.controller";

const filterByYear = (arr, year, stream) => {
    if (stream !== "BCOM") { // For BA, BSC, MA & MCOM
        return arr.filter((ele) => (
            ele.year1 == year &&
            ele.stream.toUpperCase() === stream
        ));
    }
    else { // For BCOM
        return arr.filter((ele) => (
            ele.year2 == year &&
            ele.stream.toUpperCase() === stream
        ));
    }
}

const getPreviousMarksheet = (excelObj, formattedArr, year2, semester) => {
    let diff = Number(year2) - Number(excelObj.year1);
    let obj = null;
    for (let i = 0, year = Number(year2) - 1; i < diff; i++, year--) {
        // let tmpYear2 = excelObj.stream.toUpperCase()==='BCOM' ? year : -1;
        let tmpId;
        if (excelObj.stream.toUpperCase() === 'BCOM') {
            tmpId = `${excelObj.year1}/${year}/${excelObj.stream.toUpperCase()}/${semester}/${excelObj.roll_no}`;
        }
        else {
            tmpId = `${year}/${-1}/${excelObj.stream.toUpperCase()}/${semester}/${excelObj.roll_no}`;
        }

        obj = formattedArr.find((ele) => (ele._id == tmpId));

        if (obj) {
            break;
        }
    }
    return obj;
}

const commonProcessing = async (marksheets, MarksheetModel, arr, doneArr, year, stream) => {
    for (let sem = 1; sem <= 6; sem++) {
        let tmpYear2 = stream.toUpperCase() === "BCOM" ? year : -1;
        let _id = `${marksheets[0].year1}/${tmpYear2}/${stream.toUpperCase()}/${sem}/${marksheets[0].roll_no}`;
        // Get the all the subjects for the semester: sem 
        let mksArr = marksheets.filter((ele) => (ele.semester == sem));
        if (mksArr.length > 0) {
            // Format (or create) the marksheet object
            let marksheetObj = new MarksheetModel();
            marksheetObj = createMarksheetObj(mksArr, _id);
            if (marksheetObj.subjects[0].year1 > 2023) {
                marksheetObj = await handleMarksheet(marksheetObj, MarksheetModel);
            }
            // Add the marksheetObj to the arr[]
            arr.push(marksheetObj)

            // Mark the marksheet data as done
            doneArr.add(_id);

        }
    };
    return { arr, doneArr };
}

const mergeOldWithLatestStats = (marksheets, year, formattedArr) => {
    for (let i = 0; i < marksheets.length; i++) {
        for (let sem = 1; sem <= 6; sem++) {
            // Fetch the data by semester: sem
            let dataArr = marksheets.filter(ele => ele.semester == sem);
            if (dataArr.length !== 0) {
                // Get previous year marksheet for semester: sem
                let previousMarksheet = getPreviousMarksheet(dataArr[0], formattedArr, year, sem);
                // Skip if not found
                if (!previousMarksheet) { continue; }
                let obj = {
                    name: previousMarksheet.name,
                    registration_no: previousMarksheet.registration_no,
                    roll_no: previousMarksheet.roll_no,
                    uid: previousMarksheet.uid,
                    stream: previousMarksheet.stream,
                    course: previousMarksheet.course,
                    semester: previousMarksheet.semester,
                    sgpa: previousMarksheet.sgpa,
                    remarks: previousMarksheet.remarks
                };
                for(let k = 0; k < previousMarksheet.subjects.length; k++) {
                    let tmpSub = previousMarksheet.subjects[k];
                    if(marksheets.find(ele => ele.subject == tmpSub.subjectName)) {
                        // Save the subject to be rectified
                        let rectifyMks = marksheets.filter(ele => ele.subject == tmpSub.subjectName);
                        // Remove the subject to be rectified
                        marksheets = marksheets.filter(ele => ele.subject == tmpSub.subjectName);
                        // Update it with the latest stats
                        marksheets.push({
                            ...obj,
                            full_marks: tmpSub.fullMarks,
                            year1: previousMarksheet.stream.toUpperCase()=='BCOM' ? tmpSub.year1 : year,
                            year2: previousMarksheet.stream.toUpperCase()=='BCOM' ? year : -1,
                            ngp: rectifyMks.ngp,
                            credit: rectifyMks.credit,
                            tgp: rectifyMks.tgp,
                            subject: rectifyMks.subject,
                            internal_marks: rectifyMks.internal_marks,
                            practical_marks: rectifyMks.practical_marks,
                            theory_marks: rectifyMks.theory_marks,
                            total: rectifyMks.total,
                            status: rectifyMks.status,
                            grade: rectifyMks.grade
                        });
                    }
                }

                

            }
        }
    }

    return marksheets;
}

const handleAnotherAttemptData = (dataArr = [], year, MarksheetModel, formattedArr, stream) => {
    let doneArr = new Set();
    let arr = [];
    if (year > 2017) {
        for (let i = 0; i < dataArr.length; i++) {
            // Skip the iteration if already process the marksheet
            let marksheet = dataArr[i];
            let tmpYear2 = stream.toUpperCase() === "BCOM" ? year : -1;
            let _id = `${marksheet.year1}/${tmpYear2}/${marksheet.stream.toUpperCase()}/${marksheet.semester}/${marksheet.roll_no}`;
            if (doneArr.has(_id)) { continue; }

            // Fetch the data by marksheet's rollNo: marksheet.roll_no
            let marksheets = dataArr.filter(ele => ele.roll_no === marksheet.roll_no);

            // Get the previous marksheet from the formattedArr[] and update with the latest status
            marksheets = mergeOldWithLatestStats(marksheets, year, formattedArr);

            // Handle by semester wise
            ({ arr, doneArr } = commonProcessing(marksheets, MarksheetModel, arr, doneArr, year, stream));


        }
    }
    return arr;
}

const handleFirstAttemptData = async (dataArr = [], MarksheetModel, year, stream) => {
    let doneArr = new Set();
    let arr = [];
    for (let i = 0; i < dataArr.length; i++) {
        let marksheet = dataArr[i];
        // Skip the iteration if already process the marksheet
        let tmpYear2 = stream.toUpperCase() === 'BCOM' ? marksheet.year2 : -1;
        let _id = `${year}/${tmpYear2}/${marksheet.stream.toUpperCase()}/${marksheet.semester}/${marksheet.roll_no}`;
        if (doneArr.has(_id)) { continue; }

        // Fetch all data for the marksheet's rollNo: marksheet.roll_no
        let marksheets = dataArr.filter(ele => ele.roll_no == marksheet.roll_no);

        // Handle by semester wise
        ({ arr, doneArr } = commonProcessing(marksheets, MarksheetModel, arr, doneArr, year, stream));


    }

    return arr;
}

const excelData = []; // Load the excel data
const streamArr = ["BA", "BSC", "BCOM", "M.A", "M.COM"];
const formattedArr = [];
for (let s = 0; s < streamArr.length; s++) {
    // Filter data by stream: streamArr[s]
    let streamData = excelData.filter(ele => ele.stream.toUpperCase() === streamArr[s]);
    // Loop over the years
    for (let y = 2017; y <= (new Date()).getFullYear(); y++) {
        let MarksheetModel = await initializeMarksheetModel(y);

        // Filter data by year: y
        let yearData = filterByYear(streamData, y, streamArr[s]);

        let firstAttemptData = yearData.filter(ele => ele.year1 == ele.year2);
        let anotherAttemptData = yearData.filter(ele => ele.year1 != ele.year2);

        // Handle first attempt data
        let tmpArr1 = handleFirstAttemptData(firstAttemptData, MarksheetModel, year, streamArr[s]);
        formattedArr.push(...tmpArr1);

        // Handle another attempt data
        let tmpArr2 = handleAnotherAttemptData(anotherAttemptData, y, MarksheetModel, formattedArr, y, streamArr[s]);
        formattedArr.push(...tmpArr2);

        try {
            const result = await MarksheetModel.insertMany(formattedArr);
            console.log(`${y} | ${streamArr[s]} | Inserted: ${result.length} `)
            // Handle success
        } catch (error) {
            console.error("Error inserting data:", error);
           
        }
        formattedArr.length = 0; // Clear the array for the next iteration

    }
}