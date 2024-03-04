import React from 'react'

const DashboardHeading = ({heading}) => {
    return (
        <>
            <div id="add-students" className='my-3 py-5 '>
                <div id='heading'>
                    <h1 className='text-3xl font-semibold border-b-2 border-b-blue-600 py-2 '>{heading}</h1>
                </div>
            </div>
        </>
    )
}

export default DashboardHeading