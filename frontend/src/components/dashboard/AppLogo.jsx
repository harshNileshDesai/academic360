import React, { useEffect, useState } from 'react'
import appLogo from '../../assets/app_logo.png'

const AppLogo = () => {

    return (
        <div className='flex justify-center items-center'>
            <div id="logo-container" className='bg-white text-black py-3 m-1 rounded-xl w-[75%]'>
                <div id='logo' className='flex justify-center'>
                    {/* {profile ? <img src={profile} alt="app-profile" className='h-[30%] w-[30%]' /> : ''} */}
                </div>
                <div id='app-name' className='flex justify-center my-3 text-[18px] font-medium w-full'><span className='block'>Academic 360</span></div>
            </div>
        </div>
    )
}

export default AppLogo