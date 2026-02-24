import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../hooks/useLogin'

const LoginPage = () => {
    const [inputs, setInputs] = useState({
		username: '',
        email: '',
		password: '',
	})
	const {loading, login} = useLogin();

	const handleSubmit = async(e) => {
		e.preventDefault();
		await login(inputs)
	}
 	return (
        <div className='relative h-[540px] h-screen flex justify-center items-center' style={{ backgroundImage: `url('/room.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className='absolute inset-0 bg-cover bg-center backdrop-filter backdrop-blur-3xl' style={{ backgroundImage: `url('/room.jpg')` }}></div>
            <div className='relative border border-black bg-transparent backdrop-filter backdrop-blur-xl rounded-lg w-80 p-6'>
 				<h1 className='text-3xl font-bold text-center text-black'>
 					Login
 				</h1>
 				<form className=' mt-2 '
                 onSubmit={handleSubmit}>						
                    <input type='text' placeholder='Enter username' className='w-full text-white bg-slate-900 p-4 rounded-md mt-4 input input-bordered h-10' 
                    value={inputs.username}
                    onChange={(e)=>setInputs({...inputs, username:e.target.value})}/>
 				
                    <input type='text' placeholder='Enter email' className='w-full text-white bg-slate-900 p-4 rounded-md mt-4 input input-bordered h-10' 
                    value={inputs.email}
                    onChange={(e)=>setInputs({...inputs, email:e.target.value})}/>

                    <input
                        type='password'
                        placeholder='Enter Password'
                        className='w-full input bg-slate-900 text-white p-4 rounded-md mt-4 input-bordered h-10'
                            value={inputs.password}
                            onChange={(e)=>setInputs({...inputs, password:e.target.value})}
                    />
 					
                    <button className='btn bg-slate-900 rounded-md py-1 px-2 mt-4 text-white hover:text-black hover:bg-slate-400 mt-4 border border-slate-700
                    transform hover:scale-105 transition duration-300 ease-in-out'>
                    Login
                    </button>
                    <br/>
 					<Link to={"/signup"} className='text-sm font-medium text-white hover:text-black mt-4 inline-block'>
 						Don't have an account? SignUp
 					</Link>
 				</form>			
 		    </div>
        </div>
 	);
}

export default LoginPage;