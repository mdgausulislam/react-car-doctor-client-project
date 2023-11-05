import React, { useContext } from 'react';
import loginImg from '../../assets/images/login/login.svg'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
// import { FaFacebook, FaGoogle, FaInstagram } from 'react-icons/fa';

const Login = () => {

    const { login } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const handleLogin = event => {
        event.preventDefault();
        const loginForm = event.target;
        const email = loginForm.email.value;
        const password = loginForm.password.value;
        const info = { email, password }
        console.log(info);

        login(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                navigate(from, { replace: true })
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="w-1/2 mr-12">
                    <img src={loginImg} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <h1 className="text-3xl font-bold text-center">Login</h1>
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
                            <input className="btn btn-primary" type="submit" value="Login" />
                        </div>
                    </form>
                    <div className='text-center my-4 space-y-4'>
                        {/* <p>Or SIgn in with</p>
                        <button className='mr-3 bg-orange-300 p-3 rounded-full'><FaGoogle className='fill-red-500 text-2xl' /></button>
                        <button className='mr-3 bg-orange-300 p-3 rounded-full'><FaFacebook className='fill-blue-500 text-2xl' /></button>
                        <button className='bg-orange-300 p-3 rounded-full'><FaInstagram className='fill-red-700 text-2xl' /></button> */}
                        <SocialLogin></SocialLogin>
                        <p>New to Car Doctors <Link className='text-orange-600 font-bold' to='/signUp'>Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;