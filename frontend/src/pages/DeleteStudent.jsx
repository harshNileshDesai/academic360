import React, { useEffect, useState } from 'react'
import Loading from '../components/common/Loading';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DashboardHeading from '../components/common/DashboardHeading';
import ButtonSubmit from '../components/form-controls/ButtonSubmit';

const DeleteStudent = () => {

  let navigate = useNavigate();



  const handleDelete = async () => {
    let obj = {
      rollNo: document.getElementById('rollNo').value,
      semester: Number(document.getElementById('semester').value),
      year: document.getElementById('year').value,
    }
    // console.log(obj);

    if (obj.rollNo === '' || obj.semester === '' || obj.year === '') {
      Swal.fire({
        title: 'Alert',
        text: 'Please enter valid fields...!',
        icon: 'warning', // Options: 'success', 'error', 'warning', 'info'
      });
      return;
    }
    setLoading(true);
    // const res = await fetch(`${host}/api/marksheet/delete`, {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'auth-token': localStorage.getItem('auth-token')
    //   },
    //   body: JSON.stringify(obj)
    // });
    // const data = await res.json();
    setLoading(false);
    // console.log(data);
    if (data?.message) {
      Swal.fire({
        title: 'Alert',
        text: data?.message,
        icon: 'info', // Options: 'success', 'error', 'warning', 'info'
      });
    }
    else {
      Swal.fire({
        title: 'Alert',
        text: "Given marksheet data not found!",
        icon: 'info', // Options: 'success', 'error', 'warning', 'info'
      });
    }

  }



  return (
    <>
      <div id="delete-student" className='my-3 '>
        {/* PAGE HEADING */}
        <DashboardHeading heading={'Delete Students'} />

        {/* DELETE CONTAINER */}
        <div className='w-full  my-3 '>
          <form className="rows w-full my-3 " onSubmit={handleDelete}>
            <div className="row flex flex-col lg:flex-row gap-7 ">
              <div id="rollno-field" className='flex gap-3 w-full lg:w-auto my-1 flex-col'>
                <div className=''>
                  <label htmlFor="roll_no">Roll No.</label>
                </div>
                <div>
                  <input type="text" name="rollNo" id="rollNo" className='border outline-none w-full lg:w-auto border-slate-300 px-4 py-1 rounded-md' />
                </div>
              </div>

              <div id="semester-field" className='flex gap-3 flex-col my-1 w-full lg:w-auto '>
                <div className=''>
                  <label htmlFor="semester">Semester</label>
                </div>
                <div>
                  <input type="number" name="semester" id="semester" className='border outline-none w-full lg:w-auto border-slate-300 px-4 py-1 rounded-md' />
                </div>
              </div>
              <div id="year-field" className='flex gap-3 flex-col my-1  w-full lg:w-auto'>
                <div className=''>
                  <label htmlFor="year">Year</label>
                </div>
                <div>
                  <input type="number" name="year" id="year" className='border outline-none w-full lg:w-auto border-slate-300 px-4 py-1 rounded-md' />
                </div>
              </div>
            </div>
            <div className='row my-3 '>
              <ButtonSubmit buttonText='Delete' bgColor='bg-red' />
            </div>

          </form>
        </div>
      </div>
    </>
  )
}

export default DeleteStudent
