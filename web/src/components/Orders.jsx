import Navbar from './Navbar'
import { useState } from 'react'

function Orders(){
    return (
        <>
        <Navbar />
        <div className='mx-48 flex justify-between items-center'>
            <h1 className="font-semibold text-lg" >Orders</h1>
        </div>
        <div className="mx-48 grid grid-cols-4 gap-4 mt-5">
            <div className='border-1 border-gray-300 rounded shadow-lg p-5'>
                <p className='bg-green-500 w-max rounded-2xl px-3 py-1 text-white text-xs mb-2'>Delivered</p>
                <div className='flex justify-between items-center'>
                    <h1 className='text-gray-400 text-sm'>ABd4567yZTY</h1>
                    <h1 className='text-gray-400 text-sm'>20-04-2003</h1>
                </div>

                <p className='text-gray-400 text-sm mt-2'>Address</p>
                <p>Kakamega, Lupe, Near Mahiakalo Primary</p>

                <p className='text-gray-400 text-sm mt-2'>Phone</p>
                <p>0706518167</p>

                {/* <div>
                    <button className="w-full mt-5 px-6 py-1 cursor-pointer border-1 border-green-800 text-green-800 hover:bg-green-800 hover:text-white text-sm rounded">Mark as delivered</button>
                    <button className="w-full mt-3 px-6 py-1 cursor-pointer border-1 border-red-800 text-red-800 hover:bg-red-700 hover:text-white text-sm rounded">Cancel order</button>
                </div> */}

            </div>

            <div className='border-1 border-gray-300 rounded shadow-lg p-5'>
                <p className='bg-red-500 w-max rounded-2xl px-3 py-1 text-white text-xs mb-2'>Pending</p>
                <div className='flex justify-between items-center'>
                    <h1 className='text-gray-400 text-sm'>ABd4567yZTY</h1>
                    <h1 className='text-gray-400 text-sm'>20-04-2003</h1>
                </div>

                <p className='text-gray-400 text-sm mt-2'>Address</p>
                <p>Kakamega, Lupe, Near Mahiakalo Primary</p>

                <p className='text-gray-400 text-sm mt-2'>Phone</p>
                <p>0706518167</p>

            </div>
        </div>
        </>
    )
}

export default Orders