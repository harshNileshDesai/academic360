import { createMarksheetObj } from "./createMarksheetObj.js";
import { handleMarksheet } from "./handleMarksheet.js";

export const commonProcessing = async (marksheets, MarksheetModel, arr = [], doneArr = [], year, stream) => {
    for (let sem = 1; sem <= 6; sem++) {
        let tmpYear2 = stream.toUpperCase() === "BCOM" ? marksheets[0].year2 : -1;
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
    }
    
    return { arr, doneArr };
}