import React from 'react'

/**
 * Container component serves as a simple wrapper for content,
 * providing a full-width and full-height container.
 *
 * @param {Object} props - The properties of the Container component.
 * @param {ReactNode} props.children - The content to be rendered inside the container.
 * @returns {JSX.Element} The rendered Container component.
 */
const Container = ({ children }) => {
  return (
    <div className='w-full h-screen text-slate-600 text-[14px] overflow-hidden'>
        {children}
    </div>
  )
}

export default Container