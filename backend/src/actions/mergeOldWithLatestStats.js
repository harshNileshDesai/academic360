import { getPreviousMarksheet } from "./getPreviousMarksheet.js";

export const mergeOldWithLatestStats = (marksheets, year, formattedArr) => {
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
                for (let k = 0; k < previousMarksheet.subjects.length; k++) {
                    let tmpSub = previousMarksheet.subjects[k];
                    if (marksheets.find(ele => ele.subject == tmpSub.subjectName)) {
                        // Save the subject to be rectified
                        let rectifyMks = marksheets.filter(ele => ele.subject == tmpSub.subjectName);
                        // Remove the subject to be rectified
                        marksheets = marksheets.filter(ele => ele.subject == tmpSub.subjectName);
                        // Update it with the latest stats
                        marksheets.push({
                            ...obj,
                            full_marks: tmpSub.fullMarks,
                            year1: previousMarksheet.stream.toUpperCase() == 'BCOM' ? tmpSub.year1 : year,
                            year2: previousMarksheet.stream.toUpperCase() == 'BCOM' ? year : -1,
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