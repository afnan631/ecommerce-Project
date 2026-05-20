import {Link} from "react-router"
import logowhite from  "../assets/images/logo-white.png"
import mobilelogo from  "../assets/images/mobile-logo-white.png"
import searchbutton from  "../assets/images/icons/search-icon.png"
import carticon from  "../assets/images/icons/cart-icon.png"
import "./header.css"
export default function Header({cart}){
  let totalquanity =0;
  cart.forEach((items)=>{
     totalquanity +=items.quantity;
      
  })
    return(
        <>
                    <div className="header">
              <div className="left-section">
                <Link to="/" className="header-link">
                  <img className="logo"
                    src={logowhite} />
                  <img className="mobile-logo"
                    src={mobilelogo} />
                </Link>
              </div>
        
              <div className="middle-section">
                <input className="search-bar" type="text" placeholder="Search" />
        
                <button className="search-button">
                  <img className="search-icon" src={searchbutton} />
                </button>
              </div>
        
              <div className="right-section">
                <Link className="orders-link header-link" to="/orders">
        
                  <span className="orders-text">Orders</span>
                </Link>
        
                <Link className="cart-link header-link" to="/checkout">
                  <img className="cart-icon" src={carticon} />
                  <div className="cart-quantity">{totalquanity}</div>
                  <div className="cart-text">Cart</div>
                </Link>
              </div>
            </div>
        </>
    )
}