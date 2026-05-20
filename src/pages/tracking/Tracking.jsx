import Header from "../../Components/Header.jsx"
import "./tracking.css"
import {Link} from "react-router"
import {useEffect,useState} from 'react'
import {useParams} from 'react-router'
import axios from 'axios'
import dayjs from 'dayjs'
export default function Tracking({cart}){
  const [order,setorder]=useState(null)
  const {orderId,productId}=useParams();
   useEffect(()=>{
    const gettrackingdata=async()=>{
    let response=await axios.get(`/api/orders/${orderId}?expand=products`);
    setorder(response.data);
    }
     gettrackingdata();
   },[orderId])
   if(!order){return null}
   const productdetails= order.products.find((p)=> {return p.productId === productId})
    const TotalDeliveryTimeMs=productdetails.estimatedDeliveryTimeMs - order.orderTimeMs;
    const PassedDeliveryTime=dayjs().valueOf()-order.orderTimeMs;
    let DeliveryProgress=(PassedDeliveryTime/TotalDeliveryTimeMs) *100
    if(DeliveryProgress>100){ 
      DeliveryProgress=100;
    }
    let isShipped=null;
    let isPreparing=null;
    let isDelivered=null;
    if(DeliveryProgress<30){
      isPreparing=DeliveryProgress
    }
     if(DeliveryProgress>=30 && DeliveryProgress<100 ){
      isShipped=DeliveryProgress
    }
    if(DeliveryProgress===100 ){
      isDelivered=DeliveryProgress
    }
    return(
      
        <>
           <Header cart={cart}/>

    <div className="tracking-page">
      <div className="order-tracking">
        <Link className="back-to-orders-link link-primary" to="/orders">
          View all orders
        </Link>
        {DeliveryProgress>=100 ?   <div className="delivery-date">
          Delivered on  {dayjs(productdetails.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
        </div> : <div className="delivery-date">
          Arriving on  {dayjs(productdetails.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
        </div>}
       

        <div className="product-info">
           {productdetails.product.name}
        </div>

        <div className="product-info">
           {productdetails.quantity}
        </div>

        <img className="product-image" src={productdetails.product.image} />

        <div className="progress-labels-container">
          <div className={`progress-label ${isPreparing && 'current-status'}`}>
            Preparing
          </div>
          <div className={`progress-label ${isShipped && 'current-status'}`}>
            Shipped
          </div>
          <div className= {`progress-label ${isDelivered && 'current-status'}`}>
            Delivered
          </div>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar" style={{width:`${DeliveryProgress}%`}}></div>
        </div>
      </div>
    </div>
        </>
    )
}