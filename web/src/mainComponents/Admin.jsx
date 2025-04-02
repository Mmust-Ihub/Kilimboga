import AdminFarmers from '../subComponents/AdminFarmers';
import AdminVendors from '../subComponents/AdminVendors';
import { GrMoney, GrCart } from "react-icons/gr";
import { FaArrowTrendUp, FaShop } from "react-icons/fa6";
import { PiFarmFill } from "react-icons/pi";
import { IoStatsChart } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa";
// import { BarChart } from '@mui/x-charts/BarChart';
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Scatter,
    ResponsiveContainer,
    RadialBarChart,
    RadialBar,
    PieChart,
    Pie
  } from 'recharts';
import { LuCrown } from "react-icons/lu";
import { useState } from 'react';
import { useEffect } from 'react';

function Admin(){
    const [showDashboard, setShowDashboard] = useState(true);
    const [showFarmers, setShowFarmers] = useState(false);
    const [showVendors, setShowVendors] = useState(false);
    const [currentPage, setCurrentPage] = useState('Dashboard');

    function nav(destination){
        switch(destination){
            case 'dashboard':
                setShowDashboard(true);
                setShowFarmers(false);
                setShowVendors(false);
                setCurrentPage('Dashboard');
                break;
            case 'farmers':
                setShowDashboard(false);
                setShowFarmers(true);
                setShowVendors(false);
                setCurrentPage('Farmers');
                break;
            case 'vendors':
                setShowDashboard(false);
                setShowFarmers(false);
                setShowVendors(true);
                setCurrentPage('Vendors');
                break;
            default:
                setShowDashboard(true);
                setShowFarmers(false);
                setShowVendors(false);
                setCurrentPage('Dashboard');
                break;
        }
    }


    const data = [
        { name: 'Jan', sales: 10, userGrowth: 15 },
        { name: 'Feb', sales: 20, userGrowth: 25 },
        { name: 'Mar', sales: 30, userGrowth: 35 },
        { name: 'Apr', sales: 40, userGrowth: 20 },
        { name: 'May', sales: 50, userGrowth: 55 },
        { name: 'Jun', sales: 60, userGrowth: 65 },
        { name: 'Jul', sales: 70, userGrowth: 75 },
        { name: 'Aug', sales: 80, userGrowth: 85 },
        { name: 'Sept', sales: 90, userGrowth: 95 },
        { name: 'Oct', sales: 100, userGrowth: 105 },
        { name: 'Nov', sales: 110, userGrowth: 115 },
        { name: 'Dec', sales: 120, userGrowth: 125 },
      ];

      const usersComposition = [
        {
          "name": "Farmers",
          "population": 100,
          "fill": "#8884d8",
        },
        {
          "name": "Vendos",
          "population": 10,
          "fill": "#82ca9d",
        },
        {
          "name": "Experts",
          "population": 50,
        "fill": "#ffc658",
        },]

    return (
        <div className=' bg-gray-100 flex' style={{height: '100vh'}}>
            <div className='bg-green-900 h-full w-2/12'>
                <h1 className='py-6 px-5 font-bold text-lg text-white text-left border-b-1 border-green-800 w-full'>Kilimboga</h1>
                <h1 className='px-5 mt-4 text-white text-xs'>NAVIGATION</h1>
                <div className='px-3 mx-5 rounded mt-4 text-white text-sm flex items-center justify-between cursor-pointer hover:bg-white hover:text-green-900 py-2' onClick={() => {nav('dashboard')}}>
                    <div className='flex items-center'>
                        <IoStatsChart />
                        <h1 className='ml-2'>View Stats</h1>
                    </div>
                    <FaChevronRight />
                </div>
                <div className='px-3 mx-5 rounded mt-2 text-white text-sm flex items-center justify-between cursor-pointer hover:bg-white hover:text-green-900 py-2' onClick={() => {nav('vendors')}}>
                    <div className='flex items-center'>
                        <FaShop />
                        <h1 className='ml-2'>Manage Vendors</h1>
                    </div>
                    <FaChevronRight />
                </div>
                <div className='px-3 mx-5 rounded mt-2 text-white text-sm flex items-center justify-between cursor-pointer hover:bg-white hover:text-green-900 py-2' onClick={() => {nav('farmers')}}>
                    <div className='flex items-center'>
                        <PiFarmFill />
                        <h1 className='ml-2'>Manage Farmers</h1>
                    </div>
                    <FaChevronRight />
                </div>
                {/* <div className='w-full bg-gray-800'>
                    <div className='m-0 mx-8 lg:mx-25 flex justify-center lg:justify-start items-center'>
                        <a href="/admin" className='text-white text-base hover:bg-white hover:text-gray-800 py-3 px-3'>Home</a>
                        <a href="/" className='text-white text-base hover:bg-white hover:text-gray-800 py-3 px-3'>Vendors</a>
                        <a href="/products" className='text-white text-base hover:bg-white hover:text-gray-800 py-3 px-3'>Farmers</a>
                    </div>
                </div> */}
            </div>

            <div className='w-11/12'>
                <div className='py-6 px-10 border-b-1 border-gray-200 w-full flex items-center justify-between'>
                    <h1 className='font-bold text-lg text-left'>Hello, Victor!</h1>
                    <div>
                        <button className='ring-1 ring-gray-300 rounded px-5 py-0.5 text-sm cursor-pointer'>Logout</button>
                    </div>
                </div>
                <div className='py-3 px-10 border-b-1 text-xs border-gray-200 w-full flex items-center justify-start'>
                    <h1 className='font-semibold text-sm text-black text-left'>Admin Dashboard</h1>
                    <h1 className='font-semibold text-xs text-gray-500 text-left mx-1'>|</h1>
                    <h1 className='font-semibold text-xs text-gray-500 text-left mx-1'>Home /</h1>
                    <h1 className='font-semibold text-xs text-gray-500 text-left'>{currentPage}</h1>
                </div>

                {showDashboard ? (
                <div className='mx-8 lg:mx-10 mt-8'>
                    <div className='w-full grid grid-cols-5 gap-4'>

                        <div className="pt-1 ring-1 ring-gray-200 rounded flex flex-col justify-between">
                            <div className='flex items-start justify-between mx-6 mt-5'>
                                <div className='text-xl w-max rounded p-3 bg-green-900 text-white border-1 border-gray-300 flex items-center'>
                                    <LuCrown />
                                </div>
                                <div className='w-full flex flex-col justify-between items-end'>
                                    <p className='text-sm font-semibold ml-3 text-gray-500'>Total Users</p>
                                    <h1 className='text-2xl font-bold'>20</h1>
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

                        <div className="pt-1 ring-1 ring-gray-200 rounded flex flex-col justify-between">
                            <div className='flex items-start justify-between mx-6 mt-5'>
                                <div className='text-xl w-max rounded p-3 bg-green-900 text-white border-1 border-gray-300 flex items-center'>
                                    <LuCrown />
                                </div>
                                <div className='w-full flex flex-col justify-between items-end'>
                                    <p className='text-sm font-semibold ml-3 text-gray-500'>Verified Users</p>
                                    <h1 className='text-2xl font-bold'>20</h1>
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

                        <div className="pt-1 ring-1 ring-gray-200 rounded flex flex-col justify-between">
                            <div className='flex items-start justify-between mx-6 mt-5'>
                                <div className='text-xl w-max rounded p-3 bg-green-900 text-white border-1 border-gray-300 flex items-center'>
                                    <LuCrown />
                                </div>
                                <div className='w-full flex flex-col justify-between items-end'>
                                    <p className='text-sm font-semibold ml-3 text-gray-500'>Pending Approvals</p>
                                    <h1 className='text-2xl font-bold'>20</h1>
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

                        <div className="pt-1 ring-1 ring-gray-200 rounded flex flex-col justify-between">
                            <div className='flex items-start justify-between mx-6 mt-5'>
                                <div className='text-xl w-max rounded p-3 bg-green-900 text-white border-1 border-gray-300 flex items-center'>
                                    <LuCrown />
                                </div>
                                <div className='w-full flex flex-col justify-between items-end'>
                                    <p className='text-sm font-semibold ml-3 text-gray-500'>Recent Users</p>
                                    <h1 className='text-2xl font-bold'>20</h1>
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

                        <div className="pt-1 ring-1 ring-gray-200 rounded flex flex-col justify-between">
                            <div className='flex items-start justify-between mx-6 mt-5'>
                                <div className='text-xl w-max rounded p-3 bg-green-900 text-white border-1 border-gray-300 flex items-center'>
                                    <LuCrown />
                                </div>
                                <div className='w-full flex flex-col justify-between items-end'>
                                    <p className='text-sm font-semibold ml-3 text-gray-500'>Special Users</p>
                                    <h1 className='text-2xl font-bold'>20</h1>
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
                                    data={data}
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
                                            yAxisId="left"
                                            tick={{ 
                                            fontSize: 11,
                                            fontFamily: 'Arial',
                                            fill: '#666'
                                            }}
                                            axisLine={{ stroke: '#ccc', strokeWidth: 1 }}
                                            tickMargin={10}
                                        />
                                        
                                        <YAxis 
                                            yAxisId="right" 
                                            orientation="right"
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
                                            yAxisId="left"
                                            dataKey="sales" barSize={70} fill="#413ea0" name="Total Sales" radius={[4, 4, 0, 0]} isAnimationActive={true} animationDuration={1500} />
                                        <Line 
                                            yAxisId="right"
                                            type="monotone" dataKey="userGrowth" stroke="#ff7300" strokeWidth={2} name="User Growth" />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className='shadow-xl ring-1 ring-gray-200 rounded w-2/6 ml-4'>
                            <h1 className='text-base font-semibold mt-0 mb-0 border-b-1 border-gray-200 px-5 pt-3 pb-3'>User Composition</h1>
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
                                    <Pie data={usersComposition} dataKey="population" nameKey="name" cx="50%" cy="50%" outerRadius={180} fill="#8884d8" />
                                </PieChart>
                            </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                    
                    
                </div>) : (null)}

                {showVendors ? (
                    <div className=''>
                        <AdminVendors/>
                    </div>
                ) : (null)}

                {showFarmers ? (
                    <div className=''>
                        <AdminFarmers/>
                    </div>
                ) : (null)}
            </div>
           
        </div>
    );
}

export default Admin;