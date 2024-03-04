export const getClassification = (marksheet) => {
    // Check if all subjects got cleared, if not return "Semester not cleared."
    if(marksheet.subjects.find((subject) => subject.status === 'F')) {
        return "Previous semester not cleared.";
    }

    // Return the classification based on the CGPA
    if (marksheet.cgpa >= 9 && marksheet.cgpa <= 10) {
        return "Outstanding";
    }
    else if (marksheet.cgpa >= 8 && marksheet.cgpa < 9) {
        return "Excellent";
    }
    else if (marksheet.cgpa >= 7 && marksheet.cgpa < 8) {
        return "Very Good";
    }
    else if (marksheet.cgpa >= 6 && marksheet.cgpa < 7) {
        return "Good";
    }
    else if (marksheet.cgpa >= 5 && marksheet.cgpa < 6) {
        return "Average";
    }
    else if (marksheet.cgpa >= 4 && marksheet.cgpa < 5) {
        return "Fair";
    }
    else if (marksheet.cgpa >= 3 && marksheet.cgpa < 4) {
        return "Satisfactory";
    }
    else if (marksheet.cgpa >= 0 && marksheet.cgpa < 3) {
        return "Fail";
    }
}