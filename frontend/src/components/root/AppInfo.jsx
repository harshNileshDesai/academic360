import React from 'react'
import { BsFillClipboardDataFill } from 'react-icons/bs'

const AppInfo = () => {
    return (
        <div className='h-1/3 '>
            <h1 className='text-xl font-semibold flex justify-center items-center gap-2 my-1 '>
                <BsFillClipboardDataFill />
                <span>Academic360</span>
            </h1>
            <h2 className='flex gap-7 items-center justify-center'>Fast & Easy Student-Data Management</h2>
        </div>
    )
}

export default AppInfo