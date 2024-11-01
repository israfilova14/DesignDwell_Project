import React, { useEffect, useState } from 'react';
import './style.css';
import UploadProduct from '../upload_product';
import SummaryApi from '../../../../../common';
import AdminProductCard from '../admin_product_card';
import { toast } from 'react-toastify';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12); // Default

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url, {
      method: SummaryApi.allProduct.method,
      credentials: 'include'
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const dataResponse = await response.json();
    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  // Function to determine products per page based on screen size
  const updateProductsPerPage = () => {
    const width = window.innerWidth;
    if (width > 400 && width <= 898 ) {
      setProductsPerPage(3); // Mobile
    } else if (width >= 899 && width < 1141) {
      setProductsPerPage(6); // Tablet
    }
    else if(width >= 1142 && width < 1290){
      setProductsPerPage(9)
    }
     else {
      setProductsPerPage(12); // Desktop
    }
  };

  useEffect(() => {
    updateProductsPerPage(); // Set on initial render
    window.addEventListener('resize', updateProductsPerPage); // Update on resize

    return () => {
      window.removeEventListener('resize', updateProductsPerPage); // Cleanup
    };
  }, []);

  const handleDeleteProduct = async(productId) => {
     try{
        const response = await fetch(SummaryApi.deleteProduct.url, {
           method: SummaryApi.deleteProduct.method,
           headers: {
              'Content-Type': 'application/json'
           }, 
           body: JSON.stringify({_id: productId}),
           credentials: 'include'
        })

        const dataResponse = await response.json();

        if(dataResponse.success){
            toast.success("Product deleted successfully");
            setAllProduct(allProduct.filter(product => product._id !== productId));
        }
        else if(dataResponse.error){
            toast.error(dataResponse.message)
        }
     }catch(err){
      toast.error("Error deleting product.");
      console.error("Delete product", err)
     }
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProduct.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(allProduct.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='allProductsWrapper'>
      <div className='headerWrapper'>
        <h2>All Products</h2>
        <button onClick={() => setOpenUploadProduct(true)}>
          Upload Products
        </button>
      </div>
      <div className='adminProductCardWrapper'>
        {currentProducts.map((product, index) => (
          <AdminProductCard
            data={product}
            key={index + "allProduct"}
            fetchData={fetchAllProduct}
            handleDeleteProduct={handleDeleteProduct}
          />
        ))}
      </div>
      <div className='paginationWrapper'>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`paginationButton ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default AllProducts;
