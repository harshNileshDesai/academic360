export const getLetterGrade = (percentageMarks) => {
    if (percentageMarks >= 90 && percentageMarks <= 100) { 
        return "A++"; 
    }
    else if (percentageMarks >= 80 && percentageMarks < 90) { 
        return "A+"; 
    }
    else if (percentageMarks >= 70 && percentageMarks < 80) { 
        return "A"; 
    }
    else if (percentageMarks >= 60 && percentageMarks < 70) { 
        return "B+"; 
    }
    else if (percentageMarks >= 50 && percentageMarks < 60) { 
        return "B" 
    }
    else if (percentageMarks >= 40 && percentageMarks < 50) { 
        return "C+"; 
    }
    else if (percentageMarks >= 30 && percentageMarks < 40) { 
        return "C"; 
    }
    else if (percentageMarks >= 0 && percentageMarks < 30) { 
        return "F"; 
    }
}