import React, { use, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import validate from '../validation/schema.js'
import Database from '../js/db.js';

const db = new Database();

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
        documents: [],
        role: 'vendor'
    });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setFormData({
                    ...formData,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                } )
            })
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    },[])

    const [isLoading, setIsLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const [showOtp, setShowOtp] = useState(false);
    const [showSignUp, setShowSignUp] = useState(true);

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
            documents: [e.target.files[0]],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

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

        if (formData.documents.length < 1) {
            toast.error('Supporting document required')
            return
        } else if (formData.documents[0].type !== 'application/pdf') {
            toast.error('Document should be in PDF format')
            return
        }else if(formData.documents[0].size > 5000000) {
            toast.error('Document size should not exceed 5MB')
            return
        } 

        console.log(formData);

        const {status, message} = await db.register(formData)

        setIsLoading(false);

        if (!status) {
            toast.error(message)
            return
        }
        toast.success(message)
        toast('OTP sent to your email!')
        setShowSignUp(false);
        setShowOtp(true);
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        let {value, error} = validate('otp', {
            otp: otp,
        })

        if (error) {
            let message = error.details[0].message.replace(/"/g, '');
            toast.error(message)
            return
        }

        const {status, message} = await db.verify(otp)

        setIsLoading(false);

        if (!status) {
            toast.error(message)
            return
        }

        toast.success(message)
        window.location.href = '/login'
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className='bg-white py-10 px-10 rounded shadow-md w-3/6 flex flex-col items-center'>
                <h2 className="text-2xl font-bold mb-8">Kilimboga Agrovet Sign Up</h2>

               {showSignUp && ( 
                    <>
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
                            {isLoading ? 'Loading...' : 'Sign Up'}
                        </button>
                    </>
                )}
                
                {showOtp && (
                    <>
                        <form onSubmit={handleSubmit} className="w-full grid gap-x-4 gap-y-0 grid-cols-1">
                            <div className="mb-4">
                                <label className="block text-gray-400 mb-3">Enter OTP sent to your email</label>
                                <input
                                    type="text"
                                    name="otp"
                                    id='otp'
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full px-3 py-2 border-1 border-gray-400 rounded outline-none"
                                    required
                                    placeholder='123456'
                                />
                                <p className='error text-red-500 mt-1'></p>
                            </div>
                        </form>
                        <button type="submit" onClick={handleOtpSubmit} className="w-full cursor-pointer mt-3 bg-gray-800 text-white py-2 rounded">
                            {isLoading ? 'Loading...' : 'Verify'}
                        </button>
                    </>
                   )}

                <h1 className='mt-3 text-gray-400'>Don't have an account? Go to <a href="/login" className='underline underline-offset-8'>Login</a> </h1>
            </div>
           <Toaster />
        </div>
    );
}

export default SignUp;