import React, { useEffect, useState } from 'react'
import DashboardHeading from '../components/common/DashboardHeading'
import FilterCriteria from '../components/filter-marksheets/FilterCriteria';
import ColumnHead from '../components/filter-marksheets/ColumnHead';
import Pagination from '../components/filter-marksheets/Pagination';
import { getFilteredMarksheet, getMarksheetsStatsByYearWise } from '../app/api/marksheetApi';
import { useDispatch, useSelector } from 'react-redux';
import { toogleLoading } from '../app/features/loadingSlice';

const FilterMarksheets = () => {

    const columnsArr = [
        "Sr. No.", "Registration No.", "Stream", "Course", "Semester", "Name", "SGPA", "Remarks", "Full Marks", "Year1", "Practical M", "NGP", "Credit", "TGP", "Internal M", "Theory M", "Total", "Status", "Grade", "Roll No."
    ];

    const dispatch = useDispatch();

    const loading = useSelector((state) => state.loading.loading);

    const [marksheetArr, setMarksheetArr] = useState([]);
    const [filterCriteria, setFilterCriteria] = useState({
        stream: 'BCOM',
        course: 'honours',
        semester: 1,
        year: 2017,
        page: 1
    });

    

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setMarksheetArr([]);
        setFilterCriteria((prevFilter) => ({
            ...prevFilter,
            [name]: value,
        }));
        filterCriteria.semester = Number(document.getElementById('semester').value)
    };

    const handleFilterMarksheets = async (e) => {
        e.preventDefault();
        console.log('fetch data for', filterCriteria);
        dispatch(toogleLoading());
        const {data} = await getFilteredMarksheet(filterCriteria);
        dispatch(toogleLoading());
        console.log(data);
        setMarksheetArr(data.payload);
    }

    return (
        <div>
            {/* PAGE HEADING */}
            <DashboardHeading heading={"Filter Marksheets"} />

            {/* MAIN CONTENT */}
            <div id="display-filtered-data" className='px-2'>
                {/* FILTER CRITERIA */}
                <FilterCriteria 
                    marksheetArr={marksheetArr} 
                    setMarksheetArr={setMarksheetArr} 
                    filterCriteria={filterCriteria} 
                    handleOnChange={handleOnChange} 
                    handleFilterMarksheets={handleFilterMarksheets}
                />


                {/* MARKSHEET DATA DISPLAY */}
                {
                    marksheetArr.length > 0 ?
                        <div id="display-table" className='w-full overflow-x-scroll border border-slate-50 '>
                            <div className="border border-black min-w-[3800px] ">
                                <div className='w-[3800px] '>
                                    <ul className='bg-slate-100 w-[3800px] flex border-b border-black'>
                                        {
                                            columnsArr.map((column, index) => (
                                                <ColumnHead key={`filter-student-display-${index}`} columnName={column} />
                                            ))
                                        }
                                    </ul>
                                </div>
                                <div className=' overflow-y-auto h-[40vh] md:w-[3815px]'>
                                    {
                                        marksheetArr.map((marksheet,index) => (
                                            <ul className='flex' key={`filter-marksheet-row-${index}`}>
                                                <li className='p-3 border-r border-black w-[199px] text-center '>{index + 1}</li>
                                                <li className='p-3 border-r border-black w-[200px] text-center '>{marksheet.registrationNo}</li>
                                                <li className='p-3 border-r border-black w-[200px] text-center '>{marksheet.stream}</li>
                                                <li className='p-3 border-r border-black w-[200px] text-center '>{marksheet.course}</li>
                                                <li className='p-3 border-r border-black w-[200px] text-center '>{marksheet.semester}</li>
                                                <li className='p-3 border-r border-black w-[200px] text-center '>{marksheet.name}</li>
                                                <li className='p-3 border-r border-black w-[200px] text-center '>{marksheet.sgpa}</li>
                                                <li className='p-3 border-r border-black w-[200px] text-center '>{marksheet.remarks}</li>
                                                <li className='p-3 border-r border-black w-[200px] text-center '>{marksheet.fullMarks}</li>
                                                <li className='p-3 border-r border-black w-[200px] text-center '>{marksheet.year1}</li>
                                                <li className='p-3 border-r border-black w-[200px] text-center '>{marksheet.practicalMarks}</li>
                                                <li className='p-3 border-r border-black w-[200px] text-center '>{marksheet.ngp}</li>
                                                <li className='p-3 border-r border-black w-[200px] text-center '>{marksheet.credit}</li>
                                                <li className='p-3 border-r border-black w-[200px] text-center '>{marksheet.tgp}</li>
                                                <li className='p-3 border-r border-black w-[200px] text-center '>{marksheet.internalMarks}</li>
                                                <li className='p-3 border-r border-black w-[200px] text-center '>{marksheet.theoryMarks}</li>
                                                <li className='p-3 border-r border-black w-[200px] text-center '>{marksheet.total}</li>
                                                <li className='p-3 border-r border-black w-[200px] text-center '>{marksheet.status}</li>
                                                <li className='p-3 border-r border-black w-[200px] text-center '>{marksheet.letterGrade}</li>
                                                <li className='p-3  w-[200px] text-center '>{marksheet.rollNo}</li>
                                            </ul>
                                        ))
                                    }
                                </div>
                            </div>
                        </div> : ''
                }

                {/* PAGINATION */}
                {marksheetArr.length !==0 && <Pagination 
                    setFilterCriteria={setFilterCriteria} 
                    filterCriteria={filterCriteria} 
                    handleFilterMarksheets={handleFilterMarksheets} 
                    marksheetArr={marksheetArr}
                />}
                


            </div>

        </div>
    )
}

export default FilterMarksheets