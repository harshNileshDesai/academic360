export const getPreviousMarksheet = (excelObj, formattedArr, year2, semester) => {
    let diff = Number(year2) - Number(excelObj.year1);
    let obj = null;
    for (let i = 0, year = Number(year2) - 1; i < diff; i++, year--) {
        // let tmpYear2 = excelObj.stream.toUpperCase()==='BCOM' ? year : -1;
        let tmpId;
        if (excelObj.stream.toUpperCase() === 'BCOM') {
            tmpId = `${excelObj.year1}/${year}/${excelObj.stream.toUpperCase()}/${semester}/${excelObj.roll_no}`;
        }
        else {
            tmpId = `${year}/${-1}/${excelObj.stream.toUpperCase()}/${semester}/${excelObj.roll_no}`;
        }

        obj = formattedArr.find((ele) => (ele._id == tmpId));

        if (obj) {
            break;
        }
    }
    return obj;
}