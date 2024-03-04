import React from 'react'
import StudentInfo from './StudentInfo'
import MarksheetMetaData from './MarksheetMetaData'

const DisplaySearchMarksheet = ({ marksheetData }) => {

    return (
        <div className='w-full overflow-auto space-y-20'>
            {/* STUDENT INFO */}
            {marksheetData?.metaData !== null && <StudentInfo metaMarksheet={marksheetData?.metaData} />}

            {/*  MARKSHEET META DATA */}
            {(
                marksheetData?.marksheetDocs.length === 0 &&
                marksheetData?.rcsiDocs.length === 0 &&
                marksheetData?.registrationDocs.length === 0 &&
                marksheetData?.dbDataYear.length === 0
            ) ? (
                '' // Return nothing if all arrays are empty
            ) : (
                <MarksheetMetaData marksheetData={marksheetData} />
            )}

        </div>
    )
}

export default DisplaySearchMarksheet