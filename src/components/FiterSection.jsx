import React, { useEffect } from 'react'
import { getData } from '../context/DataContext'

function FiterSection({ setSearch, setCategory, setBrand, setPriceRange, search, category, brand, priceRange, handleBrandChange, handleCategoryChange ,setPage}) {
    const { categoryOnlyData, brandOnlyData, } = getData();

    return (
        <div className='bg-gray-100 mt-10 p-4 rounded-md h-max hidden md:block'>
            <input type="text" placeholder='Search...'
                onChange={(e) => { setSearch(e.target.value);setPage(1) }}
                value={search}
                className='bg-white p-2 rounded-md border-gray-200 border-2' />

            {/* category only data  */}
            <h1 className='mt-5 font-semibold text-xl'>Category</h1>
            <div className='flex flex-col gap-2 mt-3'>
                {
                    categoryOnlyData?.map((item, index) => {
                        return <div key={index} className='flex gap-2'>
                            <input type="checkbox" name={item} checked={category === item} value={item}
                                onChange={handleCategoryChange} />
                            <button className='cursor-pointer uppercase'>{item}</button>
                        </div>
                    })
                }
            </div>
            {/* brand only data  */}
            <h1 className='mt-5 font-semibold text-xl mb-3'>Brand</h1>
            <select name="" id="" className='bg-white w-full p-2 border-gray-200 border-2 rounded-md' value={brand} onChange={handleBrandChange}>
                {
                    brandOnlyData?.map((item, index) => {

                        return <option value={item} key={index} className='uppercase'>{item}</option>


                    })
                }
            </select>

            {/* price range  */}
            <h1 className='mt-5 font-semibold text-xl mb-3'>Price Range</h1>
            <div className='flex flex-col gap-2'>
                <label>
                    Price Range: ${priceRange?.[0] ?? 0} – ${priceRange?.[1] ?? 1000}
                </label>
                <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange?.[1] ?? 1000}
                    onChange={(e) => {
                        const newMax = Number(e.target.value);
                        setPriceRange([priceRange[0], newMax]);
                        setPage(1);
                    }}
                    className="w-full"
                />
            </div>


            <button className='bg-red-500 text-white rounded-md py-1 px-3 cursor-pointer mt-5' 
            onClick={() => {
                setSearch("");
                setCategory("All");
                setBrand("All");
                setPriceRange([0, 1000]);
                
            }}
            >Reset Filters</button>
        </div>
    )
}

export default FiterSection