export const getRemarks = (marksheet) => {
    // Check if all subjects got cleared, if not return "Semester not cleared."
    if(marksheet.subjects.find((subject) => subject.status === 'F')) {
        return "Semester not cleared.";
    }

    // Get the remarks by the marksheetPercentage
    if(marksheet.marksheetPercentage < 30) { // For failed students
        return "Semester not cleared";
    }
    else { // For passed students
        if(marksheet.semester !== 6) { // For Semester: 1, 2, 3, 4, 5
            return "Semester cleared.";
        }
        else { // For Semester: 6
            if(marksheet.stream.toUppercase !== "BCOM") { // For Stream: BA, BSC
                return "Qualified with Honours.";
            }
            else { // For Stream: BCOM
                if(marksheet.course.toLowerCase() === "honours") { // For honours
                    return "Semester cleared with honours."
                }
                else { // For general
                    return "Semester cleared with general."
                }
            }
        }
    }

}