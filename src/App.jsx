import Homepage from './pages/home/Homepage.jsx'
import OrderPage from './pages/Order/OrderPage.jsx'
import {Routes,Route} from 'react-router'
import './App.css'
import CheckoutPage from "./pages/checkout/CheckoutPage.jsx"
import Tracking from './pages/tracking/Tracking.jsx'
import {useState,useEffect} from 'react'
import axios from 'axios'
function App() {
   const [cart,setcart]=useState([])
    const getcartitems=async()=>{
          const response=await axios.get("/api/cart-items?expand=product");
          setcart(response.data);
        }
       useEffect(() => {
     getcartitems();
  }, [])
  return (
    <>
    <Routes>
      <Route path="/" element={<Homepage cart={cart} getcartitems={getcartitems}/>} />
      <Route path="checkout" element={<CheckoutPage cart={cart} getcartitems={getcartitems}/>} />
      <Route path="orders" element={<OrderPage cart={cart} getcartitems={getcartitems}/>} />
      <Route path="tracking/:orderId/:productId" element={<Tracking cart={cart}/>} />
      </Routes>
    </>
  )
}

export default App;
