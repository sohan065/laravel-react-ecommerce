import React, { useContext } from 'react'
import { AdminAuthContext } from '../context/AdminAuth'
import { Link } from 'react-router-dom';
const Sidebar = () => {
    const { logout } = useContext(AdminAuthContext);
    return (
        <div className="card shadow">
            <div className="card-body sidebar">
                <ul>
                    <li>
                        <Link to="/admin/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/admin/category">Categories</Link>
                    </li>
                    <li>
                        <Link to="/admin/brand">Brands</Link>
                    </li>
                    <li>
                        <Link to="/admin/product">Products</Link>
                    </li>
                    <li>
                        <Link to="/admin/order">Orders</Link>
                    </li>
                    <li>
                        <a href="">Users</a>
                    </li>
                    <li>
                        <Link to="/admin/shipping">Shipping Charge</Link>
                    </li>
                    <li>
                        <Link to="/admin/coupon">Coupon</Link>
                    </li>
                    <li>
                        <a href="">Change Password</a>
                    </li>
                    <li>
                        <a href="" onClick={ logout }>Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
