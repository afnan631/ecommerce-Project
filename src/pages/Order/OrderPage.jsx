import "./orders.css"
import axios from 'axios'
import { useEffect, useState,Fragment } from 'react'
import Header from "../../Components/Header.jsx"
import OrderGrid from './OrderGrid.jsx'
export default function OrderPage({ cart ,getcartitems}) {
  const [orders, setorders] = useState([])
  useEffect(() => {
    const getorders=async()=>{
      const response=await axios.get('/api/orders?expand=products')
      setorders(response.data);
    }
     getorders();
  }, [])
  return (
    <>
      <title>Orders</title>
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

         <OrderGrid orders={orders} getcartitems={getcartitems}/>
      </div>
    </>
  )
}