import { useState, useEffect } from 'react'

function EditProductForm({name, description, price, qty,image,  id}){
    const [productName, setProductName] = useState(name)
    const [productDescription, setProductDescription] = useState(description)
    const [productPrice, setProductPrice] = useState(price)
    const [productQty, setProductQty] = useState(qty)
    const [productImage, setProductImage] = useState(image)


    return (
        <div className="mx-48 mt-5 py-10 px-7 rounded shadow-xl">
            <form className="w-full grid grid-cols-2 gap-4 text-sm" action="">
                <div className="flex flex-col">
                    <label htmlFor="productName">Name</label>
                    <input value={productName} onChange={(e) => setProductName(e.target.value)} className="rounded p-1 px-3 mt-2 border-1 border-gray-300" type="text" id="productName" />
                    <p className="error"></p>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="productDescription">Description</label>
                    <input value={productDescription} onChange={(e) => setProductDescription(e.target.value)} className="rounded p-1 px-3 mt-2 border-1 border-gray-300" type="text" id="productDescription" />
                    <p className="error"></p>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="productImage">Product Image</label>
                    <input className="rounded p-1 px-3 mt-2 border-1 border-gray-300" type="file" id="productImage" accept="jpg" />
                    <p className="error"></p>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="productQty">Product Quantity</label>
                    <input value={productQty} onChange={(e) => setProductQty(e.target.value)} className="rounded p-1 px-3 mt-2 border-1 border-gray-300" type="number" id="productQty" />
                    <p className="error"></p>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="productPrice">Price</label>
                    <input value={productPrice} onChange={(e) => setProductPrice(e.target.value)} className="rounded p-1 px-3 mt-2 border-1 border-gray-300" type="number" id="productPrice" />
                    <p className="error"></p>
                </div>
            </form>
            <div className="flex flex-row-reverse justify-between items-center">
                <button className="mt-5 px-6 py-1 cursor-pointer bg-green-800 hover:bg-green-700 text-white text-sm rounded">Edit product</button>
                <button className="mt-5 px-6 py-1 cursor-pointer bg-red-800 hover:bg-red-700 text-white text-sm rounded">Delete</button>
            </div>
        </div>
    )
}

export default EditProductForm