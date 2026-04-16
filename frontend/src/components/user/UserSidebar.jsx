import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/Auth';
const UserSidebar = () => {
    const { logout } = useContext(AuthContext);
    return (
        <div className="card shadow">
            <div className="card-body sidebar">
                <ul>
                    <li>
                        <Link to="/user/profile">Account</Link>
                    </li>
                    <li>
                        <Link to={ `/user/order` }>Orders</Link>
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

export default UserSidebar
