import FormatMoney from "../../utilities/FormatMoney.jsx"
import addedtocart from "../../assets/images/icons/checkmark.png"
import {useState} from 'react'
import axios from 'axios'
export default function Product({product,getcartitems}){
    const [quantity,setquantity]=useState(1);
    const SelectQuantity=(event)=>{
                    const selectedquantity=Number(event.target.value)
                    setquantity(selectedquantity);
                     
                  }
    const FetchCartData= async()=>{
                  await axios.post('/api/cart-items',{
                    productId:product.id,
                    quantity
                  })
                 await  getcartitems();
                }              
    return(
        <div key={product.id} className="product-container">
                <div className="product-image-container">
                  <img className="product-image" data-testid='product-image'
                    src={product.image} />
                </div>

                <div className="product-name limit-text-to-2-lines">
                  {product.name}
                </div>

                <div className="product-rating-container">
                  <img className="product-rating-stars"  data-testid='product-rating-stars'
                    src={`images/ratings/rating-${product.rating.stars * 10}.png`} />
                  <div className="product-rating-count link-primary">
                    {product.rating.count}
                  </div>
                </div>

                <div className="product-price">
                   {FormatMoney(product.priceCents)}
                </div>
                <div className="product-quantity-container">
                  <select value={quantity} onChange={SelectQuantity} >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>

                <div className="product-spacer"></div>

                <div className="added-to-cart">
                  <img src={addedtocart} />
                  Added
                </div>

                <button className="add-to-cart-button button-primary" data-testid="add-to-cart-buttons" onClick={FetchCartData}>
                  Add to Cart
                </button>
              </div>
    )
}