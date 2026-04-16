import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../../common/Sidebar'
import Loading from '../../common/Loading'
import { apiUrl, getToken } from '../../common/Http'
import Layout from '../../common/Layout'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const OrderDetails = () => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const fetchOrder = async () => {
        setLoading(true);
        try {
            const result = await fetch(`${apiUrl}/orders/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${getToken()}`
                }
            });
            const res = await result.json();
            if (res.status === 200) {
                setOrder(res.data);
                reset({
                    order_status: res.data.order_status,
                    payment_status: res.data.payment_status
                })
            } else {
                console.error('Error fetching order:', res.message);
            }
        } catch (error) {
            console.error('Error fetching order:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (data) => {
        try {
            const response = await fetch(`${apiUrl}/order/status/update/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${getToken()}`
                },
                body: JSON.stringify(data)
            });
            const res = await response.json();
            if (res.status === 200) {
                fetchOrder(); // Refresh order data
                toast.success('Status update Successfully!');
            } else {
                toast.success('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    return (
        <Layout>
            <div className="container my-4">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h2>Order Details</h2>
                        { loading ? (
                            <Loading />
                        ) : order ? (
                            <div className="row">
                                {/* Customer Info and Order Summary in one row */ }
                                <div className="col-md-9">
                                    <div className="row">
                                        {/* Customer Info */ }
                                        <div className="col-md-6">
                                            <div className="card mb-3 h-100">
                                                <div className="card-header">Customer Information</div>
                                                <div className="card-body">
                                                    <p><strong>Name:</strong> { order.name }</p>
                                                    <p><strong>Email:</strong> { order.email }</p>
                                                    <p><strong>Mobile:</strong> { order.mobile }</p>
                                                    <p><strong>Address:</strong> { order.address }, { order.city }, { order.state } - { order.zip }</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Order Summary */ }
                                        <div className="col-md-6">
                                            <div className="card mb-3 h-100">
                                                <div className="card-header">Order Summary</div>
                                                <div className="card-body">
                                                    <p><strong>Order Date:</strong> { order.created_at }</p>
                                                    <p><strong>Subtotal:</strong> ${ order.subtotal }</p>
                                                    <p><strong>Shipping:</strong> ${ order.shipping }</p>
                                                    <p><strong>Discount:</strong> ${ order.discount }</p>
                                                    <p><strong>Grand Total:</strong> <b>${ order.grand_total }</b></p>
                                                    <p><strong>Payment Status:</strong>{ ' ' }
                                                        <span className={ `badge ${order.payment_status === 'paid' ? 'text-bg-success' : 'text-bg-warning'}` }>
                                                            { order.payment_status }
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Status (col-md-3) */ }
                                <div className="col-md-3">
                                    <div className="card mb-3">
                                        <div className="card-header">Order Status</div>
                                        <div className="card-body">
                                            <p><strong>Current Status:</strong></p>
                                            <p>
                                                <span className={
                                                    order.order_status === 'pending' ? 'badge text-bg-warning' :
                                                        order.order_status === 'shipped' ? 'badge text-bg-primary' :
                                                            order.order_status === 'delivered' ? 'badge text-bg-success' :
                                                                'badge text-bg-danger'
                                                }>
                                                    { order.order_status }
                                                </span>
                                            </p>

                                            <form onSubmit={ handleSubmit(handleStatusUpdate) } encType="multipart/form-data">
                                                <div className="mb-2">
                                                    <label className="form-label">Order Status</label>
                                                    <select
                                                        className="form-select"
                                                        { ...register('order_status', { required: true }) }
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="shipped">Shipped</option>
                                                        <option value="delivered">Delivered</option>
                                                        <option value="cancelled">Cancelled</option>
                                                    </select>
                                                </div>
                                                <div className="mb-2">
                                                    <label className="form-label">Payment Status</label>
                                                    <select
                                                        className="form-select"
                                                        { ...register('payment_status', { required: true }) }
                                                    >
                                                        <option value="paid">Paid</option>
                                                        <option value="not paid">NOT Paid</option>

                                                    </select>
                                                </div>
                                                <button type="submit" className="btn btn-primary btn-sm w-100">Update</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                {/* Ordered Items Table */ }
                                <div className="col-md-12">
                                    <div className="card my-3">
                                        <div className="card-header">Ordered Items</div>
                                        <div className="card-body">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Product</th>
                                                        <th>Image</th>
                                                        <th>Size</th>
                                                        <th>Unit Price</th>
                                                        <th>Qty</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    { order.items.map((item, index) => (
                                                        <tr key={ item.id }>
                                                            <td>{ index + 1 }</td>
                                                            <td>{ item.name }</td>
                                                            <td><img src={ item.product.image_url } alt={ item.name } width="60" /></td>
                                                            <td>{ item.size }</td>
                                                            <td>${ item.unit_price }</td>
                                                            <td>{ item.qty }</td>
                                                            <td>${ item.price }</td>
                                                        </tr>
                                                    )) }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>No order data found.</p>
                        ) }
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default OrderDetails;
