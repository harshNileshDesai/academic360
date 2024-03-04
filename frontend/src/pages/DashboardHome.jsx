import React, { useEffect, useState } from 'react'
import Loading from '../components/common/Loading'
import SubjectDisplay from '../components/SubjectDisplay';
import StudentList from '../components/filter-marksheets/StudentList';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import DisplayStats from '../components/dashboard-home/display-stats/DisplayStats';
import DisplaySubjects from '../components/dashboard-home/display-subjects/DisplaySubjects';
import BarChartContent from '../components/dashboard-home/display-stats/BarChartContent';
import PieChartContent from '../components/dashboard-home/display-stats/PieChartContent';
import LineChartContent from '../components/dashboard-home/display-stats/LineChartContent';
import { useAuth } from '../hooks/useAuth';
import { getMarksheetsStatsByYearWise, getPassingPercentageStats, getTotalMarksheetStats } from '../app/api/marksheetApi';

const DashboardHome = () => {

    const [loading, setLoading] = useState(false);

    const [totalStats, setTotalStats] = useState([]);
    const [percentageStats, setPercentageStats] = useState([]);
    const [statsbyYear, setStatsByYear] = useState([]);

    const [filterStudents, setFilterStudents] = useState({
        stream: 'bcom',
        course: 'honours',
        semester: 1,
        year: 2023
    });

    const [subjectList, setSubjectList] = useState([]);


    const { user } = useAuth();

    // Fetch the stats from the db
    useEffect(() => {


        // if (authToken) {
        //   const fetchStats = async () => {
        //     const res = await fetch(`${host}/api/marksheet/stats`, {
        //       method: 'GET',
        //       headers: {
        //         'auth-token': authToken
        //       }
        //     });
        //     if (!res.ok) {
        //       Swal.fire({
        //         title: 'Alert',
        //         text: 'Internal Server Error!',
        //         icon: 'error', // Options: 'success', 'error', 'warning', 'info'
        //       });
        //     }
        //     return await res.json();
        //   }


        //   fetchStats().then((jsonData) => {
        //     if (jsonData) {
        //       setStats(jsonData)
        //       localStorage.setItem('totalMarksheets', JSON.stringify(jsonData.totalMarksheets));
        //       localStorage.setItem('bcom', JSON.stringify(jsonData.bcom));
        //       localStorage.setItem('ba', JSON.stringify(jsonData.ba));
        //       localStorage.setItem('bsc', JSON.stringify(jsonData.bsc));
        //       localStorage.setItem('bsc', JSON.stringify(jsonData.bsc));
        //       localStorage.setItem('bba', JSON.stringify(jsonData.bba));
        //       localStorage.setItem('ma', JSON.stringify(jsonData["m.a"]));
        //       localStorage.setItem('mcom', JSON.stringify(jsonData["m.com"]));
        //     }
        //   }).catch((error) => {
        //     console.error(error);
        //   })
        // }
    }, []);

    // Fetch the subject list from the db
    //   useEffect(() => {
    //     const fetchSubjects = async () => {
    //       const res = await fetch(`${host}/api/subjects/fetch-all`, {
    //         method: 'GET',
    //         headers: {
    //           'auth-token': authToken
    //         }
    //       });
    //       if (!res.ok) {
    //         Swal.fire({
    //           title: 'Alert',
    //           text: 'Internal Server Error!',
    //           icon: 'error', // Options: 'success', 'error', 'warning', 'info'
    //         });
    //       }
    //       return await res.json();
    //     }


    //     fetchSubjects().then((subjectsObj) => {
    //       if (subjectsObj == undefined) { return; }
    //       // console.log(subjectsObj)
    //       localStorage.setItem('subjectObj', JSON.stringify(subjectsObj));

    //       let subjectList = [];
    //       let keys = [];
    //       let k;
    //       let count = 0;
    //       for (let course in subjectsObj[0]) {
    //         let i = 0;
    //         if (course.toLowerCase() === 'bcom' || course.toLowerCase() === 'ba' || course.toLowerCase() === 'bsc') {
    //           // let count = 0;
    //           for (let sem in subjectsObj[0][course]) {
    //             count += 1;
    //             // k = Math.random
    //             if (i > 0) {
    //               // console.log(sem, subjectsObj[0][course][sem].common, subjectsObj[0][course][sem].honours, subjectsObj[0][course][sem].general, subjectsObj[0][course][sem].elective)
    //               subjectList.push(
    //                 <SubjectDisplay
    //                   key={count}
    //                   course={''}
    //                   sem={sem}
    //                   common={subjectsObj[0][course][sem].common}
    //                   honours={subjectsObj[0][course][sem].honours}
    //                   general={subjectsObj[0][course][sem].general}
    //                   elective={subjectsObj[0][course][sem].elective}
    //                 />
    //               )
    //             }
    //             else {
    //               subjectList.push(
    //                 <SubjectDisplay
    //                   key={count}
    //                   i={i}
    //                   course={course}
    //                   sem={sem}
    //                   common={subjectsObj[0][course][sem].common}
    //                   honours={subjectsObj[0][course][sem].honours}
    //                   general={subjectsObj[0][course][sem].general}
    //                   elective={subjectsObj[0][course][sem].elective}
    //                 />
    //               )
    //             }

    //             // console.log(element)
    //             i += 1;
    //           }
    //         }


    //       }
    //       // console.log(element)
    //       setSubjectList(subjectList);
    //     }).catch((error) => {
    //       console.error(error);
    //     })

    //     // console.log(subjectList)

    //   }, []);

    const fetchPassingStats = async () => {
        const { data } = await getPassingPercentageStats();
        console.log("percentage", data.payload);
        setPercentageStats(data.payload);
    }

    const fetchStatsByYear = async () => {
        const { data } = await getMarksheetsStatsByYearWise();
        console.log("msby", data.payload);
        setStatsByYear(data.payload);
    }

    useEffect(() => {
        fetchPassingStats();
    }, [percentageStats]);

    useEffect(() => {
        fetchStatsByYear();
    }, []);

    useEffect(() => {
        fetchTotalStats();
    }, []);

    const fetchTotalStats = async () => {
        const { data } = await getTotalMarksheetStats();
        const tmp = data.payload;
        const statsArr = [
            { label: 'Total', value: tmp.total, bgColor: 'bg-red-500' },
            { label: 'BA', value: tmp.ba, bgColor: 'bg-blue-500' },
            { label: 'BCOM', value: tmp.bcom, bgColor: 'bg-yellow-500' },
            { label: 'BSC', value: tmp.bsc, bgColor: 'bg-green-500' },
            { label: 'BBA', value: tmp.bsc, bgColor: 'bg-fuchsia-500' },
            { label: 'M.A', value: tmp.ma, bgColor: 'bg-orange-500' },
            { label: 'M.COM', value: tmp.mcom, bgColor: 'bg-[#4b7878]' },
        ];
        console.log(statsArr)
        setTotalStats(statsArr);
    }


    const downloadExcel = (data, filename) => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
        XLSX.writeFile(wb, filename);
    };

    const handleDownload = (data) => {
        // console.log(data)
        downloadExcel(data, `${filterStudents.year}-${filterStudents.stream.toUpperCase()}-${filterStudents.semester}-${filterStudents.course}.xlsx`);
    }



    const handleSubjectDisplay = () => {
        // console.log('fired');
        document.getElementById('list-container').classList.toggle('hidden');
    }




    return (
        <div id='dashboard-home' className='text-black m-2 flex flex-col gap-5'>
            {/* Display all the stats */}
            <DisplayStats totalStats={totalStats} />
            <div className='flex'>
               {statsbyYear.length!==0 ? <BarChartContent statsbyYearArr={statsbyYear} /> : ''}
                <PieChartContent totalStats={totalStats} />

            </div>
            <div className='flex'>
                {/* Accounts Info */}
                <div className='border w-full'>
                    <div className="w-full h-1/2 flex gap-2">
                        {/* Total Info */}
                        <div className="bg-red-500 flex w-1/3 rounded-md flex-col items-center justify-center text-white">
                            <p className='text-xl'>7</p>
                            <p>Total</p>
                        </div>
                        {/* Admin Info */}
                        <div className="bg-blue-500 flex w-1/3 rounded-md flex-col items-center justify-center text-white">
                            <p className='text-xl'>3</p>
                            <p>Admin</p>
                        </div>
                        {/* User Info */}
                        <div className="bg-green-500 flex w-1/3 rounded-md flex-col items-center justify-center text-white">
                            <p className='text-xl'>4</p>
                            <p>User</p>
                        </div>
                    </div>
                    <div>
                        {/* Dcouments Available */}

                    </div>

                </div>
                {/* Percentage Passing year wise */}
                {percentageStats.length !==0 ? <LineChartContent percentageStats={percentageStats} /> : ''}

            </div>

            {/* Display all the subjects */}
            {/* <DisplaySubjects subjectList={subjectList} /> */}


        </div>
    )
}

export default DashboardHome
