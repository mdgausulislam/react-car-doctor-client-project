import React, { useContext } from 'react';
import login from '../../assets/images/login/login.svg'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
// import { FaFacebook, FaGoogle, FaInstagram } from 'react-icons/fa';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const SignUp = () => {
    const {createUser}=useContext(AuthContext);


    const handleSignUp = event => {
        event.preventDefault();
        const signUpForm = event.target;
        const name= signUpForm.name.value;
        const email = signUpForm.email.value;
        const password = signUpForm.password.value;
        const info = { name,email, password }
        console.log(info);

        createUser(email,password)
        .then(result=>{
            const loggedUser=result.user;
            console.log(loggedUser);
        })
        .catch(error=>console.log(error))

    }
    return (
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
            <div className="w-1/2 mr-12">
                <img src={login} alt="" />
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form onSubmit={handleSignUp} className="card-body">
                    <h1 className="text-3xl font-bold text-center">Sign Up</h1>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="Name" name='name' className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" name='email' className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-3">
                        <input className="btn btn-primary" type="submit" value="SignUp" />
                    </div>
                </form>
                <div className='text-center my-4 space-y-4'>
                        {/* <p>Or SIgn in with</p>
                        <button className='mr-3 bg-orange-300 p-3 rounded-full'><FaGoogle className='fill-red-500 text-2xl' /></button>
                        <button className='mr-3 bg-orange-300 p-3 rounded-full'><FaFacebook className='fill-blue-500 text-2xl' /></button>
                        <button className='bg-orange-300 p-3 rounded-full'><FaInstagram className='fill-red-700 text-2xl' /></button> */}
                        <SocialLogin></SocialLogin>
                        <p>Have an account?  <Link className='text-orange-600 font-bold' to='/login'>Login</Link></p>
                    </div>
            </div>
        </div>
    </div>
    );
};

export default SignUp;