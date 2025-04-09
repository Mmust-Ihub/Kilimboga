import Navbar from '../mainComponents/Navbar.jsx'
import EditProductForm from './EditProductForm'
import validate from '../validation/schema.js'
import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import Database from '../js/db.js';
import {ClipLoader} from 'react-spinners'
import { IoMdAdd } from "react-icons/io";
import { MdGridView } from "react-icons/md";

const db = new Database()

function Products(){
    const [viewProducts, setViewProducts] = useState(false) 
    const [addProducts, setAddProducts] = useState(false)
    const [editProducts, setEditProducts] = useState(false)
    const [products, setProducts] = useState([])
    const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('token')))
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')))
    const [refresh, setRefresh] = useState(true)
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        productName: '',
        productDescription: '',
        productCategory: '',
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

    useEffect(()=>{
        if (refresh) {
            console.log('Refreshing...')
            async function getData() {
                const response = await db.getProducts(token);
                if (!response.status) {
                    toast.error(response.message);
                } else {
                    setProducts(response.data);
    
                    if (response.data.length < 1) {
                        toast("No products found", { icon: '😢' });
                    }
    
                    setEditProducts(false);
                    setAddProducts(false);
                    setViewProducts(true);
                }
                setRefresh(false);
            }
            getData();
        }
      },[refresh])

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
        setRefresh(true)
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

    async function handleProductFormSubmit(){
        setLoading(true)

        let {value, error} = validate('product', formData)

        if (error) {
            console.log(error.details)
            console.log(formData)
            let message = error.details[0].message.replace(/"/g, '');
            toast.error(message)
            setLoading(false)
            return
        }

        if(!document.getElementById('productImage').files.length > 0){
            toast.error('Product Image is required')
            setLoading(false)
            return
        }else if(document.getElementById('productImage').files[0].size > 2000000){
            toast.error('Product Image size should be less than 2MB')
            setLoading(false)
            return
        }

        const payload = {
            ...formData,
            productImage: document.getElementById('productImage').files[0]
        }

        try {
            const response = await db.addProduct(token, payload); // Await the API call
            if (!response.status) {
                toast.error(response.message);
            } else {
                toast.success(response.message);
                setFormData({
                    productName: '',
                    productDescription: '',
                    productCategory: 'fertilisers',
                    productImage: '',
                    productQuantity: 0,
                    productPrice: 0,
                });
            }
        } catch (err) {
            console.error(err);
            toast.error('An error occurred while adding the product.');
        } finally {
            setLoading(false); // Stop loading after the process is complete
        }
    }

    return (
        <>
            <Navbar user={user} activePage={"products"}>
                <div className='' style={{minHeight: '100vh'}}>
                    <div className='mx-5 lg:mx-10 mt-3 lg:mt-5 flex justify-between items-center'>
                    <h1 className="font-semibold text-base lg:text-lg" >Products</h1>
                    <div>
                        <button onClick={showAddForm} title='Add product' className="mr-2 lg:mr-4 p-1.5 lg:px-6 lg:py-1 cursor-pointer bg-green-800 hover:bg-green-700 text-white text-base lg:text-lg rounded">
                            <IoMdAdd />
                        </button>
                        <button onClick={showView} title='View products' className="p-1.5 lg:px-6 lg:py-1 cursor-pointer bg-green-800 hover:bg-green-700 text-white text-base lg:text-lg rounded">
                            <MdGridView />
                        </button>
                    </div>
                    </div>

                    {viewProducts ? ( 
                            <div className='mx-5 lg:mx-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5'>
                                {products.length > 0 ? 
                                    products.map((product) => (
                                        <div key={product._id} className="rounded shadow-xl ring-1 ring-gray-100 px-3 lg:px-6 py-5 bg-gray-100">
                                            <img className="rounded h-40 w-full" src={product.imageUrl} alt="" />
                                            <h1 className="font-bold mt-2 text-base lg:text-lg">{product.title}</h1>
                                            <p className="text-gray-400 mt-2 text-sm lg:text-base">{product.description}</p>
                                            <div className="flex justify-between items-center mt-2">
                                                <div>
                                                    <p className='text-gray-400 text-xs lg:text-sm mt-2'>Price</p>
                                                    <p className="font-semibold text-sm lg:text-base">{product.price} KES</p>
                                                </div>
                                                <div>
                                                    <p className='text-gray-400 text-xs lg:text-sm text-left mt-2'>Quantity</p>
                                                    <p className="font-semibold text-sm lg:text-base text-right">{product.quantity}</p>
                                                </div>
                                            </div>
                                            <button
                                                className="border-1 border-gray-300 mt-4 px-4 py-1 w-full cursor-pointer text-sm lg:text-base hover:text-white bg-gray-100 hover:bg-green-800 rounded"
                                                onClick={() => showEditForm(product.title, product.description, product.category, product.price, product.quantity, product.imageUrl, product._id)}
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    )) : null
                                }
                            </div>
                        ): null}

                    {addProducts && (
                        <div className="mx-5 lg:mx-10 mt-5 lg:mt-5 py-5 lg:py-10 px-4 lg:px-7 rounded lg:shadow-xl bg-gray-100">
                            <form className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4" action="">
                                <div className="flex flex-col">
                                    <label className="text-xs lg:text-sm text-gray-500" htmlFor="productName">Product Name</label>
                                    <input value={formData.productName} onChange={handleProductFormValidate} className="text-sm rounded p-1 px-3 mt-2 border-1 border-gray-400 lg:border-gray-300 outline-0" type="text" id="productName" name="productName" />
                                    <p className="error text-red-500 mt-2"></p>
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-xs lg:text-sm text-gray-500" htmlFor="productDescription">Product Description</label>
                                    <textarea value={formData.productDescription} onChange={handleProductFormValidate} className="text-sm rounded p-1 px-3 mt-2 border-1 border-gray-400 lg:border-gray-300 outline-0" type="text" id="productDescription" name="productDescription"></textarea>
                                    <p className="error text-red-500 mt-2"></p>
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-xs lg:text-sm text-gray-500" htmlFor="productCategory">Product Category</label>
                                    <select value={formData.productCategory} onChange={handleProductFormValidate} className="text-sm rounded p-1 px-3 mt-2 border-1 border-gray-400 lg:border-gray-300 outline-0" name="productCategory" id="productCategory">
                                        <option value="fertilisers">Fertilisers</option>
                                        <option value="seeds">Seeds</option>
                                        <option value="tools">Tools</option>
                                        <option value="pesticides">Pesticides</option>
                                    </select>
                                    <p className="error text-red-500 mt-2"></p>
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-xs lg:text-sm text-gray-500" htmlFor="productImage">Product Image</label>
                                    <input className="text-sm rounded p-1 px-3 mt-2 border-1 border-gray-400 lg:border-gray-300 outline-0" type="file" id="productImage" name="productImage" accept="jpg" />
                                    <p className="error text-red-500 mt-2"></p>
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-xs lg:text-sm text-gray-500" htmlFor="productQuanityt">Product Quantity</label>
                                    <input value={formData.productQuantity} onChange={handleProductFormValidate} className="text-sm rounded p-1 px-3 mt-2 border-1 border-gray-400 lg:border-gray-300 outline-0" type="number" id="productQuantity" name="productQuantity" />
                                    <p className="error text-red-500 mt-2"></p>
                                </div>

                                <div className="flex flex-col">
                                    <label className="text-xs lg:text-sm text-gray-500" htmlFor="productPrice">Price</label>
                                    <input value={formData.productPrice} onChange={handleProductFormValidate} className="text-sm rounded p-1 px-3 mt-2 border-1 border-gray-400 lg:border-gray-300 outline-0" type="number" id="productPrice" name="productPrice" />
                                    <p className="error text-red-500 mt-2"></p>
                                </div>
                            </form>
                            <div className="flex flex-row-reverse justify-between items-center">
                            <button 
                                onClick={handleProductFormSubmit} 
                                className={`lg:w-40 mt-5 px-4 lg:px-6 py-1 cursor-pointer text-white text-xs lg:text-sm rounded flex items-center justify-center ${
                                    loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-800 hover:bg-green-700'
                                }`}
                                disabled={loading}
                            >
                                {loading ? <ClipLoader size={20} color='#ffffff' loading={loading} speedMultiplier={1} /> : 'Add product'}
                            </button>
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
                            showView={showView}
                        />
                    )}
                </div>
           
            </Navbar>
            <Toaster />
        </>
    )
    }
    
    export default Products