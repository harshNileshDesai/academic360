import React, { useEffect, useState } from 'react'

import { PiCertificate } from "react-icons/pi";

import ButtonClick from '../form-controls/ButtonClick'
import DataRow from './DataRow';

const MarksheetMetaData = ({ marksheetData }) => {

    const [dataArr, setDataArr] = useState([]);

    useEffect(() => {
        const data = [];
        console.log(marksheetData)
        const doneYear = new Set();
        for (let i = 0; i < Math.max(marksheetData.marksheetDocs.length, marksheetData.dbDataYear.length); i++) {
            let year = (marksheetData.marksheetDocs[i] && marksheetData.marksheetDocs[i].year) || 
            (marksheetData.dbDataYear[i] && marksheetData.dbDataYear[i].year);

            if(doneYear.has(year)) {
                continue;
            }
            let yearObj = {
                degreeDoc: marksheetData.degreeDocs || null,
                marksheetDocs: marksheetData.marksheetDocs.filter(ele => ele.year == year),
                rcsiDocs: marksheetData.rcsiDocs.filter(ele => ele.year == year),
                registrationDocs: marksheetData.registrationDocs.filter(ele => ele.year == year),
                dbDataYear: marksheetData.dbDataYear
            }

            console.log(`for year: ${year}, yearObj: `, yearObj);
            
            data.push(
                <DataRow 
                    key={`marksheet-meta-data-${year}`} 
                    year={year} 
                    yearObj={yearObj} 
                />
            );
            doneYear.add(year);
        }
        console.log(data.length)
        setDataArr(data);
    }, []);

    const columns = ["Year / Semester", "Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6"];
    return (
        <div>
            <h3 className='uppercase text-xl font-medium my-3'>Meta Data</h3>
            <table className='min-w-[1234px] border-2 border-black '>
                <thead className='bg-slate-100 '>
                    <tr>
                        {
                            columns.map((column, index) => (
                                <td key={`marksheet-meta-data-${index}`} className='border-2 border-black text-center font-medium py-3 w-[9%]'>{column}</td>
                            ))
                        }
                    </tr>
                </thead>
                <tbody >
                    {dataArr}
                </tbody>
            </table>
        </div>
    )
}

export default MarksheetMetaData