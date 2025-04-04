import Navbar from '../mainComponents/Navbar'
import { useState, useEffect } from 'react'
import {ClipLoader} from 'react-spinners'
import toast, { Toaster } from 'react-hot-toast';
import Database from '../js/db.js';

const db = new Database()

function Orders(){
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')))
    const [orders, setOrders] = useState([])

    useEffect(()=>{
        async function getData() {
            const response = await db.getOrders(token, "pending");
            if (!response.status) {
                toast.error(response.message);
            } else {
                console.log(response.data);
                // setProducts(response.data);
            }
        }
        toast.promise(getData(), {
            loading: 'Fetching orders...',
            success: 'Orders fetched successfully',
            error: 'Error when fetching orders',
          });
      },[])

    return (
        <>
        <Navbar user={'user'} />
        <div className='mx-8 lg:mx-25 flex justify-between items-center'>
            <h1 className="font-semibold text-lg" >Orders</h1>
        </div>
        <div className="mx-8 lg:mx-25 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-5">
            <div className='border-1 border-gray-300 rounded shadow-lg p-5'>
                <p className='bg-green-500 w-max rounded-2xl px-3 py-1 text-white text-xs mb-3'>Delivered</p>
                <div className='flex justify-between items-center border-b-1 border-gray-300 pb-3'>
                    <h1 className='text-gray-400 text-sm'>ABd4567yZTY</h1>
                    <h1 className='text-gray-400 text-sm'>20-04-2003</h1>
                </div>

                <p className='text-gray-400 text-sm mt-2'>Item</p>
                <p>Farm Up Fertiliser</p>

                <div className='flex justify-between'>
                    <div>
                        <p className='text-gray-400 text-sm mt-2'>Quantity</p>
                        <p>200</p>
                    </div>

                    <div>
                        <p className='text-gray-400 text-sm mt-2'>Price</p>
                        <p>2,000 KES</p>
                    </div>
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
                <p className='bg-gray-500 w-max rounded-2xl px-3 py-1 text-white text-xs mb-3'>Pending</p>
                <div className='flex justify-between items-center border-b-1 border-gray-300 pb-3'>
                    <h1 className='text-gray-400 text-sm'>ABd4567yZTY</h1>
                    <h1 className='text-gray-400 text-sm'>20-04-2003</h1>
                </div>

                <p className='text-gray-400 text-sm mt-2'>Item</p>
                <p>Farm Up Fertiliser</p>

                <div className='flex justify-between'>
                    <div>
                        <p className='text-gray-400 text-sm mt-2'>Quantity</p>
                        <p>200</p>
                    </div>

                    <div>
                        <p className='text-gray-400 text-sm mt-2'>Price</p>
                        <p>2,000 KES</p>
                    </div>
                </div>

                <p className='text-gray-400 text-sm mt-2'>Address</p>
                <p>Kakamega, Lupe, Near Mahiakalo Primary</p>

                <p className='text-gray-400 text-sm mt-2'>Phone</p>
                <p>0706518167</p>

            </div>
            <Toaster />
        </div>
        </>
    )
}

export default Orders