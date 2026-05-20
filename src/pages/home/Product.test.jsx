import {render,screen} from '@testing-library/react'
import Product from './Product'
import {it,expect,describe,vi,beforeEach} from 'vitest'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
 
vi.mock('axios')
describe('Product Component',()=>{
    let getcartitems ;
let product ;
beforeEach(()=>{
    product={
    "id": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    "image": "images/products/athletic-cotton-socks-6-pairs.jpg",
    "name": "Black and Gray Athletic Cotton Socks - 6 Pairs",
    "rating": {
      "stars": 4.5,
      "count": 87
    },
    "priceCents": 1090,
    "keywords": ["socks", "sports", "apparel"]
  }
   getcartitems=vi.fn()
})
    it('Displays Product Component Correctly',()=>{
 
    render(<Product product={product} getcartitems={getcartitems}/>)
    expect(screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')).toBeInTheDocument();
    expect(screen.getByTestId('product-image')).toHaveAttribute('src','images/products/athletic-cotton-socks-6-pairs.jpg')
    expect(screen.getByTestId('product-rating-stars')).toHaveAttribute('src','images/ratings/rating-45.png')
    expect(screen.getByText('$10.90'))
    expect(screen.getByText('87')).toBeInTheDocument()
    })
    it("Add to Cart Button testing",async()=>{
    
    render(<Product product={product} getcartitems={getcartitems}/>)
        const user=userEvent.setup();
        const AddToCart=screen.getByTestId('add-to-cart-buttons')
        await user.click(AddToCart)
        expect(axios.post).toHaveBeenCalledWith('/api/cart-items',{
            productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 1
        })
        expect(getcartitems).toHaveBeenCalledWith()
    })
})