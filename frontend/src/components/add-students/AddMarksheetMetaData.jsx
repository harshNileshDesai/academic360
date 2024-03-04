import React from 'react'
import Input from '../form-controls/Input'

const AddMarksheetMetaData = ({marksheet, handleChange}) => {
    return (
        <div className='add-marksheet-meta-data'>
            <div className="row flex gap-7 ">
                <div id="name-field" className='flex gap-3 items-center  my-1 w-1/2'>
                    <div className='w-[15%]'>
                        <label htmlFor="name">Name</label>
                    </div>
                    <div>
                        <input type="text" name="name" value={marksheet.name} onChange={handleChange} className='outline-none border border-slate-400 outline-none px-4 py-1 rounded-md' />
                    </div>
                </div>
                <div className='flex gap-3 items-center border my-1 invisible'>
                    <div className=''>
                        <label htmlFor="">Registration No.</label>
                    </div>
                    <div>
                        <input type="text" className='border border-slate-400 outline-none px-4 py-1 rounded-md' />
                    </div>
                </div>
            </div>
            <div className="row flex gap-7 ">
                <div id="rollno-field" className='flex gap-3 items-center  my-1 w-1/2'>
                    <div className='w-[15%]'>
                        <label htmlFor="rollNo">Roll No.</label>
                    </div>
                    <div>
                        <input type="text" name="rollNo" onChange={handleChange} className='border border-slate-400 outline-none px-4 py-1 rounded-md' />
                    </div>
                </div>
                <div id="registrationno-field" className='flex gap-3 items-center  my-1 '>
                    <div className=''>
                        <label htmlFor="registrationNo">Registration No.</label>
                    </div>
                    <div>
                        <input type="text" name="registrationNo" value={marksheet.registrationNo} onChange={handleChange} className='border border-slate-400 outline-none px-4 py-1 rounded-md' />
                    </div>
                </div>
            </div>

            <div className="row flex gap-7 ">
                <div id="UID" className='flex gap-3 items-center  my-1 w-1/2'>
                    <div className='w-[15%]'>
                        <label htmlFor="UID">UID</label>
                    </div>
                    <div>
                        <input type="text" name="UID" onChange={handleChange} className='border border-slate-400 outline-none px-4 py-1 rounded-md' />
                    </div>
                </div>
                <div id="registrationno-field" className='flex gap-3 items-center  my-1 '>
                    <div className=''>
                        <label htmlFor="phone">Phone &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    </div>
                    <div>
                        <input type="text" name="phone" value={marksheet.phone} onChange={handleChange} className='border border-slate-400 outline-none px-4 py-1 rounded-md' />
                    </div>
                </div>
            </div>

            <hr className='my-9 border-slate-300' />
            <div className="row flex gap-7  ">
                <div id="stream-field" className='flex gap-3 items-center  my-1 w-1/4'>
                    <div className=''>
                        <label htmlFor="stream">Stream</label>
                    </div>
                    <div className='w-full'>
                        <select name="stream" id="stream" value={marksheet.stream} onChange={handleChange} className='border border-slate-400 outline-none w-full px-4 py-1 rounded-md'>
                            <option value="bcom">BCOM</option>
                            <option value="ba">BA</option>
                            <option value="bsc">BSC</option>
                        </select>
                    </div>
                </div>
                <div id="course-field" className='flex gap-3 items-center my-1 w-1/4'>
                    <div className=''>
                        <label htmlFor="course">Course</label>
                    </div>
                    <div className='w-full'>
                        <select name="course" id="course" value={marksheet.course} onChange={handleChange} className='border border-slate-400 outline-none w-full px-4 py-1 rounded-md'>
                            <option value="honours">honours</option>
                            <option value="general">general</option>
                        </select>
                    </div>
                </div>
                <div id="semester-field" className='flex gap-3 items-center my-1 w-1/4'>
                    <div className=''>
                        <label htmlFor="semester">Semester</label>
                    </div>
                    <div>
                        <input type="number" name="semester" value={marksheet.semester} onChange={handleChange} className='border border-slate-400 outline-none px-4 py-1 rounded-md' />
                    </div>
                </div>
                <div id="year-field" className='flex gap-3 items-center my-1 w-1/4'>
                    <div className=''>
                        <label htmlFor="year">Year</label>
                    </div>
                    <div>
                        <input type="number" name="year" value={marksheet.year} onChange={handleChange} className='border border-slate-400 outline-none px-4 py-1 rounded-md' />
                    </div>
                </div>
            </div>
            <hr className='my-9 border-slate-300' />
        </div>
    )
}

export default AddMarksheetMetaData