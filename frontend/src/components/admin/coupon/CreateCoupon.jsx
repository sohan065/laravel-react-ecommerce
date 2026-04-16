import React from 'react';
import { toast } from 'react-toastify';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import Sidebar from '../../common/Sidebar';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { apiUrl, getToken } from '../../common/Http';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

const CreateCoupon = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        // Format to Y-m-d H:i:s
        if (data.expires_at instanceof Date) {
            data.expires_at = format(data.expires_at, 'yyyy-MM-dd HH:mm:ss');
        }

        try {
            const result = await fetch(`${apiUrl}/coupon`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`,
                },
                body: JSON.stringify(data),
            });

            const res = await result.json();
            console.log(res);
            if (res.status !== 201) {
                toast.error(res.message || 'Failed to create coupon');
                return;
            }

            toast.success('Coupon created successfully!');
            navigate('/admin/coupon');
        } catch (error) {
            console.error('Error creating coupon:', error);
            toast.error('Server error. Please try again.');
        }
    };

    return (
        <>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="mt-3 mb-3">
                        <h4 className="text-center">Welcome to Admin Dashboard</h4>
                    </div>
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            <div className="d-flex justify-content-between align-items-center">
                                <h1>Create Coupon</h1>
                                <Link to="/admin/brand" className="btn btn-primary">Go Back</Link>
                            </div>
                            <div className="col-md-12">
                                <div className="card shadow">
                                    <div className="card-body">
                                        <form onSubmit={ handleSubmit(onSubmit) }>
                                            <div className="mb-3">
                                                <label htmlFor="code" className="form-label">Code</label>
                                                <input
                                                    type="text"
                                                    { ...register('code', { required: true }) }
                                                    className="form-control"
                                                    id="code"
                                                    placeholder="Enter coupon code"
                                                />
                                                { errors.code && <p className="text-danger">Coupon code is required</p> }
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="discount" className="form-label">Discount</label>
                                                <input
                                                    type="text"
                                                    { ...register('discount', { required: true }) }
                                                    className="form-control"
                                                    id="discount"
                                                    placeholder="Enter coupon discount"
                                                />
                                                { errors.discount && <p className="text-danger">Coupon discount is required</p> }
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="discount_type" className="form-label">Discount Type</label>
                                                <select
                                                    { ...register('discount_type', { required: true }) }
                                                    className="form-select"
                                                    id="discount_type"
                                                >
                                                    <option value="">-- Select Type --</option>
                                                    <option value="percentage">Percentage</option>
                                                    <option value="fixed">Fixed</option>
                                                </select>
                                                { errors.discount_type && <p className="text-danger">Discount type is required</p> }
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="min_purchase" className="form-label">Min Purchase</label>
                                                <input
                                                    type="text"
                                                    { ...register('min_purchase') }
                                                    className="form-control"
                                                    id="min_purchase"
                                                    placeholder="Minimum purchase amount"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="usage_limit" className="form-label">Usage Limit</label>
                                                <input
                                                    type="text"
                                                    { ...register('usage_limit') }
                                                    className="form-control"
                                                    id="usage_limit"
                                                    placeholder="Usage limit"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="expires_at" className="form-label">Expiry Date</label>
                                                <Controller
                                                    name="expires_at"
                                                    control={ control }
                                                    rules={ { required: 'Expiry date is required' } }
                                                    render={ ({ field }) => (
                                                        <DatePicker
                                                            className="form-control"
                                                            placeholderText="Select expiry date and time"
                                                            selected={ field.value }
                                                            onChange={ field.onChange }
                                                            dateFormat="yyyy-MM-dd HH:mm:ss"
                                                            showTimeSelect
                                                            timeFormat="HH:mm"
                                                            timeIntervals={ 15 }
                                                            timeCaption="Time"
                                                            minDate={ new Date() }
                                                            id="expires_at"
                                                        />
                                                    ) }
                                                />
                                                { errors.expires_at && <p className="text-danger">{ errors.expires_at.message }</p> }
                                            </div>
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CreateCoupon;
