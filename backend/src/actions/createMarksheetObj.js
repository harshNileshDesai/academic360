export const createMarksheetObj = (excelObjArr, _id) => {
        let marksheetObj = {
            _id: _id,
            name: excelObjArr[0].name,
            registrationNo: excelObjArr[0].registration_no,
            rollNo: excelObjArr[0].roll_no,
            uid: excelObjArr[0].uid || '',
            stream: excelObjArr[0].stream.toUpperCase(),
            course: excelObjArr[0].course,
            semester: excelObjArr[0].semester,
            sgpa: isNaN(Number(excelObjArr[0].sgpa)) ? 0 : Number(excelObjArr[0].sgpa),
            remarks: excelObjArr[0].remarks || "default remarks",
            totalMarksObtained: 0,
            fullMarksSum: 0,
            totalCredit: 0,
            marksheetPercentage: 0,
            classifications: '',
            cgpa: isNaN(Number(excelObjArr[0].cgpa)) ? -1 : Number(excelObjArr[0].cgpa),
            subjects: []
        }

        const subjectsDone = new Set();
        let flagMarks = true;
        let flagCredits = true;
        for (let i = 0; i < excelObjArr.length; i++) {
            if (subjectsDone.has(excelObjArr[i].subject)) { continue; }
            // console.log(excelObjArr[i]);  
            subjectsDone.add(excelObjArr[i].subject);

            let fm = -1;
            if(excelObjArr[i].full_marks!==undefined) {
                fm = isNaN(Number(excelObjArr[i].full_marks)) ? -1 : Number(excelObjArr[i].full_marks);
            }

            let t = -1;
            if(excelObjArr[i].total!==undefined) {
                t = isNaN(Number(excelObjArr[i].total)) ? -1 : Number(excelObjArr[i].total);
            }

            let im = 0;
            if(excelObjArr[i].internal_marks!==undefined) {
                im = isNaN(Number(excelObjArr[i].internal_marks)) ? 0 : Number(excelObjArr[i].internal_marks);
            }

            let pm = 0;
            

            if(marksheetObj.stream == 'BCOM') { 
                pm = 0; 
            }
            else {
                if(excelObjArr[i].year2!==undefined) {
                    pm = isNaN(Number(excelObjArr[i].year2)) ? 0 : Number(excelObjArr[i].year2);
                }
                else {
                    pm = 0; 
                }
            }

            let tm = 0;
            if(excelObjArr[i].theory_marks!==undefined) {
                tm = isNaN(Number(excelObjArr[i].theory_marks)) ? 0 : Number(excelObjArr[i].theory_marks);
            }

            let subject = {
                fullMarks: fm,
                year1: excelObjArr[i].year1,
                year2: excelObjArr[i].stream.toUpperCase() !== 'BCOM' ? -1 : excelObjArr[i].year2,
                ngp: excelObjArr[i].ngp,
                credit: isNaN(Number(excelObjArr[i].credit)) ? -1 : Number(excelObjArr[i].credit),
                tgp: excelObjArr[i].tgp,
                subjectName: excelObjArr[i].subject,
                internalMarks: im,
                practicalMarks: pm,
                theoryMarks: tm,
                total: t,
                status: excelObjArr[i].status,
                letterGrade: excelObjArr[i].grade || ''
            };
            // console.log(subject)
 
            // Set the ngp
            if(subject.total > -1) {
                subject.ngp = subject.total / 10;
            }
            else { 
                subject.ngp = -1;
            }

            // Find the total marks
            // console.log("subject before:", subject, marksheetObj);
            // console.log(marksheetObj.subjects.some(ele => ele.total > -1))
            if(marksheetObj.subjects.some(ele => ele.total > -1)) {
                marksheetObj.totalMarksObtained += subject.total;
            }
            else {
                marksheetObj.totalMarksObtained = -1;
            }

            // Find the full marks
            if(marksheetObj.subjects.some(ele => ele.fullMarks === -1)) {
                marksheetObj.fullMarksSum = -1;
            }
            else {
                marksheetObj.fullMarksSum += subject.fullMarks;
            }
            // Find the total credit
            if(marksheetObj.subjects.some(ele => ele.credit === -1)) {
                marksheetObj.totalCredit = -1;
            }
            else { 
                marksheetObj.totalCredit += subject.credit;
            }

            if(subject.total !== -1 && subject.fullMarks !== -1) {
                let subjectPercent = (subject.total * 100)/subject.fullMarks;
                if(subjectPercent < 30) {
                    marksheetObj.remarks = "Semester not cleared.";
                }
            }

            // Add the subject
            marksheetObj.subjects.push(subject);
            

        }

        // Find the marksheet percentage
        if (marksheetObj.totalMarksObtained > -1 && marksheetObj.fullMarksSum > -1) {
            marksheetObj.marksheetPercentage = ((marksheetObj.totalMarksObtained * 100) / marksheetObj.fullMarksSum).toFixed(1);
        } else {
            marksheetObj.marksheetPercentage = -1; // or any other appropriate default value
        }
        

        return marksheetObj;
    }