import React from 'react'

const StatsCard = ({stats}) => {
    return (
        <div className={`border flex flex-col justify-center items-center h-32 sm:w-[25%] ${stats.bgColor} text-white text-2xl font-medium rounded-md`}>
            <span>{stats.label}</span>
            <span>{stats.value}</span>
        </div>
    )
}

export default StatsCard