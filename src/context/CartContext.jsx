import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        if (!product) {
            console.error("Product is undefined", product);
            return;
        }

        const itemInCart = cartItems.find((item) => item.id === product.id);
        console.log("Item already in cart:", itemInCart);

        if (itemInCart) {
            const updatedCart = cartItems.map((item) =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            setCartItems(updatedCart);
            toast.success("Product is Quantity Increased!");
        } else {
            const newCart = [...cartItems, { ...product, quantity: 1 }];
            setCartItems(newCart);
            toast.success("Product is added to Cart!");
        }
    };

    const updateQuantity = (productId, action) => {
        const updatedCart = cartItems
            .map((item) => {
                if (item.id === productId) {
                    let newQty = item.quantity;
                    if (action === "increase") {
                        newQty += 1;
                        toast.success("Quantity is Increased!");
                    }
                    if (action === "decrease") {
                        newQty -= 1;

                        toast.success("Quantity is Dcreased!");
                    }

                    if (newQty <= 0) {

                        toast.success("Product is Removed");
                        return null;
                    }

                    return { ...item, quantity: newQty };
                }
                return item;
            })
            .filter((item) => item !== null);

        setCartItems(updatedCart);
    };

    const deleteItem = (productId) => {
        const updatedCart = cartItems.filter((item) => item.id !== productId);
        setCartItems(updatedCart);
        toast.success("Product is Deleted from Cart");
    };

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, addToCart, updateQuantity, deleteItem }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
