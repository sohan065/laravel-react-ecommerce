import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Header from '../../common/Header'
import Footer from '../../common/Footer'
import { useForm } from 'react-hook-form'
import Sidebar from '../../common/Sidebar'
import Loading from '../../common/Loading'
import { apiUrl, getToken } from '../../common/Http'
import { Link, useNavigate, useParams } from 'react-router-dom'


const EditCoupon = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const fetchCoupon = async () => {
        setLoading(true);
        try {
            const result = await fetch(`${apiUrl}/coupon/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`,
                }
            });
            const res = await result.json();
            if (res.status !== 200) {
                console.error('Error fetching shipping charge:', res.message);
                return;
            }
            setLoading(false);
            reset(res.data); // Reset form with fetched data

        } catch (error) {
            console.error("Error fetching shipping charge:", error);
        }
    };

    useEffect(() => {
        fetchCoupon();
    }, []);

    const onSubmit = async (data) => {

        const result = await fetch(`${apiUrl}/coupon/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${getToken()}`,
            },
            body: JSON.stringify(data),
        });
        const res = await result.json();
        if (res.status !== 200) {
            console.error('Error updating coupon:', res.message);
            return;
        }

        toast.success('coupon  Update Successfully!');
        navigate('/admin/coupon');
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
                                <h1>Edit Coupon</h1>
                                <Link to={ `/admin/shipping` } className='btn btn-primary'>Go Back</Link>
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
                                                    { ...register('area_name', { required: true }) }
                                                    className="form-control"
                                                    id="name"
                                                    placeholder="area name"
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

export default EditCoupon
