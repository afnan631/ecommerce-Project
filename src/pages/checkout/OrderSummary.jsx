import dayjs from 'dayjs'
import axios from 'axios'
import FormatMoney from "../../utilities/FormatMoney.jsx"
import DeliveryOptions from './DeliveryOptions.jsx'
export default function OrderSummary({deliveryoptions,cart,getcartitems}){
    return(
         <div className="order-summary">
                    {deliveryoptions.length > 0 && cart.map((cartitem) => {
                      const SelectedDeliveryOption = deliveryoptions.find((deliveryoption) => { return deliveryoption.id === cartitem.deliveryOptionId })
                      const deletecartitem=async()=>{
                       await axios.delete(`/api/cart-items/${cartitem.productId}`)
                       await getcartitems()
                      }
                      const increment=()=>{
                        axios.put(`/api/cart-items/${cartitem.productId}`,{
                          quantity: cartitem.quantity + 1
                        })
                        getcartitems()
                      }
                      const decrement=()=>{
                        axios.put(`/api/cart-items/${cartitem.productId}`,{
                          quantity: cartitem.quantity - 1
                        })
                        getcartitems()
                      }
                      return (
                        <div key={cartitem.productId} className="cart-item-container">
                          <div className="delivery-date">
                            Delivery Date: {dayjs(SelectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd,D MMMM,YYYY')}
                          </div>
        
                          <div className="cart-item-details-grid">
                            <img className="product-image"
                              src={cartitem.product.image} />
        
                            <div className="cart-item-details">
                              <div className="product-name">
                                {cartitem.product.name}
                              </div>
                              <div className="product-price">
                                {FormatMoney(cartitem.product.priceCents)}
                              </div>
                              <div className="product-quantity">
                                <span>
                                  Quantity: <span className="quantity-label">{cartitem.quantity}</span>
                                </span>
                                <span className="update-quantity-link link-primary increment" onClick={increment} >
                                  +
                                </span>
                               {cartitem.quantity>1 && <span className="update-quantity-link link-primary decrement" onClick={decrement}>
                                  -
                                </span>}
                                <span className="delete-quantity-link link-primary" onClick={deletecartitem}>
                                  Delete
                                </span>
                              </div>
                            </div>
        
                            <DeliveryOptions deliveryoptions={deliveryoptions} cartitem={cartitem} getcartitems={getcartitems}/>
                          </div>
                        </div>
                      )
                    })}
        
                  </div>
    )
}