import React, { useContext, useState } from 'react'
import Layout from './common/Layout'
import { CartContext } from './context/Cart'
import { Link } from 'react-router-dom';
const Cart = () => {
    const { cartData, updateCartData, deleteCartData, subTotal, grandTotal, shippingCharge } = useContext(CartContext);
    const [qty, setQty] = useState(1);

    const handleQty = (e, itemId) => {
        const value = e.target.value;
        if (value < 1 || value > 10) {
            return;
        }
        setQty({ ...qty, [itemId]: value });
        updateCartData(itemId, value);
    }
    const handleDelete = (itemId) => {
        deleteCartData(itemId);
    }

    return (
        <>
            <Layout>
                <div className="container cart">
                    {/* breadcrumb */ }
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Cart</li>
                        </ol>
                    </nav>
                    { cartData && cartData.length > 0 ? (
                        <>
                            <div className="row">
                                <h1>Cart</h1>
                                <table>
                                    <tbody>
                                        { cartData.map((data) => (
                                            <tr key={ data.id }>
                                                <td width={ 100 }>
                                                    <img src={ data.image_url } alt="ProductImage" width={ 80 } />
                                                </td>
                                                <td width={ 600 }>
                                                    <h4>{ data.title }</h4>
                                                    <div className="display-flex flex-column">
                                                        <span>${ data.price }</span>
                                                        <div>
                                                            <span className="text-muted">Size: </span>
                                                            <span className="text-muted">{ data.size }</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        max="10"
                                                        value={ qty[data.id] || data.qty }
                                                        onChange={ (e) => handleQty(e, data.id) }
                                                        className="form-control"
                                                        style={ { width: '100px' } }
                                                    />
                                                </td>
                                                <td>
                                                    <svg
                                                        onClick={ () => handleDelete(data.id) }
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="20"
                                                        height="20"
                                                        fill="currentColor"
                                                        className="bi bi-trash3"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="..." />
                                                    </svg>
                                                </td>
                                            </tr>
                                        )) }
                                    </tbody>
                                </table>
                            </div>

                            <div className="row justify-content-end mt-5">
                                <div className="col-md-3">
                                    <div className="display-flex flex-column">
                                        <div className="d-flex justify-content-between border-bottom">
                                            <span>Subtotal</span>
                                            <span>${ subTotal }</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span>Grand Total</span>
                                            <span>${ grandTotal }</span>
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        <Link to={ `/checkout` } className="btn btn-primary mt-3 w-100">
                                            Proceed To Checkout
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <h4 className="text-center my-5">Your cart is empty</h4>
                    ) }

                </div>
            </Layout >

        </>
    )
}

export default Cart
