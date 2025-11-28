import React, { useEffect } from "react";
import { getData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

function Category() {
  const {categoryOnlyData } = getData();
  const navigate = useNavigate();


  return (
    <div className="bg-[#101829] ">
      <div className="max-w-7xl mx-auto px-4 py-7 flex flex-wrap gap-4 items-center justify-center md:justify-around">
        {categoryOnlyData?.length > 0 ? (
          categoryOnlyData?.slice(0,6).map((cat, i) => (
            <button
            onClick={()=>{navigate(`/category/${cat}`)}}
              key={i}
              className="uppercase bg-linear-to-r from-red-500 to-purple-500 text-white px-3 py-1 rounded-md cursor-pointer"
            >
              {cat}
            </button>
          ))
        ) : (
          <div className="text-white">No categories found</div>
        )}
      </div>
    </div>
  );
}

export default Category;
