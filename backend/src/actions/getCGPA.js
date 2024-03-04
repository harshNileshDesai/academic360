export const getCGPA = (marksheetList) => {
    let sgpa_totalCredit = 0, creditSumAllSem = 0;
    for(let i = 0; i < 6; i++) {
        let marksheet = marksheetList.find((ele) => ele.semester == i+1 && ele.marksheetPercentage < 30);
        if(!marksheet) {
            return -1; // One of the semester is not cleared or marksheet data missing
        }
        
        // Find the sum of product of (SGPA * Total_Credit)
        sgpa_totalCredit += marksheet.sgpa * marksheet.totalCredit;

        // Find the sum of all credit
        creditSumAllSem += marksheet.creditSum;
    }

    // Return the cgpa
    return (sgpa_totalCredit / creditSumAllSem).toFixed(3);
    
}