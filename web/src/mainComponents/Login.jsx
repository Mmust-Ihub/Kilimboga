import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import validate from '../validation/schema.js'
import Database from '../js/db.js';

const db = new Database();

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);

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

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData)

        setIsLoading(true);

        let {value, error} = validate('login', formData)

        if (error) {
            let message = error.details[0].message.replace(/"/g, '');
            toast.error(message)
            return
        }

        const res = db.login(formData)

        setIsLoading(false);

        if (!res.status) {
            toast.error(res.message)
            return
        }

        toast.success(res.message)

        if(res.user.role === 'admin'){
            window.location.href = '/admin'
        }else if(res.user.role === 'vendor'){
            window.location.href = '/'
        }else if(res.user.role === 'farmer'){
            toast.error('You are not allowed to login as a farmer')
            return
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className='bg-white py-10 px-10 rounded shadow-md w-3/6 flex flex-col items-center'>
                <h2 className="text-2xl font-bold mb-8">Kilimboga Vendor Login</h2>
                <form onSubmit={handleSubmit} className="w-full">
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
                </form>
                <button type="submit" onClick={handleSubmit} className="w-full cursor-pointer mt-3 bg-gray-800 text-white py-2 rounded">
                    {isLoading ? "Loading..." : "Login"}
                </button>
                <h1 className='mt-3 text-gray-400'>Don't have an account? Go to <a href="/signUp" className='underline underline-offset-8'>Sign up</a> </h1>
            </div>
            <Toaster />
        </div>
    );
}

export default Login;