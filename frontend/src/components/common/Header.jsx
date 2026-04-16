import React, { useContext, useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { apiUrl } from './Http';
import { CartContext } from '../context/Cart';
import { AuthContext } from '../context/Auth';
const Header = () => {
    const [categories, setCategories] = useState([]);

    const { getTotalQty } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const fetchCategories = async () => {
        try {
            const result = await fetch(`${apiUrl}/products/categories`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                }
            });
            const res = await result.json();
            if (res.status === 200) {
                setCategories(res.data);
            } else {
                console.error('Error fetching categories:', res.message);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }
    // Call fetchCategories when the component mounts
    useEffect(() => {
        fetchCategories();
    }, [])
    return (
        <header className='shadow'>
            <div className=" text-center bg-dark text-white py-3">
                <span>Welcome to Clothing Era</span>
            </div>
            <div className="container">
                <Navbar expand="lg" className="">
                    <Navbar.Brand href="/"><img src={ logo } alt="" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            { categories && categories.map((category) => {
                                return (
                                    <Nav.Link key={ category.id } href={ `/shop?categories=${category.id}` }>{ category.name }</Nav.Link>
                                )
                            }) }
                        </Nav>
                        {/* <div className="d-flex gap-3">
                            <Link to={ `/user/login` }>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"></path></svg>
                            </Link>
                            <Link to='/cart'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="28" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16"><path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"></path></svg>
                                <span> { getTotalQty() }</span>
                            </Link>
                        </div> */}
                        <div className="d-flex gap-3 align-items-center">
                            { user && user.user ? (
                                <span className="fw-semibold">Hi, { user.user }</span>
                            ) : (
                                <>
                                    <Link to={ `/user/login` }>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                        </svg>
                                    </Link>

                                </>
                            ) }
                            <Link to='/cart'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="28" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
                                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                                </svg>
                                <span>{ getTotalQty() }</span>
                            </Link>
                        </div>

                    </Navbar.Collapse>
                </Navbar>
            </div>
        </header>
    )
}

export default Header
