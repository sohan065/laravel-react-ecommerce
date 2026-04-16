import js from "@eslint/js";
import { createContext, useState } from "react";


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartData, setCartData] = useState(localStorage.getItem('cartData') ? JSON.parse(localStorage.getItem('cartData')) : []);
    const [shippingCharge, setShippingCharge] = useState(0);
    const [discount, setDiscount] = useState(0);
    const addToCart = (product, size) => {

        const updateCart = [...cartData];
        if (cartData.length == 0) {
            updateCart.push({
                id: `${product.id}-${Math.floor(Math.random() * 1000)}`,
                product_id: product.id,
                title: product.title,
                price: product.price,
                image_url: product.image_url,
                size: size.size.name,
                qty: 1,
                unit_price: product.price
            });
        } else {
            const existingProductIndex = updateCart.findIndex(item => item.product_id === product.id && item.size === size.size.name);
            if (existingProductIndex !== -1) {
                updateCart[existingProductIndex].qty += 1;
            } else {
                updateCart.push({
                    id: `${product.id}-${Math.floor(Math.random() * 1000)}`,
                    product_id: product.id,
                    title: product.title,
                    price: product.price,
                    image_url: product.image_url,
                    size: size.size.name,
                    qty: 1,
                    unit_price: product.price
                });
            }
        }
        setCartData(updateCart);
        localStorage.setItem('cartData', JSON.stringify(updateCart));
    }

    // update cart data
    const updateCartData = (id, qty) => {
        const updateCart = [...cartData];
        const productIndex = updateCart.findIndex(item => item.id === id);
        if (productIndex !== -1) {
            updateCart[productIndex].qty = qty;
            setCartData(updateCart);
            localStorage.setItem('cartData', JSON.stringify(updateCart));
        }
    }

    // delete cart data
    const deleteCartData = (id) => {
        const updateCart = cartData.filter(item => item.id !== id);
        setCartData(updateCart);
        localStorage.setItem('cartData', JSON.stringify(updateCart));
    }

    // get total qty
    const getTotalQty = () => {
        return cartData.reduce((total, item) => total + parseInt(item.qty, 10), 0);

    };


    const subTotal = cartData.reduce((acc, item) => acc + (item.price * item.qty), 0);
    // const shippingCharge = subTotal > 100 ? 0 : 10;
    const grandTotal = subTotal + shippingCharge - discount;

    return (
        <CartContext.Provider value={ { cartData, addToCart, updateCartData, deleteCartData, getTotalQty, subTotal, shippingCharge, setShippingCharge, discount, setDiscount, grandTotal } }>
            { children }
        </CartContext.Provider>
    )
}