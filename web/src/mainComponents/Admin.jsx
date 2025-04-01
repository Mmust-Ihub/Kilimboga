import AdminFarmers from '../subComponents/AdminFarmers';
import AdminVendors from '../subComponents/AdminVendors';
import { GrMoney, GrCart } from "react-icons/gr";
import { FaArrowTrendUp } from "react-icons/fa6";
import { BarChart } from '@mui/x-charts/BarChart';
import { LuCrown } from "react-icons/lu";
import { useState } from 'react';
import { useEffect } from 'react';

function Admin(){
    const [showDashboard, setShowDashboard] = useState(true);
    const [showFarmers, setShowFarmers] = useState(false);
    const [showVendors, setShowVendors] = useState(false);

    function nav(destination){
        switch(destination){
            case 'dashboard':
                setShowDashboard(true);
                setShowFarmers(false);
                setShowVendors(false);
                break;
            case 'farmers':
                setShowDashboard(false);
                setShowFarmers(true);
                setShowVendors(false);
                break;
            case 'vendors':
                setShowDashboard(false);
                setShowFarmers(false);
                setShowVendors(true);
                break;
            default:
                setShowDashboard(true);
                setShowFarmers(false);
                setShowVendors(false);
                break;
        }
    }

    return (
        <>
            <div className='bg-gray-800 pt-4 pb-4'>
                <h1 className=' font-bold mt-1 mb-3 text-xl text-white mx-8 lg:mx-25 text-center lg:text-left'>Kilimboga Admin Portal</h1>
                {/* <div className='w-full bg-gray-800'>
                    <div className='m-0 mx-8 lg:mx-25 flex justify-center lg:justify-start items-center'>
                        <a href="/admin" className='text-white text-base hover:bg-white hover:text-gray-800 py-3 px-3'>Home</a>
                        <a href="/" className='text-white text-base hover:bg-white hover:text-gray-800 py-3 px-3'>Vendors</a>
                        <a href="/products" className='text-white text-base hover:bg-white hover:text-gray-800 py-3 px-3'>Farmers</a>
                    </div>
                </div> */}
            </div>

            <div className='mx-8 lg:mx-25 mt-5 mb-5 flex justify-start'>
                <button className='cursor-pointer text-base p-0 px-5 py-0.5 shadow-2xs ring-1 ring-gray-300 rounded mr-3' onClick={() => {nav('dashboard')}}>View Stats</button>
                <button className='cursor-pointer text-base p-0 px-5 py-0.5 shadow-2xs ring-1 ring-gray-300 rounded mr-3' onClick={() => {nav('vendors')}}>Manage Vendors</button>
                <button className='cursor-pointer text-base p-0 px-5 py-0.5 shadow-2xs ring-1 ring-gray-300 rounded' onClick={() => {nav('farmers')}}>Manage Farmers</button>
            </div>

            {showDashboard ? (<div className='mx-8 lg:mx-25'>
                <h1 className='text-lg font-semibold mt-5 mb-5'>Sales overview</h1>
                <div className="w-full flex">
                    <div className='w-full mr-15'>
                        <div className='w-full shadow-xl ring-1 ring-gray-400 rounded mb-10 lg:mb-0'>
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

                    <div className='w-2/6 grid grid-cols-1 gap-4 rounded shadow-lg ring-1 ring-gray-300 text-right'>

                        <div className="px-6 pt-3 border-b-1 lg:border-r-1 border-gray-300 flex flex-col justify-around">
                            <div className='text-2xl w-max rounded-3xl border-gray-300 flex items-center'>
                                <LuCrown />
                                <p className='text-xl font-semibold ml-3'>Pending approvals</p>
                            </div>
                            <div>
                                <div className='w-full flex justify-between items-end mt-5'>
                                <h1 className='text-4xl font-bold'>20</h1>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 border-b-1 border-gray-300 flex flex-col justify-around">
                            <div className='text-2xl w-max rounded-3xl border-gray-300 flex items-center'>
                                < GrMoney />
                                <p className='text-xl font-semibold ml-3'>Farmers</p>
                            </div>
                            <div>
                                <div className='w-full flex justify-between items-end mt-5'>
                                    <h1 className='text-4xl font-bold'>200</h1>
                                    <div className='flex flex-col justify-center items-end'>
                                        <div className='flex flex-row justify-center items-center text-base text-green-600'>
                                            <FaArrowTrendUp />
                                            <p className='ml-2'>200%</p>
                                        </div>
                                        <p className='text-sm text-gray-400 mt-2'>Compared to last month</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                        <div className="px-6 pb-3 border-b-1 border-gray-300 flex flex-col justify-around">
                            <div className='text-2xl w-max rounded-3xl border-gray-300 flex items-center'>
                                < GrMoney />
                                <p className='text-xl font-semibold ml-3'>Vendors</p>
                            </div>
                            <div>
                                <div className='w-full flex justify-between items-end mt-5'>
                                    <h1 className='text-4xl font-bold'>200</h1>
                                    <div className='flex flex-col justify-center items-end'>
                                        <div className='flex flex-row justify-center items-center text-base text-green-600'>
                                            <FaArrowTrendUp />
                                            <p className='ml-2'>200%</p>
                                        </div>
                                        <p className='text-sm text-gray-400 mt-2'>Compared to last month</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                                
                    </div>

                    
                </div>
            </div>) : (null)}

            {showVendors ? (
                <div className='mx-8 lg:mx-25'>
                    <AdminVendors/>
                </div>
            ) : (null)}

            {showFarmers ? (
                <div className='mx-8 lg:mx-25'>
                    <AdminFarmers/>
                </div>
            ) : (null)}
        </>
    );
}

export default Admin;