import { processMarksheet } from "./processMarksheet.js";

export const handleMarksheet = async (marksheet, MarksheetModel) => {
    // Fetch all data for the given student's marksheet
    let marksheetList = [];
    if(marksheet.semester === 6) {
        marksheetList = await MarksheetModel.find({ rollNo: marksheet.rollNo });
    }

    marksheet = processMarksheet(marksheet, marksheetList);
    
    return marksheet;
    
}