import './App.css';
import Footer from './components/layout/footer';
import Header from './components/layout/header';
import {Outlet} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Context from './context';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import SummaryApi from './common';
import { setUserDetails } from './store/slices/userSlice';

function App() {
  const dispatch = useDispatch();
  const [basketProductCount, setBasketProductCount] = useState(0);
  const [favoriteProductCount, setFavoriteProductCount] = useState(0);

  const fetchUserDetails = useCallback(async () => {
     const {method, url} = SummaryApi.current_user;
     console.log(`Fetching user details from ${url} with method ${method}`);

     try{
       const response = await fetch(url, {
         method,
         headers: {
          'Content-Type': 'application/json'
        },
         credentials: 'include',
       });

       if(!response.ok){
        throw new Error(`Failed to fetch user details: ${response.status} ${response.statusText}`);
       }

       const dataApi = await response.json();
       if(dataApi.success){
          dispatch(setUserDetails(dataApi.data))
       }
       console.log('User data:', dataApi);
     }catch(error){
       console.error('Error fetching user details:', error);
       console.error('Error Stack', error.stack);
     }
  }, [dispatch]);

  const fetchUserBasketProductCount = async () => {
     const {method, url} = SummaryApi.basketProductCount;
     console.log(`Fetching basket product count from ${url} with method ${method}`);
     
     try{
       const response = await fetch(url, {
         method,
         credentials: 'include'
       })

       if(!response.ok) {
          throw new Error(`Failed to fetch basket product count: ${response.status} ${response.statusText}`);
       }

       const dataApi = await response.json();
       console.log("dataApi", dataApi);
       
       if(dataApi?.data?.count !== undefined){
         console.log(dataApi?.data?.count);
         setBasketProductCount(dataApi.data.count)
       }
       else{
         console.error("Count is undefined in the response data")
       }
     }catch(err){
       console.error("Error fetching cart product count:", err);
       console.error("Error Stack:", err.stack)
     }
  }

  const fetchUserFavoriteProductCount = async () => {
     const {method, url} = SummaryApi.favoriteProductCount;
     console.log(`Fetching favorite product count from ${url} with method ${method}`);

     try{
       const response = await fetch(url, {
        method,
        credentials: 'include'
       });
       if(!response.ok){
         throw new Error(`Failed to fetch favorite product count: ${response.status} ${response.statusText}`);
       }

       const dataApi = await response.json();
       console.log("dataApi", dataApi);
       
       if(dataApi?.data?.count !== undefined){
          console.log(dataApi.data.count);
          setFavoriteProductCount(dataApi.data.count);
       }
       else{
         console.error("Count is undefined in the response data");
       }
     }catch(err){
        console.error("Error fetching favorite product count", err);
        console.error("Error Stack:", err.stack);
     }
  }

  useEffect(() => {
     fetchUserDetails();
     fetchUserBasketProductCount();
     fetchUserFavoriteProductCount();
  }, [fetchUserDetails])

  return (
    <div className="App">
      <Context.Provider value = {
        {
          fetchUserDetails,
          basketProductCount,
          fetchUserBasketProductCount,
          favoriteProductCount,
          fetchUserFavoriteProductCount
        }
      }
      >
        <ToastContainer/>
        <Header/>
        <main>
            <Outlet/>
        </main> 
        <Footer/>
      </Context.Provider>
    </div>
  );
}

export default App;
