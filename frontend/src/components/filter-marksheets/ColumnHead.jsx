import React from 'react'

const ColumnHead = ({ columnName }) => {
  return (
    <li className='p-3 border-r border-black w-[200px] text-center '>{columnName}</li>
  )
}

export default ColumnHead