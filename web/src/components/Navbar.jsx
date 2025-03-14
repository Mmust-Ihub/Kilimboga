function Navbar(){
    return (
        <div className='bg-gray-100 pt-7 mb-5'>
            <h1 className='font-bold mt-1 mb-3 text-base mx-48'>Kilimboga Vendor Portal</h1>
            <div className='w-full bg-gray-800'>
                <div className='m-0 mx-48 flex justify-start items-center'>
                <a href="/" className='text-white text-base hover:bg-white hover:text-gray-800 py-3 px-3'>Home</a>
                <a href="/products" className='text-white text-base hover:bg-white hover:text-gray-800 py-3 px-3'>Products</a>
                <a href="/orders" className='text-white text-base hover:bg-white hover:text-gray-800 py-3 px-3'>Orders</a>
                </div>
            </div>
        </div>
    )
}

export default Navbar