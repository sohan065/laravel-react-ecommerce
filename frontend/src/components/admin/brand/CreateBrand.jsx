import React from 'react'
import { toast } from 'react-toastify'
import Header from '../../common/Header'
import Footer from '../../common/Footer'
import Sidebar from '../../common/Sidebar'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { apiUrl, getToken } from '../../common/Http'

const CreateBrand = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {

        const result = await fetch(`${apiUrl}/brands`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`,
            },
            body: JSON.stringify(data),
        });
        const res = await result.json();
        if (res.status !== 201) {
            console.error('Error creating brand:', result.message);
        }
        toast.success('Brand Create Successfully!');
        navigate('/admin/brand');
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
                                <h1>Create Brand</h1>
                                <Link to={ `/admin/brand` } className='btn btn-primary'>Go Back</Link>
                            </div>
                            <div className="col-md-12">
                                <div className="card shadow">
                                    <div className="card-body">
                                        <form onSubmit={ handleSubmit(onSubmit) } encType="multipart/form-data">
                                            <div className="mb-3">
                                                <label htmlFor="name" className="form-label">Name</label>
                                                <input
                                                    type="text"
                                                    { ...register('name', { required: true }) }
                                                    className="form-control"
                                                    id="name"
                                                    placeholder="Enter Brand Name"
                                                />
                                                { errors.name && <p className="text-danger">Category Name is required</p> }
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="status" className="form-label">Status</label>
                                                <select
                                                    { ...register('status', { required: true }) }
                                                    className="form-select"
                                                    id="status"
                                                >
                                                    <option value="">-- Select Status --</option>
                                                    <option value="1">Active</option>
                                                    <option value="0">Inactive</option>
                                                </select>
                                                { errors.status && <p className="text-danger">Status is required</p> }
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

export default CreateBrand
