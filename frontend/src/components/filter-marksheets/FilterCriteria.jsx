import React, { useState } from 'react'
import ButtonSubmit from '../form-controls/ButtonSubmit'

const FilterCriteria = ({ marksheetArr, setMarksheetArr, filterCriteria, handleOnChange, handleFilterMarksheets }) => {


    return (
        <div className='w-full  my-1 '>
            <form onSubmit={handleFilterMarksheets} className="rows w-full  ">
                <div className="row flex flex-col sm:flex-row gap-1 md:gap-7  ">
                    <div id="stream-field" className='flex gap-3 flex-col sm:items-center my-1 sm:w-1/4'>
                        <div className=''>
                            <label htmlFor="stream">Stream</label>
                        </div>
                        <div className='w-full'>
                            <select name="stream" onChange={handleOnChange} value={filterCriteria.stream} id="stream" className='border outline-none border-slate-300 w-full px-4 py-1 rounded-md'>
                                <option value="BCOM">BCOM</option>
                                <option value="BA">BA</option>
                                <option value="BSC">BSC</option>
                                <option value="BBA">BBA</option>
                                <option value="M.A">M.A</option>
                                <option value="M.COM">M.COM</option>
                            </select>
                        </div>
                    </div>
                    <div id="course-field" className='flex gap-3 flex-col sm:items-center my-1 sm:w-1/4'>
                        <div className=''>
                            <label htmlFor="course">Course</label>
                        </div>
                        <div className='w-full'>
                            <select name="course" onChange={handleOnChange} value={filterCriteria.stream.toLowerCase() !== 'bcom' ? 'honours' : filterCriteria.course} id="course" className='border outline-none border-slate-300 w-full px-4 py-1 rounded-md'>
                                <option value="honours">honours</option>
                                <option value="general">general</option>
                            </select>
                        </div>
                    </div>
                    <div id="semester-field" className='flex gap-3 flex-col sm:items-center my-1 sm:w-1/4'>
                        <div className=''>
                            <label htmlFor="semester">Semester</label>
                        </div>
                        <div className='w-full'>
                            <input type="number" name="semester" id="semester" value={filterCriteria.semester} onChange={handleOnChange} className='w-full border outline-none border-slate-300 px-4 py-1 rounded-md' />
                        </div>
                    </div>
                    <div id="year-field" className='flex gap-3 flex-col sm:items-center my-1 sm:w-1/4'>
                        <div className=''>
                            <label htmlFor="year">Year</label>
                        </div>
                        <div className='w-full'>
                            <input type="number" name="year" id="year" value={filterCriteria.year} onChange={handleOnChange} className='w-full border outline-none border-slate-300 px-4 py-1 rounded-md' />
                        </div>
                    </div>
                </div>
                <div className='row my-3 '>
                    <ButtonSubmit buttonText='Search' bgColor="bg-red" />
                </div>
                <hr className='my-4 border-slate-300' />
            </form>
        </div>
    )
}

export default FilterCriteria