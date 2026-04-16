import React, { useContext, useEffect, useState } from 'react'
import Layout from './common/Layout'
import { toast } from 'react-toastify';
import { CartContext } from './context/Cart'
import { useForm } from 'react-hook-form';
import { apiUrl, getUserToken } from './common/Http';
import { useNavigate } from 'react-router-dom';
const CheckOut = () => {
    const { cartData, subTotal, grandTotal, shippingCharge, setShippingCharge, discount, setDiscount } = useContext(CartContext);
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const navigate = useNavigate();
    const [shippingOptions, setShippingOptions] = useState([]);
    const [couponMessage, setCouponMessage] = useState('');

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const couponCode = watch('coupon');
    // Fetch shipping options from the API
    const fetchShippingOptions = async () => {
        try {
            const res = await fetch(`${apiUrl}/shipping-charge`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${getUserToken()}`,
                },
            });
            const result = await res.json();
            if (result.status === 200) {
                setShippingOptions(result.data);
            }
        } catch (error) {
            console.error('Error fetching shipping options:', error);
        }
    }
    const handleApplyCoupon = async () => {
        try {
            const res = await fetch(`${apiUrl}/apply-coupon`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${getUserToken()}`,
                },
                body: JSON.stringify({
                    code: couponCode,
                    subtotal: subTotal, // your cart subtotal
                }),
            });
            const result = await res.json();
            // console.log(result);
            if (result.status === 200) {
                setDiscount(result.discount);
                setCouponMessage(result.message);
            } else {
                setCouponMessage(result.message || 'Failed to apply coupon');
                setDiscount(0); // Reset discount if coupon application fails
            }
        } catch (error) {
            console.error('Error fetching coupon:', error);
        }
    }
    useEffect(() => {
        fetchShippingOptions();
        setCouponMessage('');
        setDiscount(0);
    }, []);

    const handlePaymentChange = (event) => {
        setPaymentMethod(event.target.value);
    };
    const proceedToOrder = async (data) => {

        if (paymentMethod === 'cod') {
            placeOrder(data, paymentMethod);
        } else {
            return;
        }
    };

    const proceedToPayment = async (data) => { }

    const placeOrder = async (data, paymentOption) => {
        const orderData = {
            ...data,
            subtotal: subTotal,
            grand_total: grandTotal,
            discount: discount,
            couponCode: couponCode || '',
            payment_status: 'not paid',
            order_status: 'pending',
            cart: cartData
        };
        try {
            const res = await fetch(`${apiUrl}/save-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getUserToken()}`,
                },
                body: JSON.stringify(orderData),
            });
            const result = await res.json();
            if (result.status === 201) {
                localStorage.removeItem('cartData');
                toast.success('Order Placed Successfully!');
                navigate(`/confirmation/${result.order_id}`);
            } else {
                toast.error(result.message || 'Order In Failed!');
                return;
            }
        } catch (error) {
            console.error('Error during order:', error);
            toast.error('Something went wrong!');
        }
    }

    return (
        <>
            <Layout>
                <div className="container">
                    {/* breadcrumb */ }
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Checkout</li>
                        </ol>
                    </nav>
                    <form onSubmit={ handleSubmit(proceedToOrder) } className="row g-3">
                        <div className="row">

                            <div className="col-md-7">
                                <div className="border-bottom">
                                    <h1>Billing Details</h1>
                                </div>

                                <div className="row">

                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text"
                                            { ...register('name', { required: true }) }
                                            className="form-control" id="name" />
                                        { errors.name && <span className="text-danger">Name is required</span> }
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email"
                                            { ...register('email', { required: true }) }
                                            className="form-control" id="email" />
                                        { errors.email && <span className="text-danger">Email is required</span> }
                                    </div>
                                    <div className="mb-3 col-md-12">
                                        <label htmlFor="address" className="form-label">Address</label>
                                        <input type="text"
                                            { ...register('address', { required: true }) }
                                            className="form-control" id="address" />
                                        { errors.address && <span className="text-danger">Address is required</span> }
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="city" className="form-label">City</label>
                                        <input type="text"
                                            { ...register('city', { required: true }) }
                                            className="form-control" id="city" />
                                        { errors.city && <span className="text-danger">City is required</span> }
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="state" className="form-label">State</label>
                                        <input type="text"
                                            { ...register('state', { required: true }) }
                                            className="form-control" id="state" />
                                        { errors.state && <span className="text-danger">State is required</span> }
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="zip" className="form-label">Zip</label>
                                        <input type="text"
                                            { ...register('zip', { required: true }) }
                                            className="form-control" id="zip" />
                                        { errors.zip && <span className="text-danger">Zip is required</span> }
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="mobile" className="form-label">Phone</label>
                                        <input type="text"
                                            { ...register('mobile', { required: true }) }
                                            className="form-control" id="mobile" />
                                        { errors.mobile && <span className="text-danger">Phone is required</span> }
                                    </div>

                                </div>
                                {/* shipping option */ }
                                <div className="mb-3">
                                    <label className="form-label d-block">Shipping Option <span className="text-danger">*</span></label>
                                    { shippingOptions && shippingOptions.length > 0 ? (
                                        shippingOptions.map((option) => (
                                            <div className="form-check" key={ option.id }>
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    id={ `shipping-${option.id}` }
                                                    value={ option.charge }
                                                    { ...register('shipping', { required: true }) }
                                                    onChange={ (e) => setShippingCharge(parseFloat(e.target.value)) }
                                                    name="shipping"
                                                />
                                                <label className="form-check-label" htmlFor={ `shipping-${option.id}` }>
                                                    { option.area_name } - ${ option.charge }
                                                </label>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No shipping options available</p>
                                    ) }
                                    { errors.shipping && <p className="text-danger">Please select a shipping option</p> }
                                </div>
                                {/* coupon */ }
                                <div className="mb-3">
                                    <label className="form-label d-block">Coupon</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            { ...register('coupon') }
                                        />
                                        <button type="button" onClick={ handleApplyCoupon } className="btn btn-outline-secondary">
                                            Apply
                                        </button>
                                    </div>
                                    { couponMessage && <p className="text-success mt-1">{ couponMessage }</p> }
                                </div>



                            </div>

                            <div className="col-md-5">
                                <div className="border-bottom">
                                    <h1>Items</h1>
                                </div>
                                <table>
                                    <tbody>
                                        { cartData && cartData.map((data) => {
                                            return (
                                                <tr key={ data.id }>
                                                    <td width={ 100 }>
                                                        <img src={ data.image_url } alt="ProductImageSix" width={ 80 } />
                                                    </td>
                                                    <td width={ 600 }>
                                                        <h4>{ data.title }</h4>
                                                        <div className="display-flex flex-column">
                                                            <span>${ data.price }</span>
                                                            <div className="">
                                                                <span className="text-muted">Size: </span>
                                                                <span className="text-muted">{ data.size }</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }) }
                                    </tbody>
                                </table>
                                <div className="row justify-content-end mt-5">
                                    <div className="col-md-4">
                                        <div className="">
                                            <div className="display-flex flex-column">
                                                <div className="d-flex justify-content-between border-bottom">
                                                    <span>Subtotal</span>
                                                    <span>${ subTotal }</span>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <span>Shipping</span>
                                                    <span>${ shippingCharge }</span>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <span>Discount</span>
                                                    <span>${ discount }</span>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <span>Grand Total</span>
                                                    <span>${ grandTotal }</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="payment-option">
                                            <h4>Payment Method</h4>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="paymentMethod"
                                                            id="paypal"
                                                            value="paypal"
                                                            checked={ paymentMethod === 'paypal' }
                                                            onChange={ handlePaymentChange }
                                                        />
                                                        <label className="form-check-label" htmlFor="paypal">
                                                            Paypal
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="paymentMethod"
                                                            id="cod"
                                                            value="cod"
                                                            checked={ paymentMethod === 'cod' }
                                                            onChange={ handlePaymentChange }
                                                        />
                                                        <label className="form-check-label" htmlFor="cod">
                                                            COD
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <button className="btn btn-primary mt-3 w-100">Pay Now</button>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </Layout>
        </>
    )
}

export default CheckOut
