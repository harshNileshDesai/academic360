// import React, { useEffect, useState } from 'react'
// import { getMarksheetsStatsByCourse, getMarksheetsStatsByYearWise } from '../../app/api/marksheetApi';
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import ButtonClick from '../form-controls/ButtonClick';

// const Pagination = ({ setFilterCriteria, filterCriteria, handleFilterMarksheets, marksheetArr }) => {

//     const [currentPage, setCurrentPage] = useState(1);

//     const [totalPages, setTotalPages] = useState(1);
    
//     useEffect(() => {
//         getTotalPages();

//     }, [totalPages, marksheetArr]);

//     const getTotalPages = async () => {
//         const { data } = await getMarksheetsStatsByCourse(filterCriteria.course);
//         console.log("stats: ", data.payload);
//         console.log(filterCriteria.year)
//         const obj = data.payload.find(ele => ele.year === Number(filterCriteria.year));
//         console.log(obj)
//         if (filterCriteria.stream.toUpperCase() !== 'M.A' || filterCriteria.stream.toUpperCase() !== "M.COM") {
//             const totalData = obj[filterCriteria.stream.toLowerCase()];
//             console.log("totalData:", totalData);
//             if (totalData > 250) {
//                 let tmpTotalPages = 0;
//                 let tmp = totalData;
//                 while (tmp != 0) {
//                     tmpTotalPages += (tmp / 250);
//                     tmp /= 250;
//                 }
//                 console.log("tmpTotalPages:", Math.ceil(tmpTotalPages))
//                 setTotalPages(Math.ceil(tmpTotalPages));
//             }
//         }
//     }

//     const handlePageClick = async (pageNumber) => {
//         console.log("page click:", pageNumber);
//         setCurrentPage(pageNumber);
//         setFilterCriteria((prev) => ({ ...prev, page: pageNumber }));
//         // Pass a dummy event object to handleFilterMarksheets
//         await handleFilterMarksheets({ preventDefault: () => { } });
//     }
//     const handlePreviousPage = async () => {
//         console.log("previous click:", currentPage - 1);
//         setCurrentPage(currentPage - 1);
//         setFilterCriteria((prev) => ({ ...prev, page: currentPage - 1 }));
//         // Pass a dummy event object to handleFilterMarksheets
//         await handleFilterMarksheets({ preventDefault: () => { } });

//     }
//     const handleNextPage = async () => {
//         console.log("next click:", currentPage + 1)
//         setCurrentPage(currentPage + 1);
//         setFilterCriteria((prev) => ({ ...prev, page: currentPage + 1 }));
//         // Pass a dummy event object to handleFilterMarksheets
//         await handleFilterMarksheets({ preventDefault: () => { } });
//     }

//     return (
//         <div className='flex justify-center items-center py-2 gap-2'>
//             {
//                 totalPages > 1 ?
//                     <>
//                         {/* Previous Page Button */}
//                         <ButtonClick
//                             disabled={currentPage===1}
//                             buttonText={<IoIosArrowBack />}
//                             onClick={handlePreviousPage}
//                             bgColor={'bg-blue'}
//                         />
//                         {/* Iterate Pages */}
//                         <div className="flex gap-1">
//                             {
//                                 Array.from({ length: totalPages }).map((_, index) => (
//                                     <p onClick={() => { handlePageClick(index + 1) }} className={`${(currentPage === index + 1) ? 'bg-blue-500 text-white' : ''} hover:bg-blue-500 hover:text-white rounded-md border p-1 px-2 border-blue-500 cursor-pointer`} key={`page-${index + 1}`}>{index + 1}</p>
//                                 ))
//                             }
//                         </div>

//                         {/* Next Page Button */}
//                         <ButtonClick
//                             disabled={currentPage===totalPages}
//                             buttonText={<IoIosArrowForward />}
//                             onClick={handleNextPage}
//                             bgColor={'bg-blue'}
//                         />
//                     </> : ''
//             }
//         </div>
//     )
// }

// export default Pagination


import React, { useEffect, useState } from 'react';
import { getMarksheetsStatsByCourseSemester } from '../../app/api/marksheetApi';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import ButtonClick from '../form-controls/ButtonClick';

const Pagination = ({ setFilterCriteria, filterCriteria, handleFilterMarksheets, marksheetArr }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getTotalPages();
  }, [filterCriteria, marksheetArr]);

  const getTotalPages = async () => {
    const { data } = await getMarksheetsStatsByCourseSemester(filterCriteria.course, filterCriteria.semester);
    console.log('stats: ', data.payload);
    console.log(filterCriteria.year);
    const obj = data.payload.find((ele) => ele.year === Number(filterCriteria.year));
    console.log(obj);
    if (
      filterCriteria.stream.toUpperCase() !== 'M.A' ||
      filterCriteria.stream.toUpperCase() !== 'M.COM'
    ) {
      const totalData = obj[filterCriteria.stream.toLowerCase()];
      console.log('totalData:', totalData);
      if (totalData > 250) {
        let tmpTotalPages = 0;
        let tmp = totalData;
        while (tmp !== 0) {
          tmpTotalPages += tmp / 250;
          tmp /= 250;
        }
        console.log('tmpTotalPages:', Math.ceil(tmpTotalPages));
        setTotalPages(Math.ceil(tmpTotalPages));
      }
    }
  };

  const handlePageClick = async (pageNumber) => {
    console.log('page click:', pageNumber);
    setCurrentPage(pageNumber);
    setFilterCriteria((prev) => ({ ...prev, page: pageNumber }));
  };

  const handlePreviousPage = async () => {
    console.log('previous click:', currentPage - 1);
    setCurrentPage((prev) => prev - 1);
    setFilterCriteria((prev) => ({ ...prev, page: prev - 1 }));
  };

  const handleNextPage = async () => {
    console.log('next click:', currentPage + 1);
    setCurrentPage((prev) => prev + 1);
    setFilterCriteria((prev) => ({ ...prev, page: prev + 1 }));
  };

  const handleFilter = async () => {
    await handleFilterMarksheets({ preventDefault: () => {} });
  };

  useEffect(() => {
    handleFilter();
  }, [currentPage]);

  return (
    <div className='flex justify-center items-center py-2 gap-2'>
      {totalPages > 1 ? (
        <>
          {/* Previous Page Button */}
          <ButtonClick
            disabled={currentPage === 1}
            buttonText={<IoIosArrowBack />}
            onClick={handlePreviousPage}
            bgColor={'bg-blue'}
          />
          {/* Iterate Pages */}
          <div className='flex gap-1'>
            {Array.from({ length: totalPages }).map((_, index) => (
              <p
                onClick={() => {
                  handlePageClick(index + 1);
                }}
                className={`${
                  currentPage === index + 1 ? 'bg-blue-500 text-white' : ''
                } hover:bg-blue-500 hover:text-white rounded-md border p-1 px-2 border-blue-500 cursor-pointer`}
                key={`page-${index + 1}`}
              >
                {index + 1}
              </p>
            ))}
          </div>
          {/* Next Page Button */}
          <ButtonClick
            disabled={currentPage === totalPages}
            buttonText={<IoIosArrowForward />}
            onClick={handleNextPage}
            bgColor={'bg-blue'}
          />
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default Pagination;
