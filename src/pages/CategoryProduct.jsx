import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from "../assets/Loading4.webm"
import { ChevronLeft } from 'lucide-react'
import ProductListView from '../components/ProductListView'
import Pagination from '../components/Pagination'

function CategoryProduct() {
    const params = useParams()
    const category = params.category  
    const navigate = useNavigate()
    const [searchData, setSearchData] = useState([])

    const [page, setPage] = useState(1)
    const itemsPerPage = 6
    const dynamicPage = Math.ceil(searchData?.length / itemsPerPage)


    const getFilterData = async () => {
        const baseUrl = "https://dummyjson.com/products?limit=194"
        const finalUrl = category === "All" ? baseUrl : `https://dummyjson.com/products/category/${category}`

        try {
            const res = await fetch(finalUrl)
            const dat = await res.json()
            setSearchData(dat.products)
            console.log(dat.products);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFilterData()
        setPage(1)
        window.scrollTo(0, 0)
    }, [category])


    return (
        <div>
            {
                searchData.length > 0 ? <div className="max-w-6xl mx-auto mt-10 mb-10 px-4">

                    <button onClick={() => navigate('/')} className='bg-gray-800 mb-5 text-white px-3 py-1 rounded-md cursor-pointer flex gap-1 items-center'>
                        <ChevronLeft /> Back
                    </button>

                    {searchData
                        .slice(page * itemsPerPage - itemsPerPage, page * itemsPerPage)
                        .map((product, index) => {
                            return <ProductListView key={index} product={product} />
                        })
                    }

                    {/*  Pagination */}
                    <Pagination pageHandler={setPage} page={page} dynamicPage={dynamicPage} />

                </div> :

                    <div className='flex items-center justify-center h-[400px]'>
                        <video muted autoPlay loop>
                            <source src={Loading} type='video/webm' />
                        </video>
                    </div>
            }
        </div>
    )
}

export default CategoryProduct

