import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Header from '../../common/Header'
import Footer from '../../common/Footer'
import { useForm } from 'react-hook-form'
import Sidebar from '../../common/Sidebar'
import Loading from '../../common/Loading'
import { apiUrl, getToken } from '../../common/Http'
import { Link, useNavigate, useParams } from 'react-router-dom'


const Edit = () => {
    const { id } = useParams();
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const fetchCategory = async () => {
        setLoading(true);
        try {
            const result = await fetch(`${apiUrl}/categories/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`,
                }
            });
            const res = await result.json();
            if (res.status !== 200) {
                console.error('Error fetching category:', res.message);
                return;
            }
            setLoading(false);
            setCategory(res.data);
            reset(res.data); // Reset form with fetched data

        } catch (error) {
            console.error("Error fetching category:", error);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    const onSubmit = async (data) => {

        const result = await fetch(`${apiUrl}/categories/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`, // pass token to backend
            },
            body: JSON.stringify(data),
        });
        const res = await result.json();
        if (res.status !== 200) {
            console.error('Error updating category:', res.message);
            return;
        }

        toast.success('Category Update Successfully!');
        navigate('/admin/category');
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
                                <h1>Edit Category</h1>
                                <Link to={ `/admin/category` } className='btn btn-primary'>Go Back</Link>
                            </div>
                            <div className="col-md-12">
                                <div className="card shadow">
                                    <div className="card-body">
                                        { loading ? (
                                            <Loading />
                                        ) : (<form onSubmit={ handleSubmit(onSubmit) } encType="multipart/form-data">
                                            <div className="mb-3">
                                                <label htmlFor="name" className="form-label">Name</label>
                                                <input
                                                    type="text"
                                                    { ...register('name', { required: true }) }
                                                    className="form-control"
                                                    id="name"
                                                    placeholder="Enter Category Name"
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

                                            <button type="submit" className="btn btn-primary">Update</button>
                                        </form>) }
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

export default Edit
