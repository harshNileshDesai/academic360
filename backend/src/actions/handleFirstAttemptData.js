import { commonProcessing } from "./commonProcessing.js";

export const handleFirstAttemptData = async (dataArr = [], MarksheetModel, year, stream) => {
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
        ({ arr, doneArr } = await commonProcessing(marksheets, MarksheetModel, arr, doneArr, year, stream));


    }

    return arr;
}