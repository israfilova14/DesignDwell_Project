import React, { useContext, useEffect, useRef, useState } from 'react';
import '../display_product_by_category/style.css';
import fetchProductByCategory from '../../../helpers/FetchProductByCategory';
import { Link } from 'react-router-dom';
import displayCurrency from '../../../helpers/DisplayCurrency';
import scrollTop from '../../../helpers/ScrollTop';
import addToBasket from '../../../helpers/addToBasket';
import Context from '../../../context';
import addToFavorite from '../../../helpers/addToFavorite';

const DisplayProductsByCategory = (
  {
    category,
    heading
  }
) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null);
  const scrollElement = useRef(null);
  const context = useContext(Context);

  const fetchData = async () => {
     setLoading(true);
     const categoryProduct = await fetchProductByCategory(category);
     setData(categoryProduct?.data);
     setLoading(false);
  }

  useEffect(() => {
     fetchData();
  }, [category]);

  const handleAddToBasket = async(e, id) => {
     await addToBasket(e,id);
     context.fetchUserBasketProductCount();
  }

  const handleAddToFavorite = async(e, id) => {
     await addToFavorite(e, id);
     context.fetchUserFavoriteProductCount();
  }

  return (
    <div className='productDisplayWrapper'>
        <div className='container'>
           <h2>{heading}</h2>
           <div 
              className='productCardWrapper scrollbar-none'
              ref={scrollElement}
           >
               {
                 loading 
                 ? 
                 (
                   loadingList.map((_, index) => (
                      <div className='loadingCard' key={index}>
                          <div className='loadingCardLeft'></div>
                          <div className='loadingCardRight'>
                              <div className='titlesBox'>
                              </div>
                              <div className='priceBox'>
                                  <p className='sellingPrice'></p>
                                  <p className='prevPrice'></p>
                              </div>
                              <div className='btnBox'>
                                  <div className='btn'></div>
                                  <div className='btn'></div>
                              </div>
                              <div className='titlesBox'>
                              </div>
                          </div>
                      </div>
                   ))
                 )
                 :
                 (
                   data.map((product, index) => (
                       <Link to={"/product/" + product?._id}>
                           <div
                             className='productCard'
                             onClick={scrollTop}
                             key={product?.productName + index}
                           >
                               <div className='imageBox'>
                                   <img
                                      src={product?.productImage[0]}
                                      className='productImage'
                                      alt={product?.productName}
                                   />
                               </div>
                               <div className='aboutProduct'> 
                                   <h2>{product?.productName}</h2>
                                   <p className='productCategory'>
                                      Category: {product?.category}
                                   </p>
                                   <div className='priceBox'>
                                      <p className='sellingPrice'>
                                          {displayCurrency(product?.sellingPrice)}
                                      </p>
                                      <p className='prevPrice'>
                                         {displayCurrency(product?.price)}
                                      </p>
                                   </div>
                                   <div className='btnBox'>
                                        <button
                                           className='basketBtn'
                                           onClick={(e) => handleAddToBasket(e, product._id)}
                                        >
                                            Add To Basket
                                        </button>
                                        <button
                                           className='wishlistBtn'
                                           onClick={(e) => handleAddToFavorite(e, product._id)}
                                        >
                                            Add To Favorite
                                        </button>
                                   </div>
                               </div>
                           </div>
                       </Link>
                   )) 
                 )
               }
           </div>
        </div>
    </div>
  )
}

export default DisplayProductsByCategory