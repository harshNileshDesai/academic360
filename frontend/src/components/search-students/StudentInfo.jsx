import React from 'react'

const StudentInfo = ({ metaMarksheet }) => {

    console.log(metaMarksheet)
    const metaColumns = ["Name", "UID", "Registration No.", "Phone"];
    const metaFields = ["name", "uid", "registrationNo", "phone"];

    return (
        <div>
            <h3 className='uppercase text-xl font-medium my-3'>Student Info</h3>
            <table className='min-w-[1234px]  border-2 border-black '>
                <thead className='bg-slate-100 '>
                    <tr>
                        {
                            metaColumns.map((column, index) => (
                                <th key={`marksheet-info-column-${index}`} className='border-2 border-black text-center font-medium py-3 w-[9%]'>{column}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody >
                    <tr>
                        {
                            metaFields.map((field, index) => (
                                <td key={`marksheet-info-field-${index}`} className='border-2 border-black text-center font-medium py-2 w-[9%]'>
                                    { metaMarksheet[field] }
                                </td>
                            ))
                        }
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default StudentInfo