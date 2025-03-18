import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import validate from '../validation/schema.js'

function SignUp() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        longitude: '',
        latitude: '',
        isSpecial: true,
        documents: null,
        role: 'vendor'
    });

    const handleChange = (e) => {
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
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        if (e.target.files.length === 0) {
            document.querySelector(`#documents ~ .error`).textContent = "Supporting document required"
            return;
        }

        setFormData({
            ...formData,
            documents: e.target.files[0],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition(
        //         (position) => {
        //             setFormData({
        //                 ...formData,
        //                 latitude: position.coords.latitude,
        //                 longitude: position.coords.longitude,
        //             } )
        //         },
        //         (error) => {
        //             console.error('Error getting location:', error);
        //         }
        //     );
        // } else {
        //     console.error('Geolocation is not supported by this browser.');
        // }

        // DB function to create vendor
        let {value, error} = validate('signUp', {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            phoneNumber: formData.phoneNumber,
        })

        if (error) {
            let message = error.details[0].message.replace(/"/g, '');
            toast.error(message)
            return
        }

        if (formData.documents === null) {
            toast.error('Supporting document required')
            return
        } else if (formData.documents.type !== 'application/pdf') {
            toast.error('Document should be in PDF format')
            return
        }else if(formData.documents.size > 5000000) {
            toast.error('Document size should not exceed 5MB')
            return
        } 

        console.log(formData);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className='bg-white py-10 px-10 rounded shadow-md w-3/6 flex flex-col items-center'>
                <h2 className="text-2xl font-bold mb-8">Kilimboga Agrovet Sign Up</h2>
                <form onSubmit={handleSubmit} className="w-full grid gap-x-4 gap-y-0 grid-cols-2">
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-3">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            id='firstName'
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border-1 border-gray-400 rounded outline-none"
                            required
                            placeholder='John'
                        />
                        <p className='error text-red-500 mt-1'></p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-3">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            id='lastName'
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border-1 border-gray-400 rounded outline-none"
                            required
                            placeholder='Doe'
                        />
                        <p className='error text-red-500 mt-1'></p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-3">Email</label>
                        <input
                            type="email"
                            name="email"
                            id='email'
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border-1 border-gray-400 rounded outline-none"
                            required
                            placeholder='doe@gmail.com'
                        />
                        <p className='error text-red-500 mt-1'></p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-3">Password</label>
                        <input
                            type="password"
                            name="password"
                            id='password'
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border-1 border-gray-400 rounded outline-none"
                            minLength="6"
                            required
                        />
                        <p className='error text-red-500 mt-1'></p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-3">Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            id='phoneNumber'
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border-1 border-gray-400 rounded outline-none"
                            required
                            placeholder='0712345678'
                        />
                        <p className='error text-red-500 mt-1'></p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-3">Upload Document</label>
                        <input
                            type="file"
                            name="documents"
                            id='documents'
                            onChange={handleFileChange}
                            className="w-full px-3 py-2 border-1 border-gray-400 rounded outline-none"
                            required
                        />
                        <p className='error text-red-500 mt-1'></p>
                    </div>
                </form>
                <button type="submit" onClick={handleSubmit} className="w-full cursor-pointer mt-3 bg-gray-800 text-white py-2 rounded">
                    Sign up
                </button>
                <h1 className='mt-3 text-gray-400'>Don't have an account? Go to <a href="/login" className='underline underline-offset-8'>Login</a> </h1>
            </div>
           <Toaster />
        </div>
    );
}

export default SignUp;