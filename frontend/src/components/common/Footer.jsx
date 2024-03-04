import React from 'react'

/**
 * Footer component represents the bottom section of the application, typically containing copyright information.
 *
 * @returns {JSX.Element} The rendered Footer component.
 */
const Footer = () => {
  return (
    <div className='text-slate-600 text-xs absolute p-2 w-full bottom-0 left-0 right-0'>
        <p className='text-center'>All Rights Reserved. Last Updated: 16-02-2024</p>
    </div>
  )
}

export default Footer