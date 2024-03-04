import React from 'react'

import { AiOutlineSearch } from 'react-icons/ai'
import { RiDeleteBinLine, RiLogoutBoxLine } from 'react-icons/ri'
import { RxDashboard } from 'react-icons/rx'
import { TbReportSearch } from 'react-icons/tb'
import { VscAdd } from 'react-icons/vsc'
import { CiFilter } from "react-icons/ci";

import SidebarLink from './SidebarLink'

const SidebarLinks = () => {

    const links = [
        { path: '/dashboard', label: 'Dashboard', icon: <RxDashboard /> },
        { path: 'filter-marksheets', label: 'Filter Students', icon: <CiFilter /> },
        { path: 'add', label: 'Add Student', icon: <VscAdd /> },
        { path: 'delete', label: 'Delete Student', icon: <RiDeleteBinLine /> },
        { path: 'search', label: 'Search Student', icon: <AiOutlineSearch /> },
        { path: 'get-reports', label: 'Get Reports', icon: <TbReportSearch /> },
        { path: 'logout', label: 'Logout', icon: <RiLogoutBoxLine /> }
    ];

    return (
        <div className='flex justify-center mt-32'>

            <ul className=' flex flex-col'>
                {
                    links.map((link, index) => (
                        <SidebarLink key={`sidebar-${index}`} link={link} />
                    ))
                }
            </ul>
        </div>
    )
}

export default SidebarLinks
