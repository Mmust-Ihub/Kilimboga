import Navbar from './Navbar'
import EditProductForm from './EditProductForm'
import { useState, useEffect } from 'react'

function Products(){
    const [viewProducts, setViewProducts] = useState(true) 
    const [addProducts, setAddProducts] = useState(false)
    const [editProducts, setEditProducts] = useState(false)

    const [editProductName, setEditProductName] = useState('')
    const [editProductDescription, setEditProductDescription] = useState('')
    const [editProductPrice, setEditProductPrice] = useState(0)
    const [editProductQty, setEditProductQty] = useState(0)
    const [editProductImage, setEditProductImage] = useState('')
    const [editProductId, setEditProductId] = useState('')

    function showEditForm(name, description, price, qty, image, id){
        setEditProductName(name)
        setEditProductDescription(description)
        setEditProductPrice(price)
        setEditProductQty(qty)
        setEditProductImage(image)
        setEditProductId(id)

        setEditProducts(true)
        setAddProducts(false)
        setViewProducts(false)
    }

    function showAddForm(){
        setEditProducts(false)
        setAddProducts(true)
        setViewProducts(false)
    }

    function showView(){
        setEditProducts(false)
        setAddProducts(false)
        setViewProducts(true)
    }

    function addEventListeners(){
        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', validate)
            input.addEventListener('change', validate)
            input.addEventListener('keyup', validate)
           
        })
    }

    useEffect(() => {
        if (addProducts || editProducts) {
            addEventListeners()
        }
    }, [addProducts, editProducts])

    return (
        <>
            <Navbar />
            <div className='mx-48 flex justify-between items-center'>
                <h1 className="font-semibold text-lg" >Products</h1>
                <div>
                    <button onClick={showAddForm} className="mr-4 px-6 py-1 cursor-pointer bg-gray-800 hover:bg-gray-700 text-white text-sm rounded">Add</button>
                    <button onClick={showView} className="px-6 py-1 cursor-pointer bg-gray-800 hover:bg-gray-700 text-white text-sm rounded">View</button>
                </div>
            </div>
           {viewProducts && ( <div className='mx-48 grid grid-cols-5 gap-4 mt-5'>
                <div className="rounded shadow-xl ring-1 ring-gray-100 px-6 py-5">
                    <img className="rounded" src="https://th.bing.com/th/id/OIP.JM1OeMRn9Kak0GEDbzig8AHaEK?w=297&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7" alt="" />
                    <h1 className="font-bold mt-2 text-lg">Farm Up fertiliser</h1>
                    <p className="text-gray-400 mt-2 text-sm">Fertiliser for cabbages between week 1 and 2</p>
                    <div className="flex justify-between items-center mt-2">
                        <p className="font-semibold">20 KES</p>
                        <p className="font-semibold">200</p>
                    </div>
                    <button className="
                        border-1 border-gray-300
                        mt-4 px-4 py-1
                        w-full  
                        cursor-pointer 
                        text-base hover:text-white
                        bg-gray-100 hover:bg-gray-800
                        rounded"
                        onClick={() => showEditForm("Farm Up fertiliser", "Fertiliser for cabbages between week 1 and 2", 20, 200, "https://th.bing.com/th/id/OIP.JM1OeMRn9Kak0GEDbzig8AHaEK?w=297&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7", "1")}>Edit</button>
                </div>
             
            </div>)}

            {addProducts && (
                <div className="mx-48 mt-5 py-10 px-7 rounded shadow-xl">
                    <form className="w-full grid grid-cols-2 gap-4 text-sm" action="">
                        <div className="flex flex-col">
                            <label htmlFor="productName">Name</label>
                            <input className="rounded p-1 px-3 mt-2 border-1 border-gray-300" type="text" id="productName" />
                            <p className="error text-red-500 mt-2"></p>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="productDescription">Description</label>
                            <input className="rounded p-1 px-3 mt-2 border-1 border-gray-300" type="text" id="productDescription" />
                            <p className="error text-red-500 mt-2"></p>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="productImage">Product Image</label>
                            <input className="rounded p-1 px-3 mt-2 border-1 border-gray-300" type="file" id="productImage" accept="jpg" />
                            <p className="error text-red-500 mt-2"></p>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="productQty">Product Quantity</label>
                            <input className="rounded p-1 px-3 mt-2 border-1 border-gray-300" type="number" id="productQty" />
                            <p className="error text-red-500 mt-2"></p>
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="productPrice">Price</label>
                            <input className="rounded p-1 px-3 mt-2 border-1 border-gray-300" type="number" id="productPrice" />
                            <p className="error text-red-500 mt-2"></p>
                        </div>
                    </form>
                    <div className="flex flex-row-reverse justify-between items-center">
                        <button className="mt-5 px-6 py-1 cursor-pointer bg-green-800 hover:bg-green-700 text-white text-sm rounded">Add product</button>
                    </div>
                </div>
            )}

            {editProducts && (
                <EditProductForm
                name={editProductName}
                description={editProductDescription}
                price={editProductPrice}
                qty={editProductQty}
                image={editProductImage}
                id={editProductId}
                 />
            )}
        </>
    )
    }

    function validate() {
        let productName = document.getElementById('productName').value
        let productDescription = document.getElementById('productDescription').value
        let productImage = document.getElementById('productImage').files[0]
        let productQty = document.getElementById('productQty').value
        let productPrice = document.getElementById('productPrice').value

        let productNameError = document.querySelector('#productName ~ .error')
        let productDescriptionError = document.querySelector('#productDescription ~ .error')
        let productImageError = document.querySelector('#productImage ~ .error')
        let productQtyError = document.querySelector('#productQty ~ .error')
        let productPriceError = document.querySelector('#productPrice ~ .error')

        const noSpecialChars = /^[a-zA-Z0-9\s]*$/
        const noAlphabets = /^[0-9]*$/
        let error = true

        if (productName === '') {
            productNameError.textContent = 'Product Name is required'
        } else if (productName.length < 3) {
            productNameError.textContent = 'Must be at least 3 characters'
        } else if (productName.length > 40) {
            productNameError.textContent = 'Must be at most 50 characters'
        } else if (!noSpecialChars.test(productName)) {
            productNameError.textContent = 'Must not contain special characters'
        } else {
            productNameError.textContent = ''
            error = false
        }

        if (productDescription === '') {
            productDescriptionError.textContent = 'Product Description is required'
        } else if (!noSpecialChars.test(productDescription)) {
            productDescriptionError.textContent = 'Must not contain special characters'
        }else{
            productDescriptionError.textContent = ''
            error = false
        }

        if (!productImage) {
            productImageError.textContent = 'Product Image is required'
        }else{
            productImageError.textContent = ''
            error = false
        }

        if (productQty === '') {
            productQtyError.textContent = 'Product Quantity is required'
        } else if (!noAlphabets.test(productQty)) {
            productQtyError.textContent = 'Must be a number'
        }else{
            productQtyError.textContent = ''
            error = false
        }

        if (productPrice === '') {
            productPriceError.textContent = 'Product Price is required'
        } else if (!noAlphabets.test(productPrice)) {
            productPriceError.textContent = 'Must be a number'
        }else{
            productPriceError.textContent = ''
            error = false
        }

        return error
    }
    
    export default Products