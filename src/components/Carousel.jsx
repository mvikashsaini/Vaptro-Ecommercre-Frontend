import React, {  useEffect } from 'react'
import { getData } from '../context/DataContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Category from './Category';

function Carousel() {
    const { data, fetchAllProducts } = getData();

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const SamplePrevArrow = ({ className, style, onClick }) => {
        return (
            <div
                className={className}
                style={{ ...style, left: "10px", zIndex: 3 }}
                onClick={onClick}
            >
                <AiOutlineArrowLeft
                    style={{
                        background: "#f53347",
                        color: "white",
                        borderRadius: "50%",
                        padding: "8px",
                        width: "35px",
                        height: "35px"
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.background = "#555")}
                    onMouseOut={(e) => (e.currentTarget.style.background = "#f53347")}
                />
            </div>
        );
    };
    
    const SampleNextArrow = ({ className, style, onClick }) => {
        return (
            <div
                className={className}
                style={{ ...style, right: "25px", zIndex: 3 }}
                onClick={onClick}
            >
                <AiOutlineArrowRight
                    style={{
                        background: "#f53347",
                        color: "white",
                        borderRadius: "50%",
                        padding: "8px",
                        width: "35px",
                        height: "35px"
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.background = "#555")}
                    onMouseOut={(e) => (e.currentTarget.style.background = "#f53347")}
                />
            </div>
        );
    };
    

    var settings = {
        dots: false,
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    

    return (
        <div>
            {/* -- Carousel -- */}
            <Slider {...settings}>
                {
                    data?.slice(8, 15)?.map((item, index) => {
                        return <div key={index} className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] -z-10">
                            <div className='flex flex-col md:flex-row gap-10 justify-center h-[600px] my-20 md:my-0 items-center px-4'>
                                <div className='md:space-y-6 space-y-3'>
                                    <h3 className='text-red-500 font-semibold font-sans text-sm'>Powering Your World With the Best in {item.category}</h3>
                                    <h1 className='md:text-4xl text-xl font-bold uppercase line-clamp-3 md:w-[500px] text-white'>{item.title}</h1>
                                    <p className='md:w-[500px] line-clamp-3 text-gray-400 pr-7'>{item.description}</p>
                                    <button className='bg-linear-to-r from-red-500 to-purple-500 text-white px-3 py-2 rounded-md cursor-pointer mt-2'>Shop Now</button>
                                </div>
                                <div>
                                    <img src={item.thumbnail} alt={item.title} className='bg-white rounded-full w-[550px] hover:scale-105 transition-all shadow-2xl shadow-red-400' />
                                </div>
                            </div>
                        </div>

                    })
                }
            </Slider>
                <Category/>
        </div>

    )
}

export default Carousel