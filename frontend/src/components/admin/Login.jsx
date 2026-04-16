import React, { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../common/Layout';
import { AdminAuthContext } from '../context/AdminAuth';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AdminAuthContext);
    useEffect(() => {
        if (localStorage.getItem('adminInfo')) {
            navigate('/admin/dashboard');
        }
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const res = await fetch('http://127.0.0.1:8000/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.email.trim(),
                    password: data.password,
                }),
            });

            const result = await res.json();
            if (result.status === 200) {
                const adminInfo = {
                    token: result.token,
                    user: result.user,
                    id: result.id,
                }
                localStorage.setItem('adminInfo', JSON.stringify(adminInfo));
                login(adminInfo);
                toast.success('Log In Successfully!');
                navigate('/admin/dashboard');
            } else {
                toast.error(result.message || 'Log In Failed!');
                return;
            }
        } catch (error) {
            console.error('Error during login:', error);
            toast.error('Something went wrong!');
        }
    };

    return (
        <Layout>
            <div className="container d-flex justify-content-center align-items-center flex-column">
                <div className="d-flex gap-5 align-items-center my-3">
                    <h1>Admin LogIn</h1>
                    <Link to="/" className="btn btn-dark">Back</Link>
                </div>
                <div className="card mt-5 shadow login-card mb-5">
                    <div className="card-body">
                        <form onSubmit={ handleSubmit(onSubmit) }>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="text"
                                    { ...register('email', { required: true }) }
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter your email"
                                />
                                { errors.email && <p className="text-danger"> Email is required</p> }
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    { ...register('password', { required: true }) }
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter your password"
                                />
                                { errors.password && <p className="text-danger"> Password is required</p> }
                            </div>
                            <button type="submit" className="btn btn-dark">Log In</button>
                            <div className="mt-3">
                                <span>Don't have an account? <Link to="/user/registration">Register here</Link></span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Login;
