import React from 'react'
import { toast } from 'react-toastify'
import Header from '../../common/Header'
import Footer from '../../common/Footer'
import Sidebar from '../../common/Sidebar'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { apiUrl, getToken } from '../../common/Http'

const CreateShipping = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {

        const result = await fetch(`${apiUrl}/shipping-charge`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${getToken()}`,
            },
            body: JSON.stringify(data),
        });
        const res = await result.json();
        if (res.status !== 201) {
            console.error('Error creating shipping charge:', result.message);
        }
        toast.success('shipping charge Create Successfully!');
        navigate('/admin/shipping');
    };

    return (
        <>
            <Header />
            <div className="container">
                <div className="row">
                    {/* sidebar */ }
                    <div className="mt-3 mb-3">
                        <h4 className="text-center">Welcome to Admin Dashboard</h4>
                    </div>
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    {/* main */ }
                    <div className="col-md-9">
                        <div className="row">
                            <div className="d-flex justify-content-between align-items-center">
                                <h1>Create Shipping Charge</h1>
                                <Link to={ `/admin/brand` } className='btn btn-primary'>Go Back</Link>
                            </div>
                            <div className="col-md-12">
                                <div className="card shadow">
                                    <div className="card-body">
                                        <form onSubmit={ handleSubmit(onSubmit) } encType="multipart/form-data">
                                            <div className="mb-3">
                                                <label htmlFor="area_name" className="form-label">Area Name</label>
                                                <input
                                                    type="text"
                                                    { ...register('area_name', { required: true }) }
                                                    className="form-control"
                                                    id="area_name"
                                                    placeholder="Enter Area Name"
                                                />
                                                { errors.area_name && <p className="text-danger">Area Name is required</p> }
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="charge" className="form-label">Charge</label>
                                                <input
                                                    type="text"
                                                    { ...register('charge', { required: true }) }
                                                    className="form-control"
                                                    id="name"
                                                    placeholder="charge amount"
                                                />
                                                { errors.charge && <p className="text-danger">Charge is required</p> }
                                            </div>

                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <Footer />
        </>
    )
}

export default CreateShipping
