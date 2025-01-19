import React, { useContext, useEffect, useState } from 'react';
import './style.css';
import productCategory from '../../../helpers/ProductCategory';
import SummaryApi from '../../../common';
import {useLocation, useNavigate} from 'react-router-dom';
import Context from '../../../context';
import VerticalProductCartModel from '../vertical_product_cart_model';

const ViewProductByCategoryAndFilter = () => {
   const navigate = useNavigate();
   const location= useLocation();
   const context = useContext(Context);

   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(false);
   const urlSearch = new URLSearchParams(location.search);
   const urlCategoryListInArray = urlSearch.getAll("category");
   const urlCategoryListObject = {};

   urlCategoryListInArray.forEach(element => {
      urlCategoryListObject[element] = true
   })
   const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
   const [filterCategoryList, setFilterCategoryList] = useState([]);
   const [sortBy, setSortBy] = useState("");

   const fetchData = async() => {
    setLoading(true)
    const response = await fetch(SummaryApi.filterProduct.url, {
       method: SummaryApi.filterProduct.method,
       headers: {
          "Content-Type": "application/json"
       },
       body: JSON.stringify({
          category: filterCategoryList
       })
    })
    const dataResponse = await response.json();
    setLoading(false)
    setData(dataResponse?.data || [])
  }

  const handleSelectCategory = (e) => {
    const {name, value, checked} = e.target;
    setSelectCategory((prev) => {
       return{
         ...prev,
         [value]: checked
       }
    })
  }
  useEffect(() => {
    fetchData()
  },[filterCategoryList])

  useEffect(() => {
     const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
         if(selectCategory[categoryKeyName]){
             return categoryKeyName
         }
         return null
     }).filter((element) => element)
     setFilterCategoryList(arrayOfCategory)

     const urlFormat = arrayOfCategory.map((element, index) => {
      if((arrayOfCategory.length - 1) === index){
          return `category=${element}`
      }
      return `category=${element}&&`
     })
     navigate("/product-category?" + urlFormat.join(""))
  }, [selectCategory]);

  const handleOnChangeSortByPrice = (e) => {
     const {value} = e.target;
     setSortBy(value)
     if(value === 'asc'){
        setData(
          (prev) => prev.sort((a, b) => a?.sellingPrice - b?.sellingPrice)
        )
     }
     if(value === 'dsc'){
        setData(
         (prev) => prev.sort((a, b) => b?.sellingPrice - a?.sellingPrice)
        )
     }
  }

  const handleOnChangeSortByTitle = (e) => {
   const { value } = e.target;
   setSortBy(value);

   setData((prev) => {
       const sortedData = [...prev];  

       if (value === 'nameAsc') {
           sortedData.sort((a, b) => a?.productName.localeCompare(b?.productName));
       }

       if (value === 'nameDsc') {
           sortedData.sort((a, b) => b?.productName.localeCompare(a?.productName));
       }

       return sortedData;  
   });
};

  useEffect(() => {

  },[sortBy])

  return (
    <div className='viewProductByCategoryWrapper'>
         <div className='container'>
             {/* left side */}
               <div className='sidebarWrapper'>
                  <div className='titleBox'>
                      <h3>Sort By</h3>
                  </div>
                  <div className='formBox'>
                      <form>
                         <div className='row'>
                            <input
                               type='radio'
                               name='sortBy'
                               checked={sortBy === 'asc'}
                               value={'asc'}
                               onChange={handleOnChangeSortByPrice}
                            />
                            <label>Price - Low to High</label>
                         </div>
                         <div className='row'>
                             <input
                               type='radio'
                               name='sortBy'
                               checked={sortBy === 'dsc'}
                               value={'dsc'}
                               onChange={handleOnChangeSortByPrice}
                             />
                             <label>Price - High to Low</label>
                         </div>
                         <div className='row'>
                              <input
                               type='radio'
                               name='sortBy'
                               checked = {sortBy === 'nameAsc'}
                               value={'nameAsc'}
                               onChange={handleOnChangeSortByTitle}
                              />
                              <label>Alphabetical Order - A to Z</label>
                         </div>
                         <div className='row'>
                              <input
                                 type='radio'
                                 name='sortBy'
                                 checked = {sortBy === 'nameDsc'}
                                 value={'nameDsc'}
                                 onChange={handleOnChangeSortByTitle}
                              />
                              <label>Alphabetical Order - Z to A</label>
                         </div>
                      </form>
                  </div>
                  <div className='titleBox'>
                       <h3>Category</h3>
                  </div>
                  <div className='formBox'>
                       <form>
                          {
                            
                            productCategory.map((categoryName, index) => {
                               return(
                                 <div className='row'>
                                   <input 
                                     type='checkbox'
                                     name={'category'}
                                     checked={selectCategory[categoryName?.value]}
                                     id={categoryName.value}
                                     value={categoryName?.value}
                                     onChange={handleSelectCategory}
                                   />
                                   <label
                                      htmlFor={categoryName?.value}
                                   >
                                      {categoryName?.label}
                                   </label>
                                 </div>
                               )
                            })
                          }
                       </form>
                  </div>
              </div>
           
             {/* right side */}
             <div className='displayProductBox'>
                  {
                     !loading 
                     && 
                     (
                        <p className='searchResult'>Search Results: {data?.length}</p>
                     )
                  }
                  <div>
                     {
                        <VerticalProductCartModel loading={loading} data={data}/>
                     }
                  </div>
             </div>
         </div>
    </div>
  )
}

export default ViewProductByCategoryAndFilter