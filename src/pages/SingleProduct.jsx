import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import loading from '../assets/Loading4.webm';
import Breadcrums from '../components/Breadcrums';
import { IoCart, IoCartOutline } from 'react-icons/io5';
import { useCart } from '../context/CartContext';

function SingleProduct() {
    const params = useParams();
    const [singleProduct, setSingleProduct] = useState(null);
    const {addToCart} = useCart();

    const getSingleProduct = async () => {
        try {
            const res = await fetch(`https://dummyjson.com/products/${params.id}`);
            const product = await res.json();
            setSingleProduct(product);
            console.log("Single Product:", product);

        } catch (err) {
            console.log("Error:", err);
        }
    }

    useEffect(() => {
        getSingleProduct();
    }, []);

    // const orignalPrice = Math.round(singleProduct?.price + (singleProduct?.discountPercentage) / 100);
    const originalPrice = Math.round(singleProduct?.price / (1 - singleProduct?.discountPercentage / 100));

    return (
        <>
            {
                singleProduct ? <div className='px-4 pb-4 md:px-0'>
                    <Breadcrums title={singleProduct.title} />
                    <div className='max-w-6xl mx-auto md:p-6 gap-10 grid grid-cols-1 md:grid-cols-2'>
                        {/* product image */}
                        <div className='w-full'>
                            <img src={singleProduct.images[0]} alt={singleProduct.title} className='rounded-2xl w-full object-cover' />
                        </div>
                        {/* product details  */}
                        <div className='flex flex-col gap-8'>
                            <h1 className='md:text-3xl text-xl font-bold text-gray-800'>
                                {singleProduct.title}
                            </h1>
                            <div className='text-gray-700'>
                                {singleProduct.brand.toUpperCase()} / {singleProduct.category.toUpperCase()} /
                                {singleProduct.model}
                            </div>
                            <p className='text-xl text-red-500 font-bold'>${singleProduct.price} <span className='line-through text-gray-700'>${originalPrice}</span> <span className='bg-red-500 text-white px-4 py-2 rounded-full'>{singleProduct.discountPercentage}% discount</span></p>
                            <p className='text-gray-600 leading-7'>
                                {singleProduct.description}
                            </p>
                            {/* quantity selecter  */}
                            <div className='flex gap-4 items-center'>
                                <label htmlFor="" className='text-sm font-medium text-gray-700'>
                                    Quantity:
                                </label>
                                <input type="number" min={1} value={1} className='w-20 border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500' />

                            </div>
                            <div className='flex gap-4 mt-4'>
                                <button 
                                onClick={()=>{addToCart(singleProduct)}}
                                className='px-6 flex gap-2 py-2 text-lg bg-red-500 text-white rounded-md'><IoCartOutline className='w-6 h-6'/> Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                    :
                    <div className='flex items-center justify-center h-[400px]'>
                        <video muted autoPlay loop>
                            <source src={loading} type='video/webm' />
                        </video>
                    </div>
            }
        </>
    )
}

export default SingleProduct