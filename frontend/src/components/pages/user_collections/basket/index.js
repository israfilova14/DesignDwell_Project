import React, { useContext, useEffect, useState } from 'react';
import '../basket/style.css';
import Context from '../../../../context';
import SummaryApi from '../../../../common';
import { MdDelete } from "react-icons/md";
import displayCurrency from '../../../../helpers/DisplayCurrency';

const Basket = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.basketProductCount).fill(null);
 
   const fetchData = async () => {
     const response = await fetch(SummaryApi.addToBasketProductView.url, {
       method: SummaryApi.addToBasketProductView.method,
       credentials: 'include',
       headers: {
        "Content-Type": "application/json"
       }
     })
     const responseData = await response.json();

     if(responseData.success){
      setData(responseData.data);
     }
   }

   const handleLoading = async() => {
       setLoading(true);
       await fetchData();
       setLoading(false);
   }

   useEffect(() => {
      handleLoading();
   }, [])

   const increaseQty = async(id, qty) => {
    console.log(`Increasing qty for product: ${id}. Current qty: ${qty}`);
    const response = await fetch(SummaryApi.updateBasketProduct.url, {
       method: SummaryApi.updateBasketProduct.method,
       credentials: 'include',
       headers: {
        "Content-Type": "application/json"
       },
       body: JSON.stringify({
         _id: id,
         quantity: qty + 1
       })
    })
    
     const responseData = await response.json();
     console.log('Response from server:', responseData);
     
     if(responseData.success){
       fetchData()
     }
   }

   const decreaseQty = async(id, qty) => {
     if(qty > 1){
        const response = await fetch(SummaryApi.updateBasketProduct.url, {
           method: SummaryApi.updateBasketProduct.method,
           credentials: 'include',
           headers: {
            'Content-Type': "application/json"
           },
           body: JSON.stringify({
             _id: id,
             quantity: qty - 1
           })
        })
        const responseData = await response.json();
        if(responseData.success){
          fetchData()
        }
     }
   }

   const deleteBasketProductCard = async(id) => {
     const response = await fetch(SummaryApi.deleteBasketProduct.url, {
       method: SummaryApi.deleteBasketProduct.method,
       credentials: 'include',
       headers: {
        "Content-Type": "application/json"
       },
       body: JSON.stringify(
        {
         _id: id
        }
      )
     })
     const responseData = await response.json();
     if(responseData.success){
       fetchData();
       context.fetchUserBasketProductCount()
     }
   }

   const totalQty = data.reduce((prevValue, currentValue) => {
      return prevValue + currentValue.quantity
   }, 0)

   const totalPrice = data.reduce((prev, curr) => {
     return prev + curr.quantity * curr?.productId?.sellingPrice
   },0)
   
  return (
    <div className='basketWrapper scrollbar-none'>
      <div className='container'>
          {
              data.length === 0 && !loading && (
                <div className='basketEmptyBox'>
                    <h2>Your basket is empty</h2>
                </div>
              )
          }
         <div className='basketBox'>
             {
               loading 
               ? 
               (
                <div className='loadingCards'>
                   {
                     loadingCart.map((element, index) => {
                         return (
                          <div
                            key={index + "loadingBox"}
                            className='loadingBox'
                          >
                          </div>
                         )
                     })
                   }
                </div>
               )
               :
               (
                <div className='basketCards'>
                   {
                     data.map((product) => (
                       <div 
                         className='basketCard'
                         key={product?._id + "basket cart"}
                       >
                          <div className='basketImageBox'>
                             <img
                               src={product?.productId?.productImage[0]}
                               className='basketProductImage'
                             />
                          </div>
                          <div className='aboutBasketProduct'>
                             <div
                               className='deleteIconBox'
                               onClick={() => deleteBasketProductCard(product?._id)}
                             >
                                 <MdDelete/>
                             </div>
                             <h2 className='productTitle'>
                                {product?.productId?.category}
                             </h2>
                             <p className='productCategory'>
                                 Category: {product?.productId?.category}
                             </p>
                             <div className='priceBox'>
                             <p className='productPrice'>
                                 {displayCurrency(product?.productId?.sellingPrice)}
                             </p>
                             <p className='totalPrice'>
                                 {displayCurrency(product?.productId?.sellingPrice * product?.quantity)}
                             </p>
                          </div>
                          <div className='btnBox'>
                             <button
                               className='decBtn'
                               onClick={() => decreaseQty(product?._id, product?.quantity)}
                             >
                                 -
                             </button>
                             <span>{product?.quantity}</span>
                             <button
                               className='incBtn'
                               onClick={() => increaseQty(product?._id, product?.quantity)}
                             >
                                 +
                             </button>
                          </div>
                          </div>
                       </div>
                     ))
                   }
                </div>
               )
             }
         </div>
         <div className='paymentWrapper'>
            {
              loading
              ?
              (
                <div className='paymentLoadBox'>
                </div>
              )
              :
              (
                <div className='paymentBox'>
                   <div className='paymentBoxTitle'>
                      <h2>Your Order Details</h2>
                   </div>
                   <div className='quantityBox'>
                      <p>Quantity:</p>
                      <p>{totalQty}</p>
                   </div>
                   <div className='totalPriceBox'>
                      <p>Total Price:</p>
                      <p>{displayCurrency(totalPrice)}</p>
                   </div>
                   <div className='paymentButtonBox'>
                     <button>Payment</button>
                   </div>
                </div>
              )
            }
         </div>
      </div>  
    </div>
  )
}

export default Basket