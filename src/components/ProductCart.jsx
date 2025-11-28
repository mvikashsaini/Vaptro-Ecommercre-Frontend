import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCart({ product }) {
    const navigate = useNavigate();
    const {addToCart , cartItems} = useCart();
    {
        // console.log(`Product added to cart:`, cartItems);
    }

    if (!product) {
        return null;
    }

    return (
        <div className="border relative border-gray-100 rounded-2xl cursor-pointer hover:scale-105 hover:shadow-2xl transition-all p-2 h-max">
            <img
                src={product.thumbnail}
                alt={product.name}
                className="bg-gray-100 aspect-square "
                onClick={()=>navigate(`/products/${product.id}`)}
            />
            <h1 className="font-semibold line-clamp-1  p-1">{product.title}</h1>
            <p className="text-gray-800 font-bold text-lg my-1">${product.price}</p>
            <button className="bg-red-500 px-3 py-2 text-lg rounded-md text-white w-full cursor-pointer flex gap-2 items-center justify-center font-semibold" onClick={()=>{addToCart(product)}} >
                <IoCartOutline className="w-6 h-6" /> Add to Cart
            </button>
        </div>
    );
}

export default ProductCart;
