import { LineChart } from '@mui/x-charts'
import React, { useEffect, useState } from 'react'

const LineChartContent = ({ percentageStats = [] }) => {

  const [yearLabels, setYearLabel] = useState([]);
  const [baData, setBaData] = useState([])
  const [bscData, setBscData] = useState([])
  const [bcomData, setBcomData] = useState([]);
  const [bbaData, setBbaData] = useState([])
  const [maData, setMaData] = useState([])
  const [mcomData, setMcomData] = useState([])

  useEffect(() => {
    const tmpYearArr = [];
    for (let y = (new Date()).getFullYear() - 8; y <= (new Date()).getFullYear(); y++) {
      tmpYearArr.push(y.toString());
    }
    setYearLabel(tmpYearArr);

    const ba = [];
    const bsc = [];
    const bcom = [];
    const bba = [];
    const ma = [];
    const mcom = [];
    for (let y = (new Date()).getFullYear() - 8; y <= (new Date()).getFullYear(); y++) {
      let obj = percentageStats.find(ele => ele.year === y);
      console.log("in loop:", obj)
      if (!obj) {
        ba.push(0);
        bsc.push(0);
        bcom.push(0);
        bba.push(0);
        ma.push(0);
        mcom.push(0);
        continue;
      }
      ba.push(obj.ba);
      bsc.push(obj.bsc);
      bcom.push(obj.bcom);
      bba.push(obj.bba);
      ma.push(obj.ma);
      mcom.push(obj.mcom);
    }

    setBaData(ba);
    setBscData(bsc);
    setBcomData(bcom);
    setBbaData(bba);
    setMaData(ma);
    setMcomData(mcom);

  }, []);

  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  const xLabels = [
    'Page A',
    'Page B',
    'Page C',
    'Page D',
    'Page E',
    'Page F',
    'Page G',
  ];

  return (
    <div>
      <LineChart
        width={500}
        height={300}
        series={[
          { data: baData, label: 'BA' },
          { data: bscData, label: 'BSC' },
          { data: bcomData, label: 'BCOM' },
          { data: bbaData, label: 'BBA' },
          { data: maData, label: 'MA' },
          { data: mcomData, label: 'MCOM' },

        ]}
        xAxis={[{ scaleType: 'point', data: yearLabels }]}
      />
    </div>
  )
}

export default LineChartContent