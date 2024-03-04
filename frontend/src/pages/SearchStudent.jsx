import React, { useEffect, useState } from 'react'
import Loading from '../components/common/Loading';
import { Link, useNavigate } from 'react-router-dom';
import SemesterReportRow from '../components/SemesterReportRow';
import SearchRow from '../components/SearchRow';
import Swal from 'sweetalert2';
import DashboardHeading from '../components/common/DashboardHeading';
import Input from '../components/form-controls/Input';
import ButtonSubmit from '../components/form-controls/ButtonSubmit';
import DisplaySearchMarksheet from '../components/search-students/DisplaySearchMarksheet';
import { getMarksheetsDataBySearch } from '../app/api/marksheetApi';
import { useDispatch, useSelector } from 'react-redux';
import { toogleLoading } from '../app/features/loadingSlice';

const SearchStudent = () => {

  // TODO: Result Display
  // const handleSearch = async () => {
  //   setData(null);
  //   setLoading(true);
  //   // // console.log(rollNo)
  //   // const res = await fetch(`${host}/api/marksheet/search`, {
  //   //   method: 'POST',
  //   //   headers: {
  //   //     'Content-Type': 'application/json',
  //   //     'auth-token': localStorage.getItem('auth-token')
  //   //   },
  //   //   body: JSON.stringify({ rollNo })
  //   // });
  //   // const data = await res.json();
  //   setLoading(false);
  //   console.log(data);

  //   if (data?.length === 0) {
  //     Swal.fire({
  //       title: 'Alert',
  //       text: "Student not found!",
  //       icon: 'error', // Options: 'success', 'error', 'warning', 'info'
  //     });
  //     return;
  //   }
  //   if (data?.length >= 1) {
  //     setData({
  //       name: data[0]?.name,
  //       uid: data[0]?.uid,
  //       registrationNo: data[0]?.registrationNo,
  //       phone: data[0]?.phone
  //     })
  //     const element = [];

  //     for (let y = 2017; y <= (new Date).getFullYear(); y++) {
  //       let yearArr = [];
  //       yearArr = data.filter((ele) => ele.year === y);
  //       if (yearArr.length === 0) { continue; }
  //       element.push(
  //         <SearchRow
  //           key={y}
  //           arr={yearArr}
  //           year={y}
  //           rollNo={data[0].rollNo}
  //           se
  //         />
  //       );
  //     }





  //     // for (let i = 0; i < data.length; i++) {
  //     //   element.push(
  //     //     <SearchRow
  //     //       key={i + 1}
  //     //       obj={data[i]}
  //     //       rollNo={rollNo}
  //     //     />
  //     //   );
  //     // }
  //     setSemArr(element);
  //   }

  // }

  const dispatch = useDispatch()
  const [marksheetData, setMarksheetData] = useState({
    metaData: null,
    degreeDocs: null,
    marksheetDocs: [],
    rcsiDocs: [],
    registrationDocs: [],
    dbDataYear: []
  });

  const [searchParam, setSearchParam] = useState('');

  useEffect(() => {
    console.log(searchParam);
  }, [searchParam]);

  const handleChange = (event) => {
    setMarksheetData({
      metaData: null,
      degreeDocs: null,
      marksheetDocs: [],
      rcsiDocs: [],
      registrationDocs: [],
      dbDataYear: []
    });
    setSearchParam(event.target.value);
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    dispatch(toogleLoading())
    const { data } = await getMarksheetsDataBySearch(searchParam);
    dispatch(toogleLoading())
    console.log(data.payload);
    setMarksheetData(data.payload);
  }

  return (
    <div id="search-student" className='my-3 w-full '>
      {/* PAGE HEADING */}
      <DashboardHeading heading={'Search Student'} />

      {/* SEARCH MARKSHEET */}
      <div className='w-full '>
        <div className="rows w-full my-3">
          <form onSubmit={handleSearch} className="row flex flex-col lg:items-center lg:flex-row gap-7 ">
            <div className='flex items-center gap-3 w-full lg:w-auto my-1 '>
              <Input type={'text'} value={searchParam} htmlFor='searchParam' label='Roll No. / Registration No. / UID' onChange={handleChange} />
            </div>
            <div className='row my-3 '>
              <ButtonSubmit bgColor='bg-red' buttonText='Search' />
            </div>
          </form>

          <hr className='my-9 border-slate-300' />

          {/* DISPLAY THE MARKSHEET DATA */}
          {marksheetData ? <DisplaySearchMarksheet marksheetData={marksheetData} /> : ''}

          {/* { */}

          {/* <div className='w-full overflow-x-scroll'>
                  


                  <div className='my-20 w-full flex flex-col gap-2'>
                    <span className='text-xl font-medium my-3'>Marksheets: -</span>
                    <table className='min-w-[1234px] border-2 border-black '>
                      <thead className='bg-slate-100 '>
                        <tr>
                        <td className='border-2 border-black text-center font-medium py-3 w-[9%]'>Year / Semester</td>
                        <td className='border-2 border-black text-center font-medium py-3 w-[9%]'>Semester 1</td>
                        <td className='border-2 border-black text-center font-medium py-3 w-[9%]'>Semester 2</td>
                        <td className='border-2 border-black text-center font-medium py-3 w-[9%]'>Semester 3</td>
                        <td className='border-2 border-black text-center font-medium py-3 w-[9%]'>Semester 4</td>
                        <td className='border-2 border-black text-center font-medium py-3 w-[9%]'>Semester 5</td>
                        <td className='border-2 border-black text-center font-medium py-3 w-[9%]'>Semester 6</td>

                        </tr>
                      </thead>
                      <tbody >
                  
                      </tbody>
                    </table>
                  </div>


                </div>  */}
          {/* // : ''} */}

        </div>
      </div>
    </div>
  )
}

export default SearchStudent
