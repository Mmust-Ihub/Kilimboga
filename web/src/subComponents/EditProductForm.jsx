import { useState, useEffect } from 'react'
import validate from '../validation/schema.js'

function EditProductForm({name, description, category, price, qty,image,  id}){
    const [formData, setFormData] = useState({
        productName: name,
        productDescription: description,
        productCategory: category,
        productImage: image,
        productQuantity: qty,
        productPrice: price
    });

    const handleEditProductFormValidate = (e) => {
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

    const handleDelete = () => {
        // To do: delete product fn
    }

    const handleEdit = () => {
        // To do: edit fn
    }

    return (
        <div className="mx-48 mt-5 py-10 px-7 rounded shadow-xl">
            <form className="w-full grid grid-cols-2 gap-4 text-sm" action="">
                <div className="flex flex-col">
                    <label htmlFor="productName">Product Name</label>
                    <input value={formData.productName} onChange={handleEditProductFormValidate} className="rounded p-1 px-3 mt-2 border-1 border-gray-300 outline-0" type="text" id="productName" name="productName" />
                    <p className="error text-red-500 mt-2"></p>

                </div>

                <div className="flex flex-col">
                    <label htmlFor="productDescription">Product Description</label>
                    <input value={formData.productDescription} onChange={handleEditProductFormValidate} className="rounded p-1 px-3 mt-2 border-1 border-gray-300 outline-0" type="text" id="productDescription" name="productDescription" />
                    <p className="error text-red-500 mt-2"></p>

                </div>

                <div className="flex flex-col">
                    <label htmlFor="productCategory">Product Category</label>
                    <select value={formData.productCategory} onChange={handleEditProductFormValidate} className="rounded p-1 px-3 mt-2 border-1 border-gray-300 outline-0" name="productCategory" id="productCategory">
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
                    <label htmlFor="productQty">Product Quantity</label>
                    <input value={formData.productQuantity} onChange={handleEditProductFormValidate} className="rounded p-1 px-3 mt-2 border-1 border-gray-300 outline-0" type="number" id="productQuantity" name="productQuantity" />
                    <p className="error text-red-500 mt-2"></p>

                </div>

                <div className="flex flex-col">
                    <label htmlFor="productPrice">Price</label>
                    <input value={formData.productPrice} onChange={handleEditProductFormValidate} className="rounded p-1 px-3 mt-2 border-1 border-gray-300 outline-0" type="number" id="productPrice" name="productPrice" />
                    <p className="error text-red-500 mt-2"></p>

                </div>
            </form>
            <div className="flex flex-row-reverse justify-between items-center">
                <button onClick={handleEdit} className="mt-5 px-6 py-1 cursor-pointer bg-green-800 hover:bg-green-700 text-white text-sm rounded">Edit product</button>
                <button onClick={handleDelete} className="mt-5 px-6 py-1 cursor-pointer bg-red-800 hover:bg-red-700 text-white text-sm rounded">Delete</button>
            </div>
        </div>
    )
}

export default EditProductForm