import { FaShop } from "react-icons/fa6";
import { PiFarmFill } from "react-icons/pi";
import { IoStatsChart } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa";
import { RiMenuFoldFill } from "react-icons/ri";
import { RiMenuFold4Fill } from "react-icons/ri";
import { useState } from "react";

function Navbar({children, user, activePage}){
    const [active, setActive] = useState(activePage)
    const [hidden, setHidden] = useState(true)

    function logout(){
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
        window.location.href = '/'
    }

    return (
        <>
           <div className=' bg-gray-100 flex w-full' style={{minHeight: '100%'}}>
                 {/* <Navbar user={'user'} /> */}
                 <div className={`bg-green-900 h-screen w-12/12 lg:w-2/12 fixed top-0 left-0 transform transition-all duration-300 ease-in-out ${
                        hidden ? '-translate-x-full lg:translate-x-0' : 'translate-x-0 '}`}
                >
                    <div className="flex justify-between items-center border-b-1 border-green-800">
                        <h1 className='py-6 px-5 font-bold text-lg text-white text-left  w-full'>Kilimboga</h1>
                        <button className='lg:hidden mr-6 my-6 text-lg text-white ring-1 ring-green-800 rounded p-1 cursor-pointer' onClick={()=>{hidden ? setHidden(false) : setHidden(true)}}><RiMenuFoldFill /></button>
                    </div>

                    <div className="flex flex-col justify-between ">
                        <div>
                            <h1 className='px-5 mt-4 text-white text-xs'>NAVIGATION</h1>
                            <div className={active == "dashboard" ? 'px-3 mx-5 rounded mt-4 text-sm flex items-center justify-between cursor-pointer bg-white text-green-900 py-2':
                                    'px-3 mx-5 rounded mt-4 text-white text-sm flex items-center justify-between cursor-pointer hover:bg-white hover:text-green-900 py-2'}
                                onClick={() => {window.location.href = '/dashboard'}}>
                                <div className='flex items-center'>
                                    <IoStatsChart />
                                    <h1 className='ml-2'>Dashboard</h1>
                                </div>
                                <FaChevronRight />
                            </div>
                            <div className={active == "products" ? 
                                    'px-3 mx-5 rounded mt-4 text-sm flex items-center justify-between cursor-pointer bg-white text-green-900 py-2':
                                    'px-3 mx-5 rounded mt-4 text-white text-sm flex items-center justify-between cursor-pointer hover:bg-white hover:text-green-900 py-2'}
                                onClick={() => {window.location.href = '/products'}}>
                                <div className='flex items-center'>
                                    <FaShop />
                                    <h1 className='ml-2'>Products</h1>
                                </div>
                                <FaChevronRight />
                            </div>
                            <div className={active == "orders" ? 
                                    'px-3 mx-5 rounded mt-4 text-sm flex items-center justify-between cursor-pointer bg-white text-green-900 py-2':
                                    'px-3 mx-5 rounded mt-4 text-white text-sm flex items-center justify-between cursor-pointer hover:bg-white hover:text-green-900 py-2'}
                                onClick={() => {window.location.href = '/orders'}}>
                                <div className='flex items-center'>
                                    <PiFarmFill />
                                    <h1 className='ml-2'>Orders</h1>
                                </div>
                                <FaChevronRight />
                            </div>

                            <h1 className='px-5 mt-4 text-white text-xs'>PROFILE</h1>
                            <div className='px-3 mx-5 rounded mt-4 text-white text-sm flex items-center justify-between cursor-pointer hover:bg-white hover:text-green-900 py-2' onClick={() => {window.location.href = '/dashboard'}}>
                                <div className='flex items-center'>
                                    <IoStatsChart />
                                    <h1 className='ml-2'>Edit profile</h1>
                                </div>
                                <FaChevronRight />
                            </div>
                        </div>
                        <div className='mx-5 rounded mt-120 text-white text-sm flex items-center justify-between cursor-pointer py-2'>
                            <button className="w-full border-1 border-white text-sm rounded px-3 py-3 cursor-pointer bg-white text-green-900" onClick={logout}>
                                Logout
                            </button>
                        </div>
                    </div>
                 </div>
           
                 <div className='w-12/12 lg:w-10/12 h-max lg:ml-auto bg-gray-200'>

                   <div className='bg-white pt-4 pb-3 px-5 lg:py-6 lg:px-10 lg:mt-0 border-b-1 border-gray-200 w-full flex items-center justify-between'>
                        <button className='lg:hidden text-green-800 text-lg ring-1 ring-gray-300 rounded p-1 cursor-pointer' onClick={()=>{hidden ? setHidden(false) : setHidden(true)}}><RiMenuFold4Fill /></button>
                       <h1 className='font-bold text-lg text-left'>Hello, {user.firstName}!</h1>
                       <div className="hidden lg:visible">
                           <button className='ring-1 ring-gray-300 rounded px-5 py-0.5 text-sm cursor-pointer' onClick={logout}>Logout</button>
                       </div>
                   </div>
                   <div className='bg-white py-3 px-5 lg:px-10 border-b-1 text-xs border-gray-200 w-full flex items-center justify-start'>
                       <h1 className='font-semibold text-sm text-black text-left'>Vendor Dashboard</h1>
                   </div>
                        
                    {children}
                 </div>
               </div>
        </>
       
    )
}

export default Navbar