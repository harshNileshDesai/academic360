import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart'

const PieChartContent = ({ totalStats }) => {

    // Piechart data
    const data = [
        { id: 0, value: 78, label: 'BA', color: "#f97315" },
        { id: 1, value: 89, label: 'BSC', color: "#21c65f" },
        { id: 2, value: 67, label: 'BCOM', color: "#3b82f6" },
        { id: 3, value: 86, label: 'MA', color: "#a855f7" },
        { id: 4, value: 65, label: 'MCOM', color: "#64748b" },
    ];


    return (
        <div className='flex flex-col items-center justify-center border'>
            <PieChart
                series={[{ data }]}
                width={400}
                height={200}
            />
            <p className='text-center'>Fig. Overall Passing %</p>
        </div>
    )
}

export default PieChartContent