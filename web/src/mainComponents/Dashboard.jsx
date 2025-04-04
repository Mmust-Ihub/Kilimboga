import { useEffect, useState } from 'react'
import { GrMoney, GrCart } from "react-icons/gr";
import { FaArrowTrendUp } from "react-icons/fa6";
import toast, { Toaster } from 'react-hot-toast';
import { BarChart } from '@mui/x-charts/BarChart';
import { LuCrown } from "react-icons/lu";
import Navbar from './Navbar.jsx'
import Database from '../js/db.js';

const db = new Database()

function App() {
  const [vendorStats, setVendorStats] = useState({
    bestSellingProducts: [],
    currentMonthOrders: 0,
    deliveredOrders: 0,
    monthlyOrders: [],
    monthlyRevenue: [],
    pendingOrders: 0,
    percentageChange: "0.00",
    previousMonthOrders: 0,
    totalRevenue: 0,
  })
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')))

  let barData = Array.from({length:12}, () => 0)
  vendorStats.monthlyRevenue.length > 0 && vendorStats.monthlyRevenue.forEach((item) => {
    barData[item._id - 1] = item.totalRevenue
  })

  useEffect(()=>{
    let response
    async function getData(){
      response = await db.vendorStats(token)
    }
    getData().then(()=>{
      if(!response.status){
        toast.error(response.message)
      }
  
      setVendorStats(response.data)
    })
  },[])

  return (
    <>
      <Navbar user={'user'} />
      <div className='mx-8 lg:mx-25'>

        <h1 className='text-2xl font-bold text-center lg:text-left'>Your total revenue</h1>
        <h1 className='text-5xl font-extrabold mb-8 text-green-600 text-center lg:text-left'>{vendorStats.totalRevenue}</h1>

        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 rounded shadow-lg ring-1 ring-gray-300'>

          <div className="px-6 py-3 lg:py-5 border-b-1 lg:border-r-1 border-gray-300 flex flex-col justify-between">
            <div className='my-2 text-2xl w-max rounded-3xl border-gray-300 flex items-center'>
              < GrMoney />
              <p className='text-xl font-semibold ml-3'>Orders</p>
            </div>
            <div>
              <div className='w-full flex justify-between items-end mt-5'>
                <h1 className='text-2xl font-bold'>{vendorStats.currentMonthOrders}</h1>
                <div className='flex flex-row justify-center items-center text-base text-green-600'>
                  <FaArrowTrendUp />
                  <p className='ml-2'>{vendorStats.percentageChange} %</p>
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
                <h1 className='text-2xl font-bold'>{vendorStats.bestSellingProducts.length > 0 ? vendorStats.bestSellingProducts.length[0].productName : 0}</h1>
              </div>
            </div>
            <p className='text-sm text-gray-400 mt-2'>{vendorStats.bestSellingProducts.length > 0 ? vendorStats.bestSellingProducts.length[0].totalSold : 0} items sold</p>
          </div>

          <div className="px-6 lg:px-2 py-3 lg:py-5 border-b-1 lg:border-r-1 border-gray-300 flex flex-col justify-between">
            <div className='my-2 text-2xl w-max rounded-3xl border-gray-300 flex items-center'>
              <LuCrown />
              <p className='text-xl font-semibold ml-3'>Delivered Orders</p>
            </div>
            <div>
              <div className='w-full flex justify-between items-end mt-5'>
                <h1 className='text-2xl font-bold'>{vendorStats.deliveredOrders}</h1>
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
            series={[{ data: barData }]}
            // width={500}
            height={500}
            grid={{ vertical: true, horizontal: true }}
          />
        </div>
      </div>
      <Toaster />
    </>
   
  )
}

export default App

