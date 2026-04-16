import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import UserSidebar from './UserSidebar';
import Loading from '../common/Loading';
import { apiUrl, getUserToken } from '../common/Http';
import { useParams } from 'react-router-dom';

const UserOrderDetails = () => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    const fetchOrder = async () => {
        setLoading(true);
        try {
            const result = await fetch(`${apiUrl}/user/orders/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${getUserToken()}`
                }
            });
            const res = await result.json();
            if (res.status === 200) {
                setOrder(res.data);
            } else {
                console.error('Error fetching order:', res.message);
            }
        } catch (error) {
            console.error('Error fetching order:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    return (
        <>
            <Header />
            <div className="container my-4">
                <div className="row">
                    <div className="mt-3 mb-3">
                        <h4 className="text-center">Welcome to User Dashboard</h4>
                    </div>

                    {/* Sidebar */ }
                    <div className="col-md-3">
                        <UserSidebar />
                    </div>

                    {/* Main Content */ }
                    <div className="col-md-9">
                        <h4>Order Details</h4>
                        { loading ? (
                            <Loading />
                        ) : order ? (
                            <div className="row">
                                {/* Customer Info + Order Summary */ }
                                <div className="col-md-9">
                                    <div className="row">
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

                                {/* Order Status */ }
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
            <Footer />
        </>
    );
};

export default UserOrderDetails;
