import React, { use, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
import axios from 'axios'
import Category from './components/Category'
import Footer from './components/Footer'
import SingleProduct from './pages/SingleProduct'
import CategoryProduct from './pages/CategoryProduct'
import { useCart } from './context/CartContext'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const [location, setLocation] = useState();
  const { cartItems, setCartItems } = useCart()

  const getLocation = async ()=> {
    navigator.geolocation.getCurrentPosition(async position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;


      // const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
      try {
        
        const location = await axios.get(url);
        const exactLocation = location.data.address;
        setLocation(exactLocation);

      } catch (error) {
        console.log("Error fetching location data:", error);
      }
    })
  }

  useEffect(() => {getLocation();}, [])

    //Load cart from local storage on initial render
    useEffect(() => {
      const storedCart = localStorage.getItem('cartItems')
      if(storedCart){
        setCartItems(JSON.parse(storedCart))
      }
    }, []);
  
    //save cart to local storage whenever it changes
    useEffect(() => {
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])


  return (
    <BrowserRouter>
    <Navbar location={location} getLocation={getLocation}/>
    {/* <Category /> */}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/products/:id" element={<SingleProduct/>} />
        <Route path="/category/:category" element={<CategoryProduct/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path='/cart' element={<ProtectedRoute>
          <Cart location={location} getLocation={getLocation} />
        </ProtectedRoute>}></Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App