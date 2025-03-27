import Navbar from './Navbar'
import EditProductForm from './EditProductForm'
import validate from '../validation/schema.js'
import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';

function Products(){
    const [viewProducts, setViewProducts] = useState(true) 
    const [addProducts, setAddProducts] = useState(false)
    const [editProducts, setEditProducts] = useState(false)

    const [formData, setFormData] = useState({
        productName: '',
        productDescription: '',
        productCategory: '',
        productImage: '',
        productQuantity: 0,
        productPrice: 0
    });

    const [editFormData, setEditFormData] = useState({
        productName: '',
        productDescription: '',
        productCategory: '',
        productImage: '',
        productQuantity: 0,
        productPrice: 0,
        id: ''
    });

    function showAddForm(){
        setEditProducts(false)
        setAddProducts(true)
        setViewProducts(false)
    }

    function showEditForm(name, description, category, price, qty, image, id){
        setEditFormData({
            ...editFormData,
            productName: name,
            productDescription: description,
            productCategory: category,
            productPrice: price,
            productQuantity: qty,
            productImage: image,
            id: id
        });
        setEditProducts(true)
        setAddProducts(false)
        setViewProducts(false)
    }

    function showView(){
        setEditProducts(false)
        setAddProducts(false)
        setViewProducts(true)
    }

    const handleProductFormValidate = (e) => {
        const { name, value } = e.target;
        let val = validate(name, {[name]: value});
        if (val.error) {
            let message = val.error.details[0].message.replace(/"/g, '');
            document.querySelector(`#${name} ~ .error`).textContent = message
        }else{
            document.querySelector(`#${name} ~ .error`).textContent = '';
        }

        setFormData({
            ...formData,
            [name]: (name == "productPrice" || name == "productQuantity") && isNaN(value) == 0 ? parseInt(value) : value,
        });
    }

    function handleProductFormSubmit(){
        let {value, error} = validate('product', formData)

        if (error) {
            let message = error.details[0].message.replace(/"/g, '');
            toast.error(message)
            return
        }
        if(document.getElementById('productImage').files.length < 1){
            toast.error('Product Image is required')
            return
        }

        // To do: Upload image fn
        // To do: Upload to db fn

        console.log(formData);
    }

    return (
        <>
            <Navbar />
            <div className='mx-8 lg:mx-25 flex justify-between items-center'>
                <h1 className="font-semibold text-lg" >Products</h1>
                <div>
                    <button onClick={showAddForm} className="mr-4 px-6 py-1 cursor-pointer bg-gray-800 hover:bg-gray-700 text-white text-sm rounded">Add</button>
                    <button onClick={showView} className="px-6 py-1 cursor-pointer bg-gray-800 hover:bg-gray-700 text-white text-sm rounded">View</button>
                </div>
            </div>

           {viewProducts && ( <div className='mx-8 lg:mx-25 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-5'>

                <div className="rounded shadow-xl ring-1 ring-gray-100 px-6 py-5">
                    <img className="rounded" src="https://th.bing.com/th/id/OIP.JM1OeMRn9Kak0GEDbzig8AHaEK?w=297&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7" alt="" />
                    <h1 className="font-bold mt-2 text-lg">Farm Up fertiliser</h1>
                    <p className="text-gray-400 mt-2 text-sm">Fertiliser for cabbages between week 1 and 2</p>
                    <div className="flex justify-between items-center mt-2">
                        <div>
                            <p className='text-gray-400 text-sm mt-2'>Price</p>
                            <p className="font-semibold">20 KES</p>
                        </div>
                       <div>
                        <p className='text-gray-400 text-sm text-left mt-2'>Quantity</p>
                        <p className="font-semibold text-right">200</p>
                       </div>
                    </div>
                    <button className="
                        border-1 border-gray-300
                        mt-4 px-4 py-1
                        w-full  
                        cursor-pointer 
                        text-base hover:text-white
                        bg-gray-100 hover:bg-gray-800
                        rounded"
                        onClick={() => showEditForm("Farm Up fertiliser", "Fertiliser for cabbages between week 1 and 2", "Fertiliser", 20, 200, "https://th.bing.com/th/id/OIP.JM1OeMRn9Kak0GEDbzig8AHaEK?w=297&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7", "1")}>Edit</button>
                </div>
             
            </div>)}

            {addProducts && (
                <div className="mx-8 lg:mx-25 mt-5 py-10 px-7 rounded shadow-xl">
                    <form className="w-full grid grid-cols-2 gap-4 text-sm" action="">
                        <div className="flex flex-col">
                            <label htmlFor="productName">Product Name</label>
                            <input value={formData.productName} onChange={handleProductFormValidate} className="rounded p-1 px-3 mt-2 border-1 border-gray-300 outline-0" type="text" id="productName" name="productName" />
                            <p className="error text-red-500 mt-2"></p>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="productDescription">Product Description</label>
                            <input value={formData.productDescription} onChange={handleProductFormValidate} className="rounded p-1 px-3 mt-2 border-1 border-gray-300 outline-0" type="text" id="productDescription" name="productDescription" />
                            <p className="error text-red-500 mt-2"></p>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="productCategory">Product Category</label>
                            <select value={formData.productCategory} onChange={handleProductFormValidate} className="rounded p-1 px-3 mt-2 border-1 border-gray-300 outline-0" name="productCategory" id="productCategory">
                                <option value="fertilisers">Fertilisers</option>
                                <option value="seeds">Seeds</option>
                                <option value="tools">Tools</option>
                                <option value="pesticides">Pesticides</option>
                            </select>
                            <p className="error text-red-500 mt-2"></p>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="productImage">Product Image</label>
                            <input className="rounded p-1 px-3 mt-2 border-1 border-gray-300 outline-0" type="file" id="productImage" name="productImage" accept="jpg" />
                            <p className="error text-red-500 mt-2"></p>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="productQuanityt">Product Quantity</label>
                            <input value={formData.productQuantity} onChange={handleProductFormValidate} className="rounded p-1 px-3 mt-2 border-1 border-gray-300 outline-0" type="number" id="productQuantity" name="productQuantity" />
                            <p className="error text-red-500 mt-2"></p>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="productPrice">Price</label>
                            <input value={formData.productPrice} onChange={handleProductFormValidate} className="rounded p-1 px-3 mt-2 border-1 border-gray-300 outline-0" type="number" id="productPrice" name="productPrice" />
                            <p className="error text-red-500 mt-2"></p>
                        </div>
                    </form>
                    <div className="flex flex-row-reverse justify-between items-center">
                        <button onClick={handleProductFormSubmit} className="mt-5 px-6 py-1 cursor-pointer bg-green-800 hover:bg-green-700 text-white text-sm rounded">Add product</button>
                    </div>
                </div>
            )}

            {editProducts && (
               <EditProductForm
                    name={editFormData.productName}
                    description={editFormData.productDescription}
                    category={editFormData.productCategory}
                    price={editFormData.productPrice}
                    qty={editFormData.productQuantity}
                    image={editFormData.productImage}
                    id={editFormData.id}
                />
            )}

            <Toaster />
        </>
    )
    }
    
    export default Products