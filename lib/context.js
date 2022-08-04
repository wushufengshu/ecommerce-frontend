import React, { createContext, useContext, useState } from "react";
import { Context } from "urql";

export const ShopContext = createContext();

export const StateContext = ({ children }) => {
    //add data for the state
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [qty, setQty] = useState(1);
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0);

    //increase product quantity 
    const increaseQty = () => {
        setQty((prevQty) => prevQty + 1)
    }
    const decreaseQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;
            return prevQty - 1
        })
    }
    // add product to cart
    const onAdd = (product, quantity) => {
        //set increase total quantity
        setTotalQuantities((prevTotal) => prevTotal + quantity)
        //set total price
        setTotalPrice((prevTotal) => prevTotal + product.price * quantity)
        // console.log(product)
        // check if product is in cart
        const exist = cartItems.find(item => item.slug === product.slug);
        if (exist) {
            setCartItems(cartItems.map((item) => item.slug === product.slug ? { ...exist, quantity: exist.quantity + quantity } : item))
        } else {
            setCartItems([...cartItems, { ...product, quantity: quantity }])
        }

    }
    //remove product
    const onRemove = (product) => {
        //set decrease total quantity
        setTotalQuantities((prevTotal) => prevTotal - product.quantity)
        //set total price
        setTotalPrice((prevTotal) => prevTotal - product.price)

        const exist = cartItems.find(item => item.slug === product.slug);
        if (exist.quantity === 1) {
            setCartItems(cartItems.filter(item => item.slug !== product.slug))
        } else {
            setCartItems(cartItems.map((item) => item.slug === product.slug ? { ...exist, quantity: exist.quantity - 1 } : item))
        }
    }
    return (
        <ShopContext.Provider value={{
            qty,
            increaseQty,
            decreaseQty,
            showCart,
            setShowCart,
            cartItems,
            onAdd,
            onRemove,
            totalQuantities,
            totalPrice
        }}>
            {children}
        </ShopContext.Provider>
    );
};

export const useStateContext = () => useContext(ShopContext)