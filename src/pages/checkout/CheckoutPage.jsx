import './checkoutheader.css'
import {useNavigate} from 'react-router'
 import OrderSummary from './OrderSummary.jsx'
import './checkout.css'
import FormatMoney from "../../utilities/FormatMoney.jsx"
import { useState, useEffect } from 'react'
import axios from 'axios'
import CheckoutHeader from  './CheckoutHeader.jsx'
export default function CheckoutPage({ cart,getcartitems }) {
  const navigate=useNavigate()
  const [paymentsummary, setpaymentsummary] = useState({})
  const [deliveryoptions, setdeliveryoptions] = useState([]);
  useEffect(() => {
    const paymentsummary=async()=>{
       
       const response1=await
       axios.get("/api/payment-summary")
        setpaymentsummary(response1.data)
    }
      paymentsummary()
    
  }, [cart])
    useEffect(() => {
    const getdeliveryoptions=async()=>{
      const response=await
      axios.get("/api/delivery-options?expand=estimatedDeliveryTime")
       setdeliveryoptions(response.data) 
    }
     getdeliveryoptions()
    
  }, [])
  const createorder=async()=>{
    await axios.post('/api/orders')
    await getcartitems()
    navigate('/orders')
  }

  return (
    <>
      <title>Checkout</title>
       <CheckoutHeader />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary deliveryoptions={deliveryoptions} cart={cart} getcartitems={getcartitems} />
           
           {paymentsummary && 
           
           <div className="payment-summary">
              <div className="payment-summary-title">
                Payment Summary
              </div>
              <div className="payment-summary-row">
                <div>Items : {paymentsummary.totalItems}</div>
                <div className="payment-summary-money">{FormatMoney(paymentsummary.
                  productCostCents
                  )}</div>
              </div>

              <div className="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div className="payment-summary-money">{FormatMoney(paymentsummary.
                  shippingCostCents)}</div>
              </div>

              <div className="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div className="payment-summary-money">{FormatMoney(paymentsummary.totalCostBeforeTaxCents)}</div>
              </div>

              <div className="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div className="payment-summary-money">{FormatMoney(paymentsummary.taxCents)}</div>
              </div>

              <div className="payment-summary-row total-row">
                <div>Order total:</div>
                <div className="payment-summary-money">{FormatMoney(paymentsummary.totalCostCents)}
                </div>
              </div>

              <button className="place-order-button button-primary" onClick={createorder}>
                Place your order
              </button>
            </div>
            
            }
             
            
        </div>
      </div>
    </>
  )

}

