import React, { useEffect, useState } from 'react'
import Layout from './common/Layout'
import { apiUrl, getUserToken } from './common/Http';
import { useParams } from 'react-router-dom';
import Loading from './common/Loading';

const Confirmation = () => {
    const { id } = useParams();
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(true);

    const getOrderDetails = async () => {
        setLoading(true);
        try {
            const result = await fetch(`${apiUrl}/user/orders/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'authorization': `Bearer ${getUserToken()}`
                }
            });
            const res = await result.json();
            if (res.status === 200) {
                setLoading(false);
                setOrder(res.data);
            } else {
                console.error('Error fetching categories:', res.message);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    useEffect(() => {
        getOrderDetails();
    }, []);

    return (
        <>
            <Layout>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center mt-5">
                            <h1 className='text-success'>Thank You!</h1>
                            <p>Your order has been successfully placed.</p>
                        </div>
                    </div>
                    { loading && (
                        <Loading />
                    ) }
                    { !loading && (
                        <>
                            <div className="row">
                                <div className="card shadow">
                                    <div className="card-body">
                                        <h3>Order Summary</h3>
                                        <hr />
                                        <div className="row">
                                            <div className="col-md-6">
                                                <p><strong>Order ID :</strong> { order.id }</p>
                                                <p><strong>Date :</strong> { order.created_at }</p>
                                                <p><strong>Status : </strong>
                                                    { order.order_status == 'pending' && <span className='badge bg-warning'>Pending</span> }
                                                    { order.order_status == 'shipped' && <span className='badge bg-warning'>Shipped</span> }
                                                    { order.order_status == 'delivered' && <span className='badge bg-success'>Delivered</span> }
                                                    { order.order_status == 'cancelled' && <span className='badge bg-danger'>Cancelled</span> }

                                                </p>
                                                <p><strong>payment Method :</strong>COD</p>
                                            </div>
                                            <div className="col-md-6">
                                                <p><strong>Customer :</strong>{ order.name }</p>
                                                <p><strong>Address :</strong>{ order.address }</p>
                                                <p><strong>Contact :</strong>{ order.mobile }</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mt-3">
                                    <h3>Order Items</h3>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Item</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { order.items && order.items.map((item, index) => (
                                                <tr key={ index }>
                                                    <td>{ item.name }</td>
                                                    <td>{ item.qty }</td>
                                                    <td>${ item.unit_price }</td>
                                                    <td>${ item.price }</td>
                                                </tr>
                                            )) }

                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th colSpan="3" className='text-end'>SubTotal</th>
                                                <th>${ order.subtotal }</th>
                                            </tr>
                                            <tr>
                                                <th colSpan="3" className='text-end'>Shipping</th>
                                                <th>${ order.shipping }</th>
                                            </tr>
                                            <tr>
                                                <th colSpan="3" className='text-end'>Discount</th>
                                                <th>${ order.discount }</th>
                                            </tr>
                                            <tr>
                                                <th colSpan="3" className='text-end'>GrandTotal</th>
                                                <th>${ order.grand_total }</th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                    <div className="text-center mb-3">
                                        <button className='btn btn-primary'>View details</button>
                                        <button className='btn btn-secondary ms-2'>Continue Shipping</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) }
                </div>
            </Layout>
        </>
    )
}

export default Confirmation
