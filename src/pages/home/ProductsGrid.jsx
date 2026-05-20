import Product from './Product.jsx'
export default function ProductsGrid({products,getcartitems}){
    return(
         <div className="products-grid">
          {products.map((product) => {
             
            return (
              <Product key={product.id} product={product} getcartitems={getcartitems}/>

            );
          })}




        </div>
    )
}