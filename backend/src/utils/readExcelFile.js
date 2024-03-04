
import xlsx from "xlsx"

export const readExcelFile = (filePath) => {
    try {
        // Read the Excel file
        const workbook = xlsx.readFile(filePath);

        // Get the first sheet in the workbook
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert the worksheet to a JSON object
        const data = xlsx.utils.sheet_to_json(worksheet);

        return data;
    } catch (error) {
        console.error('Error reading Excel file:', error.message);
        return null;
    }
}