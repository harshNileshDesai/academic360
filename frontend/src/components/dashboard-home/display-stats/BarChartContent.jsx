import React, { useEffect, useState } from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';

const BarChartContent = ({ statsbyYearArr }) => {
    
    // Barchart
    const chartSetting = {
        yAxis: [
           
        ],
        width: 500,
        height: 300,
        sx: {
            [`.${axisClasses.left} .${axisClasses.label}`]: {
                transform: 'translate(-11px, 0)',
            },
        },
    };

    const [dataset, setDataSet] = useState([]);

    useEffect(() => {
        console.log(statsbyYearArr)
        if (!Array.isArray(statsbyYearArr) || statsbyYearArr.length === 0) {
            return;
        }
    
        console.log("statsbyYearArr:", statsbyYearArr)
        const tmpArr = [];
        for (let y = (new Date()).getFullYear() - 8; y <= (new Date()).getFullYear(); y++) {
            let obj = statsbyYearArr.find(ele => ele.year === y);
            if(!obj) {
                tmpArr.push({
                    ba: 0,
                    bsc: 0,
                    bcom: 0,
                    bba: 0,
                    ma: 0,
                    mcom: 0,
                    year: y.toString(),
                });
            }
            else {
                tmpArr.push({
                    ba: obj.ba || 0,
                    bsc: obj.bsc || 0,
                    bcom: obj.bcom || 0,
                    bba: obj.bba || 0,
                    ma: obj.ma || 0,
                    mcom: obj.mcom || 0,
                    year: y.toString(),
                });
            }
        }
        console.log("tmpArr:", tmpArr);
        setDataSet(tmpArr);
    }, [])

    const valueFormatter = (value, entry) => {
        console.log(value, entry)
        if (entry && entry.dataKey === 'year') {
            return `${value}`; // Return the year without formatting for the BarChart's 'year' dataKey
        }
        return `${value}`;
    };


    return (
        <div className='w-full text-xs md:w-full flex flex-col items-center justify-center border'>
            {dataset.length !==0 && <BarChart
                dataset={dataset}
                xAxis={[{ scaleType: 'band', dataKey: 'year' }]}
                series={[
                    { dataKey: 'ba', label: 'BA', valueFormatter },
                    { dataKey: 'bsc', label: 'BSC', valueFormatter },
                    { dataKey: 'bcom', label: 'BCOM', valueFormatter },
                    { dataKey: 'bba', label: 'BBA', valueFormatter },
                    { dataKey: 'ma', label: 'MA', valueFormatter },
                    { dataKey: 'mcom', label: 'MCOM', valueFormatter },
                ]}
                {...chartSetting}

            />}
        </div>
    )
}

export default BarChartContent