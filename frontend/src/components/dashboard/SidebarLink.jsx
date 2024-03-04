import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const SidebarLink = ({link}) => {

    const location = useLocation();

    return (
        <li className={`m-1 hover:text-[#00ffff] ${location.pathname.endsWith(link.path) ? 'active' : ''}`}>
            <Link to={link.path} className='text-[18px] flex items-center gap-2 font-medium'>
                {link.icon}
                <span>{link.label}</span>
            </Link>
        </li>
    )
}

export default SidebarLink