export const filterByYear = (arr, year, stream) => {
    if (stream !== "BCOM") { // For BA, BSC, MA & MCOM
        return arr.filter((ele) => (
            ele.year1 == year &&
            ele.stream.toUpperCase() === stream
        ));
    }
    else { // For BCOM
        return arr.filter((ele) => (
            ele.year2 == year &&
            ele.stream.toUpperCase() === stream
        ));
    }
}