import React, { useEffect, useState } from 'react'

const Navbar = () => {

    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('picture')));

    return (
        <nav id="navbar" className='w-full shadow-md p-2 border flex justify-between items-center border-red-500'>
            <div className="left flex">
                <span className='text-slate-600 font-semibold'>academic360</span>
            </div>
            <div className="right cursor-pointer " >
               <img src={profile} alt="profile" className='border border-slate-500 rounded-full w-8 h-8' />
            </div>
        </nav>
    )
}

export default Navbar