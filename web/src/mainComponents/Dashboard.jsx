import { useEffect, useState } from 'react'
import { GrMoney } from "react-icons/gr";
import toast, { Toaster } from 'react-hot-toast';
import { LuCrown } from "react-icons/lu";
import { FaChevronRight } from "react-icons/fa";
import {ComposedChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer,PieChart,Pie} from 'recharts';
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
  const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('token')))

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
  let barData = Array.from({length:12}, () => 0)
  vendorStats.monthlyRevenue.length > 0 && vendorStats.monthlyRevenue.forEach((item, index) => {
    barData[item._id - 1] = {name: months[index], sales: item.totalRevenue}
  })

  const bestSellersData = []
  vendorStats.bestSellingProducts.length > 0 && vendorStats.bestSellingProducts.forEach((item, index) => {
    bestSellersData[index] = {
      name: item.productName,
      population: item.totalSold,
      fill: "#8884d8",
    }
  })

  useEffect(()=>{
    async function getData(){
      let response = await db.vendorStats(token)
      if(!response.status){
        toast.error(response.message)
      }
      setVendorStats(response.data)
    }
    toast.promise(getData(), {
      loading: 'Fetching data...',
      success: 'Data fetched successfully',
      error: 'Error when fetching data',
    });
  },[])

  return (
    <>
        <Navbar>
          <div className='mx-10 mt-5 pb-10'>
              <h1 className='text-xl font-bold text-center lg:text-left'>Your total revenue</h1>
              <h1 className='text-3xl font-extrabold mb-5 text-green-600 text-center lg:text-left'>{vendorStats.totalRevenue}</h1>

              <div className='w-full grid grid-cols-3 gap-4'>
                  <div className="pt-1 shadow-xl ring-1 ring-gray-200 rounded flex flex-col justify-between">
                      <div className='flex items-start justify-between mx-6 mt-5'>
                          <div className='text-xl w-max rounded p-3 bg-green-900 text-white border-1 border-gray-300 flex items-center'>
                            < GrMoney />
                          </div>
                          <div className='w-full flex flex-col justify-between items-end'>
                              <p className='text-sm font-semibold ml-3 text-gray-500'>Month Orders</p>
                              <h1 className='text-2xl font-bold'>{vendorStats.currentMonthOrders}</h1>
                          </div>
                      </div>
                      <div className='rounded bg-gray-300 w-full flex py-3 px-6 justify-between items-center mt-5'>
                          <div className='flex items-center'>
                              <h1 className='text-xs text-green-800'>{vendorStats.percentageChange} %</h1>
                              <h1 className='text-xs ml-2 font-semibold'>Last Month</h1>
                          </div>
                          <div className='flex items-center justify-center rounded-3xl p-1 bg-green-900 text-white text-xs cursor-pointer'>
                              <FaChevronRight />
                          </div>
                      </div>
                  </div>

                  <div className="pt-1 shadow-xl ring-1 ring-gray-200 rounded flex flex-col justify-between">
                      <div className='flex items-start justify-between mx-6 mt-5'>
                          <div className='text-xl w-max rounded p-3 bg-green-900 text-white border-1 border-gray-300 flex items-center'>
                              <LuCrown />
                          </div>
                          <div className='w-full flex flex-col justify-between items-end'>
                              <p className='text-sm font-semibold ml-3 text-gray-500'>Best Seller</p>
                              <h1 className='text-2xl font-bold'>{vendorStats.bestSellingProducts.length > 0 ? vendorStats.bestSellingProducts.length[0].productName : "-"}</h1>
                          </div>
                      </div>
                      <div className='rounded bg-gray-300 w-full flex py-3 px-6 justify-between items-center mt-5'>
                          <div className='flex items-center'>
                              {/* <h1 className='text-xs text-green-800'>200%</h1> */}
                              <h1 className='text-xs ml-2 font-semibold'>{vendorStats.bestSellingProducts.length > 0 ? vendorStats.bestSellingProducts.length[0].totalSold : 0} items sold</h1>
                          </div>
                          <div className='flex items-center justify-center rounded-3xl p-1 bg-green-900 text-white text-xs cursor-pointer'>
                              <FaChevronRight />
                          </div>
                      </div>
                  </div>

                  <div className="pt-1 shadow-xl ring-1 ring-gray-200 rounded flex flex-col justify-between">
                      <div className='flex items-start justify-between mx-6 mt-5'>
                          <div className='text-xl w-max rounded p-3 bg-green-900 text-white border-1 border-gray-300 flex items-center'>
                              <LuCrown />
                          </div>
                          <div className='w-full flex flex-col justify-between items-end'>
                              <p className='text-sm font-semibold ml-3 text-gray-500'>Delivered Orders</p>
                              <h1 className='text-2xl font-bold'>{vendorStats.deliveredOrders}</h1>
                          </div>
                      </div>
                      <div className='rounded bg-gray-300 w-full flex py-3 px-6 justify-between items-center mt-5'>
                          <div className='flex items-center'>
                              <h1 className='text-xs text-green-800'>200%</h1>
                              <h1 className='text-xs ml-2 font-semibold'>Last Month</h1>
                          </div>
                          <div className='flex items-center justify-center rounded-3xl p-1 bg-green-900 text-white text-xs cursor-pointer'>
                              <FaChevronRight />
                          </div>
                      </div>
                  </div>
                  
              </div>

              <div className='flex items-start justify-between w-full mt-10'>
                    <div className='shadow-xl ring-1 ring-gray-200 rounded w-4/6'>
                        <h1 className='text-base font-semibold mt-0 mb-0 border-b-1 border-gray-200 px-5 pt-3 pb-3'>Sales overview</h1>

                        <div className='pt-5'>
                            <ResponsiveContainer width="100%" height={450}>
                                <ComposedChart
                                data={barData}
                                margin={{
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                }}
                                >
                                    <CartesianGrid 
                                        strokeDasharray="3 3" 
                                        stroke="#e0e0e0"
                                        vertical={false}  // Hide vertical grid lines
                                    />
                                    <XAxis 
                                        dataKey="name"
                                        tick={{ 
                                            fontSize: 12,
                                            fontFamily: 'Arial',
                                            fill: '#555'
                                        }}
                                        axisLine={{ stroke: '#ccc', strokeWidth: 1 }}
                                        tickMargin={10}  // Space between ticks and axis line
                                        padding={{ left: 20, right: 20 }}  // Padding for first/last bars
                                    />
                                <YAxis 
                                        tick={{ 
                                        fontSize: 11,
                                        fontFamily: 'Arial',
                                        fill: '#666'
                                        }}
                                        axisLine={{ stroke: '#ccc', strokeWidth: 1 }}
                                        tickMargin={10}
                                    />
                                    <Tooltip contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                        fontFamily: 'Arial'
                                    }}/>
                                    <Legend wrapperStyle={{
                                        paddingTop: '20px',
                                        paddingBottom: '20px',
                                        fontSize: '13px',
                                        fontFamily: 'Arial'
                                    }}/>
                                    <Bar 
                                        dataKey="sales" barSize={70} fill="#413ea0" name="Total Sales" radius={[4, 4, 0, 0]} isAnimationActive={true} animationDuration={1500} />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className='shadow-xl ring-1 ring-gray-200 rounded w-2/6 ml-4'>
                        <h1 className='text-base font-semibold mt-0 mb-0 border-b-1 border-gray-200 px-5 pt-3 pb-3'>Best sellers</h1>
                        <div className="pt-5">
                        <ResponsiveContainer width="100%" height={450}>
                            <PieChart>
                                <Legend wrapperStyle={{
                                        paddingTop: '20px',
                                        paddingBottom: '20px',
                                        fontSize: '13px',
                                        fontFamily: 'Arial'
                                }}/>
                                <Tooltip contentStyle={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                    fontFamily: 'Arial',
                                    cursor: 'pointer'
                                }}/>
                                <Pie data={bestSellersData} dataKey="population" nameKey="name" cx="50%" cy="50%" outerRadius={180} fill="#8884d8" />
                            </PieChart>
                        </ResponsiveContainer>
                        </div>
                    </div>
              </div>
          </div>
        </Navbar>
        <Toaster />
    </>
   
  )
}

export default App

