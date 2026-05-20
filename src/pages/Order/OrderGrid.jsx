import dayjs from 'dayjs'
import {Fragment} from 'react'
import FormatMoney from '../../utilities/FormatMoney.jsx'
import {Link} from 'react-router'
import axios from 'axios'
export default function OrderGrid({orders,getcartitems}) {
    const HandleAddtocart=async(productId)=>{
        await axios.post('/api/cart-items',{
             productId,
             quantity: 1
        })
        await getcartitems();
    }
    return (
        <div className="orders-grid">
            {orders.map((orders) => {
                return (
                    <div key={orders.id} className="order-container">

                        <div className="order-header">
                            <div className="order-header-left-section">
                                <div className="order-date">
                                    <div className="order-header-label">Order Placed:</div>
                                    <div>{dayjs(orders.orderTimeMs).format('MMMM dddd')}</div>
                                </div>
                                <div className="order-total">
                                    <div className="order-header-label">Total:</div>
                                    <div>{FormatMoney(orders.totalCostCents)}</div>
                                </div>
                            </div>

                            <div className="order-header-right-section">
                                <div className="order-header-label">Order ID:</div>
                                <div>{orders.id}</div>
                            </div>
                        </div>

                        <div className="order-details-grid">
                            {orders.products.map((orderproduct) => {
                                return (
                                    <Fragment key={orderproduct.product.id}>
                                        <div className="product-image-container">
                                            <img src={orderproduct.product.image} />
                                        </div>

                                        <div className="product-details">
                                            <div className="product-name">
                                                {orderproduct.product.name}
                                            </div>
                                            <div className="product-delivery-date">
                                                Arriving on: {dayjs(orderproduct.estimatedDeliveryTimeMs).format('MMMM D')}
                                            </div>
                                            <div className="product-quantity">
                                                Quantity: {orderproduct.quantity}
                                            </div>
                                            <button className="buy-again-button button-primary">
                                                <img className="buy-again-icon" src="images/icons/buy-again.png" />
                                                <span className="buy-again-message" onClick={()=>{HandleAddtocart(orderproduct.productId)}}>Add to Cart</span>
                                            </button>
                                        </div>

                                        <div className="product-actions">
                                            <Link to={`/tracking/${orders.id}/${orderproduct.productId}`}>
                                                <button className="track-package-button button-secondary">
                                                    Track package
                                                </button>
                                            </Link>
                                        </div>
                                    </Fragment>
                                )
                            })}



                        </div>
                    </div>
                )
            })}



        </div>
    )
}