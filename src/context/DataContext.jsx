import { createContext, useContext, useState } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const fetchAllProducts = async () => {
    try {
        // const res = await fetch("https://dummyjson.com/products");
        const res = await fetch("https://dummyjson.com/products?limit=200");
        const json = await res.json();
      setData(json.products);
    //   console.log("Products fetched:", json.products);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const getUniqueCategory = (list, prop) => {
    if (!list || !Array.isArray(list)) return [];
    const values = list.map((item) => item[prop]);
    return ["All", ...new Set(values)];
  };

  const categoryOnlyData = getUniqueCategory(data, "category");
  const brandOnlyData = getUniqueCategory(data, "brand");

  return (
    <DataContext.Provider value={{ data, fetchAllProducts, categoryOnlyData , brandOnlyData}}>
      {children}
    </DataContext.Provider>
  );
};

export const getData = () => useContext(DataContext);
