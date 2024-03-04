import React, { useEffect, useState } from 'react'
import StatsCard from './StatsCard';
import { useAuth } from '../../../hooks/useAuth';
import { getTotalMarksheetStats } from '../../../app/api/marksheetApi';

const DisplayStats = ({ totalStats = [] }) => {

    return (
        <div id="display-stats" className='w-full flex flex-col sm:flex-row gap-2  '>
            {
                totalStats && totalStats?.length !== 0 && totalStats?.map((stats, index) => (
                    <StatsCard key={`stats-card-${index}`} stats={stats} />
                ))
            }
        </div>
    )
}

export default DisplayStats