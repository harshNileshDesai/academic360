import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';

import Container from '../components/layouts/Container'
import Navbar from '../components/common/Navbar'
import AppLogo from '../components/dashboard/AppLogo'
import SidebarLinks from '../components/dashboard/SidebarLinks'

import Loading from '../components/common/Loading'
import { useSelector } from 'react-redux';


const Dashboard = () => {

  const loading = useSelector((state)=> state.loading.loading);

  // const { user } = useAuth();

  return (
    <>
      {/* LOADING BAR */}
      {loading && <Loading /> }

      {/* DASHBOARD AREA */}
      <Container>
        <Navbar />
        <div id="dashboard-container" className='w-full flex '>
          {/* Left part */}
          <div id='left' className="left bg-slate-700 text-white top-0 transition-all bottom-0 md:h-full w-3/4 -translate-x-[1000px] md:translate-x-[0px] md:w-[20%] lg:w-[17%] px-1 py-7 absolute md:relative">
            <AppLogo />
            <SidebarLinks />
          </div>
          {/* Right part */}
          <div className="right h-full w-full md:w-[80%] lg:w-[83%] overflow-y-auto  px-4 ">
            <Outlet />
          </div>
        </div>
      </Container>
    </>
  )
}

export default Dashboard

  // window.addEventListener('resize', (e) => {
  //   const left = document.getElementById('left');
  //   if (window.innerWidth > 767 && left !== null) {
  //     left.classList.remove('top-[63px]');
  //     left.classList.add('top-0');
  //   }
  // })


{/* <div id="navbar" className='w-full shadow-md p-2 border flex justify-between items-center'>
          <div className="left flex">
           
          
            <div id="hmbrg" className='block md:hidden' onClick={handleHmbrg}>
              <div id="bar1" className='w-7 h-1 bg-purple-700 rounded-md transition-all'></div>
              <div id="bar2" className='w-7 h-1 bg-purple-700 rounded-md my-1 '></div>
              <div id="bar3" className='w-7 h-1 bg-purple-700 rounded-md transition-all '></div>
            </div>
            <div className='block md:hidden'>
              <span className='mx-2 text-purple-700 font-medium'>Academic 360</span>
            </div>

           
            
            <div className='hidden md:block'>
              <span className='text-xl text-purple-600 font-medium'>{localStorage.getItem('name')}</span>
            </div>
          </div>
          <div className="right cursor-pointer " onClick={handleProfile}>
            
          
            <img src={localStorage.getItem('picture')} alt="img" className='border rounded-full h-12 w-12' />

           
            
            <div id='popup-menu' className='absolute z-10 right-2 md:top-[70px] border shadow-lg bg-white text-black w-40 h-20 hidden flex-column justify-center items-center '>
              <Link to={"settings"} className='flex gap-1 items-center'>
                <FiSettings />
                <span>Settings</span>
              </Link>
            </div>
          </div>
        </div> */}