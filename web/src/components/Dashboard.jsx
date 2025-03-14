import { useState } from 'react'
import { GrMoney, GrCart } from "react-icons/gr";
import { FaArrowTrendUp } from "react-icons/fa6";
import { LineChart } from '@mui/x-charts/LineChart';
import { LuCrown } from "react-icons/lu";
import Navbar from './Navbar.jsx'

function App() {

  return (
    <>
      <Navbar />
      <div className='mx-48'>
        <div className='grid grid-cols-3 gap-4'>
          <div className="rounded shadow-lg ring-1 ring-gray-400 px-6 py-2">
            <div className='my-2 text-2xl w-max rounded-3xl border-gray-300'>< GrMoney /></div>
            <p className='text-base text-gray-400'>Orders</p>
            <div className='w-full flex justify-between items-end mt-1'>
              <h1 className='text-2xl font-bold'>200</h1>
              <div className='flex flex-row justify-center items-center text-base text-green-600'>
                <FaArrowTrendUp />
                <p className='ml-2'>200%</p>
              </div>
            </div>
          </div>

          <div className="rounded shadow-lg ring-1 ring-gray-400 px-6 py-2">
            <div className='my-2 text-2xl w-max rounded-3xl border-gray-300'><GrCart /></div>
            <p className='text-base text-gray-400'>Products</p>
            <div className='w-full flex justify-between items-end mt-1'>
              <h1 className='text-2xl font-bold'>200</h1>
            </div>
          </div>

          <div className="rounded shadow-lg ring-1 ring-gray-400 px-6 py-2">
            <div className='my-2 text-2xl w-max rounded-3xl border-gray-300'><LuCrown /></div>
            <p className='text-base text-gray-400'>Best seller</p>
            <div className='w-full flex justify-between items-end mt-1'>
              <h1 className='text-2xl font-bold'>FarmUp cabbage</h1>
            </div>
          </div>
          
        </div>
        <h1 className='text-lg font-semibold mt-5'>Sales overview</h1>
        <div className='w-full shadow-xl ring-1 ring-gray-400 mt-5 rounded'>
          <LineChart
            xAxis={[{ 
              data: [1, 2, 3,4, 5, 6, 7, 8, 9, 10, 11, 12],
              colorMap: {
                type: 'piecewise',
                thresholds: [0],
                colors: ['', 'darkGray'],
              }
            }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5, 2, 5.5, 2, 8.5, 1.5, 5],
                area: true,
              },
            ]}
            height={500}
            grid={{ vertical: true, horizontal: true }}
          />
        </div>
      </div>
    </>
   
  )
}

export default App

