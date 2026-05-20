 
import { useState, useEffect } from "react"
import axios from 'axios'
import './Homepage.css'
import Header from "../../Components/Header.jsx"
import ProductsGrid from './ProductsGrid.jsx'

export default function Homepage({cart,getcartitems}) {
   
  const [products, setproduct] = useState([])
  useEffect(() => {
    const gethomedata=async()=>{
      const response=await axios.get("/api/products")
        setproduct(response.data)
    }
        gethomedata()
     },[])
  return (
    <>
      <title>Ecommerce Project</title>
      <Header cart={cart} />
      <div className="home-page">
        <ProductsGrid products={products} getcartitems={getcartitems}/>
      </div>
    </>
  )
}
