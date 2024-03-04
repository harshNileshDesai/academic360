import React from 'react'

const DisplaySubjects = ({subjectList}) => {
    return (
        <div id="display-subjects" className='pt-7 '>
            <div className='w-full flex justify-between border p-2 items-center'>
                <h3 className='text-2xl font-semibold '>Subject List</h3>
                <div>
                    <button onClick={handleSubjectDisplay} className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md'>View</button>
                </div>
            </div>

            <div className='w-full overflow-x-auto hidden transition-all' id='list-container' >
                {subjectList}
            </div>
        </div>
    )
}

export default DisplaySubjects