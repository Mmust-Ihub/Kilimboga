import { useState } from 'react'
import { GrMoney, GrCart } from "react-icons/gr";
import { FaArrowTrendUp } from "react-icons/fa6";
import { BarChart } from '@mui/x-charts/BarChart';
import { LuCrown } from "react-icons/lu";
import Navbar from './Navbar.jsx'

function App() {

  return (
    <>
      <Navbar />
      <div className='mx-8 lg:mx-25'>

        <h1 className='text-2xl font-bold text-center lg:text-left'>Your total revenue</h1>
        <h1 className='text-5xl font-extrabold mb-8 text-green-600 text-center lg:text-left'>20,000</h1>

        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 rounded shadow-lg ring-1 ring-gray-300'>

          <div className="px-6 py-3 lg:py-5 border-b-1 lg:border-r-1 border-gray-300 flex flex-col justify-between">
            <div className='my-2 text-2xl w-max rounded-3xl border-gray-300 flex items-center'>
              < GrMoney />
              <p className='text-xl font-semibold ml-3'>Orders</p>
            </div>
            <div>
              <div className='w-full flex justify-between items-end mt-5'>
                <h1 className='text-2xl font-bold'>200</h1>
                <div className='flex flex-row justify-center items-center text-base text-green-600'>
                  <FaArrowTrendUp />
                  <p className='ml-2'>200%</p>
                </div>
              </div>
              <p className='text-sm text-gray-400 mt-2'>Compared to last month</p>
            </div>
           
          </div>

          <div className="px-6 lg:px-2 py-3 lg:py-5 border-b-1 lg:border-r-1 border-gray-300 flex flex-col justify-between">
            <div className='my-2 text-2xl w-max rounded-3xl border-gray-300 flex items-center'>
              <GrCart />
              <p className='text-xl font-semibold ml-3'>Products</p>
            </div>
            <div>
              <div className='w-full flex justify-between items-end mt-5'>
                <h1 className='text-2xl font-bold'>200</h1>
              </div>
            </div>
            <p className='text-sm text-gray-400 mt-2'>Total products</p>
          </div>

          <div className="px-6 lg:px-2 py-3 lg:py-5 border-b-1 lg:border-r-1 border-gray-300 flex flex-col justify-between">
            <div className='my-2 text-2xl w-max rounded-3xl border-gray-300 flex items-center'>
              <LuCrown />
              <p className='text-xl font-semibold ml-3'>Best seller</p>
            </div>
            <div>
              <div className='w-full flex justify-between items-end mt-5'>
                <h1 className='text-2xl font-bold'>Tomatoes</h1>
              </div>
            </div>
            <p className='text-sm text-gray-400 mt-2'>Most sold product</p>
          </div>

          <div className="px-6 lg:px-2 py-3 lg:py-5 border-b-1 lg:border-r-1 border-gray-300 flex flex-col justify-between">
            <div className='my-2 text-2xl w-max rounded-3xl border-gray-300 flex items-center'>
              <LuCrown />
              <p className='text-xl font-semibold ml-3'>Delivered Orders</p>
            </div>
            <div>
              <div className='w-full flex justify-between items-end mt-5'>
                <h1 className='text-2xl font-bold'>300</h1>
              </div>
            </div>
            <p className='text-sm text-gray-400 mt-2'>Successful deliveries</p>
          </div>
          
        </div>
        <h1 className='text-lg font-semibold mt-5'>Sales overview</h1>
        <div className='w-full shadow-xl ring-1 ring-gray-400 mt-5 rounded mb-10 lg:mb-0'>
          <BarChart
            xAxis={[{ 
              scaleType: 'band', 
              data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
              colorMap: {
                type: 'ordinal',
                colors: ['green']
              }
              }]}
            series={[{ data: [2, 5, 2, 8, 1, 5, 2, 5, 2, 8, 1, 5] }]}
            // width={500}
            height={500}
            grid={{ vertical: true, horizontal: true }}
          />
        </div>
      </div>
    </>
   
  )
}

export default App

