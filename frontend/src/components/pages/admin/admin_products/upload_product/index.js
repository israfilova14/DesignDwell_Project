import React, { useState } from 'react';
import '../upload_product/style.css';
import { IoMdClose } from "react-icons/io";
import productCategory from '../../../../../helpers/ProductCategory';
import { IoCloudUploadSharp } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import UploadImage from '../../../../../helpers/UploadImage';
import SummaryApi from '../../../../../common';
import {toast} from 'react-toastify';
import DisplayFullScreenImage from '../full_screen_image';

const UploadProduct = ({
  onClose,
  fetchData
}) => {
  const [data, setData] = useState({
     productName: "",
     brandName: "",
     category: "",
     productImage: "",
     description: "",
     price: "",
     sellingPrice: ""
  })
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
  const [fullScreenImage, setFullScreenImage] = useState()

  const handleOnChange = (e) => {
     const {name, value} = e.target;
     setData((prev) => {
        return{
           ...prev, 
           [name]: value
        }
     })
  } 

  const handleUploadProduct = async(e) => {
      const file = e.target.files[0];
      const uploadImageCloudinary = await UploadImage(file);
      console.log('upload image', uploadImageCloudinary.url);

      setData((prev) => {
      return{
         ...prev,
         productImage:[
         ...prev.productImage, uploadImageCloudinary.url
         ]
      }
      })
  }

  const handleDeleteProductImage = async(index) => {
     console.log("image index", index);
     const newProductImage = [...data.productImage];
     newProductImage.splice(index,1);
     setData((prev) => {
         return{
            ...prev,
            productImage: newProductImage
         }
     })
  }

  const handleSubmit = async(e) => {
     e.preventDefault();
     console.log("data", data);
     const dataResponse = await fetch(SummaryApi.uploadProduct.url, {
       method: SummaryApi.uploadProduct.method,
       credentials: 'include',
       headers: {
         "content-type": "application/json",
       },
       body: JSON.stringify(data)
     })
     const responseData = await dataResponse.json();
     if(responseData.success){
        toast.success(responseData?.message);
        onClose();
        fetchData();
     }
     if(responseData.error){
      toast.error(responseData?.error)
     }
  }
  return (
    <div className='uploadProductWrapper'>
      <div className='uploadBox'>
         <div className='uploadBoxHeader'>
             <h2>Upload Product</h2>
             <IoMdClose onClick={onClose}/>
         </div>
         <div className='formWrapper'>
             <form onSubmit={handleSubmit}>
                <div className='row'>
                    <label htmlFor='productName'>Product Name:</label>
                    <input
                        type='text'
                        id='productName'
                        placeholder='Enter product name...'
                        name='productName'
                        value={data.productName}
                        onChange={handleOnChange}
                        required
                    />
                </div>
                <div className='row'>
                    <label htmlFor='brandName'>Brand Name:</label>
                    <input
                        type='text'
                        id='brandName'
                        placeholder='Enter brand name...'
                        name='brandName'
                        value={data.brandName}
                        onChange={handleOnChange}
                        required
                    />
                </div>
                <div className='row'>
                    <label htmlFor='category'>Category:</label>
                    <select
                        name='category'
                        value={data?.category}
                        onChange={handleOnChange}
                        required
                    >
                       <option value={""}>Select Category</option>
                       {
                           productCategory.map((element, index) => {
                              return(
                                 <option
                                    value={element.value}
                                    key={element.value + index}
                                 >
                                      {element.label}
                                 </option>
                              )
                           })
                       }
                    </select>
                </div>
                <div className='row'>
                    <label className='productImage'>Product Image:</label>
                    <label className='uploadImageInput'>
                        <div className='uploadContent'>
                            <div className='cloud_box'>
                                 <IoCloudUploadSharp/>
                                 <p>Upload Product Image</p>
                            </div>
                            <input
                               type='file'
                               id='uploadImageInput'
                               onChange={handleUploadProduct}
                               required
                            />
                        </div>
                    </label>
                    <div>
                       {
                         data?.productImage[0]
                         ?
                         (
                           <div className='imgWrapper'>
                                 {
                                    data?.productImage.map((element, index) => {
                                         return(
                                          <div className='dataImgBox'>
                                                  <img
                                                     src={element}
                                                     alt='product image'
                                                     onClick={() => {
                                                        setOpenFullScreenImage(true);
                                                        setFullScreenImage(element)
                                                     }}
                                                  />
                                                   <MdDeleteOutline
                                                     className='delIcon'
                                                     onClick={() => handleDeleteProductImage(index)}
                                                   />
                                          </div>
                                         )
                                    })
                                 }
                           </div>
                         )
                         :
                         (
                           <p className='message'>*Please upload product</p>
                         )
                       }
                    </div>
                </div>
                <div className='row'>
                     <label>Price:</label>
                     <input
                        type='number'
                        id='price'
                        placeholder='Enter product price...'
                        name='price'
                        value={data.price}
                        onChange={handleOnChange}
                        required
                     />
                </div>
                <div className='row'>
                     <label htmlFor='sellingPrice'>Selling Price:</label>
                     <input
                       type='number'
                       id='sellingPrice'
                       placeholder='Enter selling price...'
                       name='sellingPrice'
                       value={data.sellingPrice}
                       onChange={handleOnChange}
                       required
                     />
                </div>
                <div className='row'>
                      <label htmlFor='productDescription'>Description:</label>
                      <textarea
                         placeholder='Enter product description...'
                         onChange={handleOnChange}
                         name='description'
                         value={data.description}
                      >

                      </textarea>
                </div>
                <button className='uploadBtn'>Upload Product</button>
             </form>
         </div>
         {/* Display Image Full Screen */}
         {
            openFullScreenImage && (
               <DisplayFullScreenImage
                  onClose={() => setOpenFullScreenImage(false)}
                  imgUrl={fullScreenImage}
               />
            )
         }
      </div>
    </div>
  )
}

export default UploadProduct