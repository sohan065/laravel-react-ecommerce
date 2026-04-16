import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import UserSidebar from './UserSidebar'
import { apiUrl, getUserToken } from '../common/Http'
import Loading from '../common/Loading'
import { Link } from 'react-router-dom'

const Order = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const result = await fetch(`${apiUrl}/user/orders`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${getUserToken()}`
                }
            });
            const res = await result.json();
            if (res.status === 200) {
                setLoading(false);
                setOrders(res.data);
            } else {
                console.error('Error fetching orders:', res.message);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <>
            <Header />
            <div className="container">
                <div className="row">
                    {/* sidebar */ }
                    <div className="mt-3 mb-3">
                        <h4 className="text-center">Welcome to User Dashboard</h4>
                    </div>
                    <div className="col-md-3">
                        <UserSidebar />
                    </div>
                    {/* main */ }
                    <div className="col-md-9">
                        <div className="row">
                            <div className="d-flex justify-content-between align-items-center">
                                <h1>Orders</h1>
                            </div>
                            <div className="col-md-12">
                                <div className="card shadow">
                                    <div className="card-body">

                                        { loading ? (
                                            <Loading />
                                        ) : orders && orders.length > 0 ? (
                                            <table className="table">
                                                <thead>
                                                    <tr className="text-center">
                                                        <th>Sl</th>
                                                        <th>Order Id</th>
                                                        <th>Customer</th>
                                                        <th>Email</th>
                                                        <th>Amount</th>
                                                        <th>Date</th>
                                                        <th>Payment Status</th>
                                                        <th>Order Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    { orders.map((order, index) => (
                                                        <tr className="text-center" key={ index }>
                                                            <td>{ index + 1 }</td>
                                                            <td><Link to={ `/user/order/${order.id}` }>{ order.id }</Link></td>
                                                            <td>{ order.name }</td>
                                                            <td>{ order.email }</td>
                                                            <td>{ order.grand_total }</td>
                                                            <td>{ order.created_at }</td>
                                                            <td>
                                                                { order.payment_status == 'paid' ? (
                                                                    <span className="badge text-bg-success">Paid</span>
                                                                ) : (
                                                                    <span className="badge text-bg-danger">Not Paid</span>
                                                                ) }
                                                            </td>
                                                            <td>
                                                                { order.order_status === 'pending' && (
                                                                    <span className="badge text-bg-warning">Pending</span>
                                                                ) }
                                                                { order.order_status === 'shipped' && (
                                                                    <span className="badge text-bg-primary">Shipped</span>
                                                                ) }
                                                                { order.order_status === 'delivered' && (
                                                                    <span className="badge text-bg-success">Delivered</span>
                                                                ) }
                                                                { order.order_status === 'cancelled' && (
                                                                    <span className="badge text-bg-danger">Cancelled</span>
                                                                ) }
                                                            </td>
                                                        </tr>
                                                    )) }
                                                </tbody>
                                            </table>
                                        ) : (
                                            <div className="text-center py-4">
                                                <p className="text-muted">No records found.</p>
                                            </div>
                                        ) }
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

export default Order
