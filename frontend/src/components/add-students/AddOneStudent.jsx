import React, { useState } from 'react'
import AddMarksheetMetaData from './AddMarksheetMetaData';

const AddOneStudent = () => {

    const [addSubjectRow, setAddSubjectRow] = useState([]);
    const [marksheet, setMarksheet] = useState({
        name: '',
        rollNo: '',
        registrationNo: '',
        stream: 'bcom',
        course: 'honours',
        semester: 1,
        year: (new Date()).getFullYear(),
        year2: (new Date()).getFullYear(),
        UID: '',
        phone: '',
        subjects: [],
    });

    const handleChange = (e) => {

    } 

    const handleAddSubjectRow = () => {

    }

    const handleAdd = (e) => {

    } 

    return (
        <div className="w-full overflow-auto">
            <form className='w-full border-2 border-blue-500 min-w-[1240px]  '>
                <div className='rows w-full p-3 my-3 '>
                    {/* MARKSHEET META DATA */}
                    <AddMarksheetMetaData marksheet={marksheet} handleChange={handleChange} />

                    {/* SUBJECTS DATA */}
                    <div className="row w-full">
                        <div className="w-full flex justify-between items-center ">
                            <div>
                                <h3 className='text-xl font-medium my-2'>Current Semesters</h3>
                            </div>
                            <div>
                                <button onClick={handleAddSubjectRow} className='bg-purple-500 text-white px-4 py-1 font-medium rounded-md'>Fetch Subject</button>
                            </div>
                        </div>

                        {/* Add Subject */}
                        <div className='w-full'>
                            <table className='w-full border-2 border-black'>
                                <thead className='w-full bg-slate-100'>
                                    <tr>
                                        <td className='border-2 border-black text-center font-medium py-3 w-[7.7%]'>Subject</td>
                                        <td className='border-2 border-black text-center font-medium py-3 w-[7.7%]'>Full Marks</td>
                                        <td className='border-2 border-black text-center font-medium py-3 w-[7.7%]'>Year1</td>
                                        <td className='border-2 border-black text-center font-medium py-3 w-[7.7%]'>Internal M</td>
                                        {marksheet.stream.toUpperCase() === "BCOM" ?
                                            <td className='border-2 border-black text-center font-medium py-3 w-[7.7%]'>Year2</td> :
                                            <td className='border-2 border-black text-center font-medium py-3 w-[7.7%]'>Practical M</td>
                                        }
                                        <td className='border-2 border-black text-center font-medium py-3 w-[7.7%]'>Theory M</td>
                                        <td className='border-2 border-black text-center font-medium py-3 w-[7.7%]'>Total</td>
                                        <td className='border-2 border-black text-center font-medium py-3 w-[7.7%]'>Grade</td>
                                        <td className='border-2 border-black text-center font-medium py-3 w-[7.7%]'>NGP</td>
                                        <td className='border-2 border-black text-center font-medium py-3 w-[7.7%]'>Credit</td>
                                        <td className='border-2 border-black text-center font-medium py-3 w-[7.7%]'>TGP</td>
                                        <td className='border-2 border-black text-center font-medium py-3 w-[7.7%]'>Status</td>
                                        <td className='border-2 border-black text-center font-medium py-3 w-[7.7%]'>Actions</td>
                                    </tr>
                                </thead>
                                <tbody className='border-2 border-black'>
                                    {addSubjectRow}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <hr className='my-9 border-slate-300' />



                    <div>
                        <button onClick={handleAdd} className='bg-green-500 hover:bg-green-600 text-white font-medium rounded-md px-4 py-2'>Add</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddOneStudent