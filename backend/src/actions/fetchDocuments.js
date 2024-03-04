import fs from "fs";
import path from "path";

export const fetchDocuments = ({ stream, rollNo, registrationNo, uid, phone, name }) => {
    let dataDirectory = path.join(process.cwd(), `../../data`);

    // Get the marksheets
    let marksheetDocs = [];
    for (let y = 2017; y <= (new Date()).getFullYear(); y++) {
        for (let sem = 1; sem <= 6; sem++) {
            // For passed marksheet
            let passedFilePath = path.join(dataDirectory, `/RECTIFIED/${y}/${stream.toUpperCase()}/${sem}/${rollNo}.pdf`);
            if (fs.existsSync(passedFilePath)) {
                marksheetDocs.push({
                    rollNo, year: y, stream, semester: sem, uid, phone, registrationNo, name
                });
                console.log(`marksheet -> ${y} | ${stream} | ${sem} | ${rollNo}.pdf`)
            }

            // For failed marksheet
            let failedFilePath = path.join(dataDirectory, `/RE-EXAM/${y}/${stream.toUpperCase()}/${sem}/${rollNo}.pdf`);
            if (fs.existsSync(failedFilePath)) {
                marksheetDocs.push({
                    rollNo, year: y, stream, semester: sem, uid, phone, registrationNo, name
                });
            }
        }
    }

    // Get the degree-certificates
    let degreeDocs = null;
    for (let y = 2017; y <= (new Date()).getFullYear(); y++) {
        let filePath = path.join(dataDirectory, `/DEGREE CERTIFICATE/${stream.toUpperCase()}/${rollNo}.jpg`);
        if (fs.existsSync(filePath)) {
            degreeDocs = {
                rollNo, year: y, stream, uid, phone, registrationNo, name
            };
            break;
        }
    }

    // Get the rcsi
    let rcsiDocs = [];
    for (let y = 2017; y <= (new Date()).getFullYear(); y++) {
        for (let sem = 1; sem <= 6; sem++) {
            let filePath = path.join(dataDirectory, `/RC - SI Marksheets/${y}/${stream.toUpperCase()}/${sem}/${rollNo}.pdf`);
            if (fs.existsSync(filePath)) {
                rcsiDocs.push({
                    rollNo, year: y, stream, semester: sem, uid, phone, registrationNo, name
                });
            }
        }
    }

    // Get the registration certificates
    let registrationDocs = [];
    for (let y = 2017; y <= (new Date()).getFullYear(); y++) {
        let filePath = path.join(dataDirectory, `/registration-certificates/${y}/${stream.toUpperCase()}/${rollNo}.pdf`);
        if (fs.existsSync(filePath)) {
            registrationDocs.push({
                rollNo, year: y, stream, uid, phone, registrationNo, name
            });
        }
    }

    return { marksheetDocs, degreeDocs, rcsiDocs, registrationDocs };

}