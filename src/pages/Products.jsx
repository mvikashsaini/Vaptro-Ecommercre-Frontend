// import React, { useEffect, useState } from 'react'
// import { getData } from '../context/DataContext'
// import FiterSection from '../components/FiterSection';
// import loading from '../assets/Loading4.webm';
// import ProductCart from '../components/ProductCart';
// import Pagination from '../components/Pagination';
// import Lottie from 'lottie-react';
// import notfound from '../assets/notfound.json';

// function Products() {
//     const { data, fetchAllProducts } = getData();
//     const [search, setSearch] = useState("");
//     const [category, setCategory] = useState("All");
//     const [brand, setBrand] = useState("All");
//     const [priceRange, setPriceRange] = useState([0, 1000]);
//     const [page, setPage] = useState(1);

//     const handleCategoryChange = (e) => {
//         setCategory(e.target.value);
//         setPage(1);

//     };
//     const handleBrandChange = (e) => {
//         setBrand(e.target.value);
//         setPage(1);
//     };

//     const pageHandler = (selectedPage) => {
//         setPage(selectedPage);
//     };


//     const filterData = data?.filter((item) => {
//         const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
//         const matchesCategory = category === "All" || item.category === category;
//         const matchesBrand = brand === "All" || item.brand === brand;
//         const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
//         return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
//     });

//     const dynamicPage = Math.ceil(filterData?.length / 8);

//     useEffect(() => {
//         fetchAllProducts();
//         window.scrollTo(0, 0);
//     }, [])
//     return (
//         <div>
//             <div className='max-w-6xl mx-auto px-4 mb-10'>
//                 {
//                     data?.length > 0 ? (
                        
//                             <div className='flex gap-8'>
//                                 <FiterSection setSearch={setSearch} setCategory={setCategory} setBrand={setBrand} setPriceRange={setPriceRange} search={search} category={category} brand={brand} priceRange={priceRange} handleBrandChange={handleBrandChange} handleCategoryChange={handleCategoryChange} setPage={setPage}/>
//                                 {
//                                     filterData?.length > 0 ? (<div className='flex flex-col justify-start mt-10 items-center'>
//                                         <div className='grid md:grid-cols-4  grid-cols-2 4 md:gap-7 gap-3'>
//                                             {
//                                                 filterData?.slice(page * 8 - 8, page * 8).map((product, index) => {
//                                                     return <ProductCart key={index} product={product} />
//                                                 })
//                                             }
//                                         </div>
//                                         <Pagination pageHandler={pageHandler} page={page} dynamicPage={dynamicPage} />
//                                     </div>) : (<div className='flex justify-center items-center md:h-[600px] md:w-[900px] mt-10'>
//                                         <Lottie animationData={notfound} loop={true} classID='w-[500px]'/>
//                                     </div>)
//                                 }

//                             </div>

                        
//                     ) : (
//                         <div className='flex items-center justify-center h-[400px]'>
//                             <video muted autoPlay loop>
//                                 <source src={loading} type='video/webm' />
//                             </video>
//                         </div>)
//                 }
//             </div>
//         </div>
//     )
// }

// export default Products



import React, { useEffect, useState } from 'react'
import { getData } from '../context/DataContext'
import Loading from "../assets/Loading4.webm"
import Pagination from '../components/Pagination'
import Lottie from 'lottie-react'
import notfound from "../assets/notfound.json"
import FiterSection from '../components/FiterSection'
import ProductCart from '../components/ProductCart'
import MobileFilter from '../components/MobileFilter'

const Products = () => {
  const { data, fetchAllProducts } = getData()
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [brand, setBrand] = useState("All")
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [page, setPage] = useState(1)
  const [openFilter, setOpenFilter] = useState(false)

  useEffect(() => {
    fetchAllProducts()
    window.scrollTo(0,0)
  }, [])

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
    setPage(1)
    setOpenFilter(false)

  }
  const handleBrandChange = (e) => {
    setBrand(e.target.value)
    setPage(1)
    setOpenFilter(false)
  }

  const pageHandler = (selectedPage) => {
    setPage(selectedPage)
    window.scrollTo(0,0)
  }

  const filteredData = data?.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || item.category === category) &&
    (brand === "All" || item.brand === brand) &&
    item.price >= priceRange[0] && item.price <= priceRange[1]

  )
  const dynamicPage = Math.ceil(filteredData?.length / 8)


  return (
    <div>
      <div className='max-w-6xl mx-auto px-4 mb-10'>
        <MobileFilter openFilter={openFilter} setOpenFilter={setOpenFilter} search={search} setSearch={setSearch} brand={brand} setBrand={setBrand} priceRange={priceRange} setPriceRange={setPriceRange} category={category} setCategory={setCategory} handleCategoryChange={handleCategoryChange} handleBrandChange={handleBrandChange}/>
        {
          data?.length > 0 ? (
            <>
              <div className='flex gap-8'>
                <FiterSection search={search} setSearch={setSearch} brand={brand} setBrand={setBrand} priceRange={priceRange} setPriceRange={setPriceRange} category={category} setCategory={setCategory} handleCategoryChange={handleCategoryChange} handleBrandChange={handleBrandChange} />
                {
                  filteredData?.length > 0 ? (
                    <div className='flex flex-col justify-center items-center'>
                      <div className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-7 md:mt-[-450px]'>
                        {
                          filteredData?.slice(page * 8 - 8, page * 8).map((product, index) => {
                            return <ProductCart key={index} product={product} />
                          })
                        }
                      </div>
                      <Pagination pageHandler={pageHandler} page={page} dynamicPage={dynamicPage} />
                    </div>
                  ) : (
                    <div className='flex justify-center items-center md:h-[600px] md:w-[900px] mt-10'>
                           <Lottie animationData={notfound} classID='w-[500px]'/>
                    </div>
                  )
                }

              </div>


            </>
          ) : (
            <div className='flex items-center justify-center h-[400px]'>
              <video muted autoPlay loop>
                <source src={Loading} type='video/webm' />
              </video>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Products
