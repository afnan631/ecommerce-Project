import dayjs from 'dayjs'
import axios from 'axios'
import FormatMoney from "../../utilities/FormatMoney.jsx"
export default function DeliveryOptions({deliveryoptions,cartitem,getcartitems}){
    return(
         <div className="delivery-options">
                              <div className="delivery-options-title">
                                Choose a delivery option:
                              </div>
                              {deliveryoptions.map((deliveryoptions) => {
                                let price = 'Free Shipping'
        
                                if (deliveryoptions.priceCents > 0) {
                                  price = `${FormatMoney(deliveryoptions.priceCents)}-Shipping`
                                }
                                const updatedeliveryoption=async()=>{
                                   await  axios.put(`/api/cart-items/${cartitem.productId}`,
                                      {
                                        deliveryOptionId: deliveryoptions.id
                                      }
                                     )
                                    await getcartitems();
                                }
                                return (
                                  <div key={deliveryoptions.id} className="delivery-option" onClick={updatedeliveryoption}>
                                    <input type="radio" checked={deliveryoptions.id === cartitem.deliveryOptionId}
                                      className="delivery-option-input" onChange={()=>{}}
                                      name={`delivery-option-${cartitem.productId}`} />
                                    <div>
                                      <div className="delivery-option-date">
                                        {dayjs(deliveryoptions.estimatedDeliveryTimeMs).format('dddd,D,MMMM,YYYY')}
        
                                      </div>
                                      <div className="delivery-option-price">
                                        {price}
                                      </div>
                                    </div>
                                  </div>
                                )
                              })}
        
        
                            </div>
    )
}