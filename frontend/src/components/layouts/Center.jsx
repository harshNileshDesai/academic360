import React from 'react'

/**
 * Center component is a simple container that centers its children
 * both horizontally and vertically within the full width and height.
 *
 * @param {Object} props - The properties of the Center component.
 * @param {ReactNode} props.children - The content to be centered.
 * @returns {JSX.Element} The rendered Center component.
 */
const Center = ({ children }) => {
  return (
    <div className="flex justify-center items-center w-full h-full">
        {children}
    </div>
  )
}

export default Center