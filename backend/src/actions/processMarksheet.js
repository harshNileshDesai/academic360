import { getCGPA } from "./getCGPA.js";
import { getClassification } from "./getClassification.js";
import { getLetterGrade } from "./getLetterGrade.js";
import { getRemarks } from "./getRemarks.js";

export const processMarksheet = (marksheet, marksheetList = []) => {
    let ngp_credit = 0;
    marksheet.totalMarksObtained = 0;
    marksheet.fullMarksSum = 0;
    marksheet.totalCredit = 0;

    for (let i = 0; i < marksheet.subjects.length; i++) {
        let im = isNaN(Number(marksheet.subjects[i].internalMarks)) ? 0 : Number(marksheet.subjects[i].internalMarks);
        let tm = isNaN(Number(marksheet.subjects[i].theoryMarks)) ? 0 : Number(marksheet.subjects[i].theoryMarks);
        let pm = isNaN(Number(marksheet.subjects[i].practicalMarks)) ? 0 : Number(marksheet.subjects[i].practicalMarks);

        // Set the total field for the subject
        if (marksheet.stream.toUpperCase() !== "BCOM") { // For BA & BSC
            marksheet.subjects[i].total = im + tm + pm;
        }
        else if (marksheet.stream.toUpperCase() === "BCOM") { // For BCOM
            marksheet.subjects[i].total = im + tm;
        }

        // Find the totalMarksObtained & fullMarksSum
        marksheet.totalMarksObtained += marksheet.subjects[i].total;
        marksheet.fullMarksSum += marksheet.subjects[i].fullMarks;

        let percentageMarks = (marksheet.subjects[i].total * 100) / marksheet.subjects[i].fullMarks;

        // Set the NGP (percentageMarks/10)
        marksheet.subjects[i].ngp = (percentageMarks / 10).toFixed(1);

        // Find sum of product of (NGP * Credit)
        ngp_credit += marksheet.subjects[i].ngp * marksheet.subjects[i].credit;

        // Find sum of all credits
        marksheet.totalCredit += marksheet.subjects[i].credit;

        // Set the letterGrade for the subject
        marksheet.subjects[i].letterGrade = getLetterGrade(percentageMarks);

        // Set the status
        if (marksheet.subjects[i].letterGrade === 'F' || percentageMarks < 30) {
            marksheet.subjects[i].status = 'F';
        }
        else {
            marksheet.subjects[i].status = 'P';
        }

        // console.log(marksheet.subjects[i])

    }

    // Set the marksheetPercentage
    marksheet.marksheetPercentage = (marksheet.totalMarksObtained * 100) / marksheet.fullMarksSum;

    // Set the SGPA ( Summation(ngp * credit)/ totalCredit )
    marksheet.sgpa = (ngp_credit/marksheet.totalCredit).toFixed(3);

    // Set the remarks for the marksheet
    marksheet.remarks = getRemarks(marksheet);

    // For the semester-6
    if(marksheet.semester == 6) {
        // Set the cgpa
        marksheet.cgpa = getCGPA(marksheetList);
    
        // Set the classification
        marksheet.classification = getClassification(marksheet);
    }

    return marksheet;

}