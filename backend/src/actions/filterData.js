export const filterData = (excelData, obj) => {
    if(obj.stream.toUpperCase() !== "BCOM") { // For BA, BSC, MA & MCOM
        return excelData.filter((ele) => (
            ele.roll_no === obj.roll_no &&
            ele.year1 === obj.year1 &&
            ele.semester === obj.semester &&
            ele.stream === obj.stream
        ));
    }
    else { // For BCOM
        return excelData.filter((ele) => (
            ele.roll_no === obj.roll_no &&
            ele.year2 === obj.year2 &&
            ele.semester === obj.semester &&
            ele.stream === obj.stream
        ));
    }
    
}