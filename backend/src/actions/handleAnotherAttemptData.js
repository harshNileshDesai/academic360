import { commonProcessing } from "./commonProcessing.js";
import { mergeOldWithLatestStats } from "./mergeOldWithLatestStats.js";

export const handleAnotherAttemptData = async (dataArr = [], year, MarksheetModel, formattedArr, stream) => {
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
            // marksheets = mergeOldWithLatestStats(marksheets, year, formattedArr);

            // Handle by semester wise
            ({ arr, doneArr } = await commonProcessing(marksheets, MarksheetModel, arr, doneArr, year, stream));


        }
    }
    return arr;
}