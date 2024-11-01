import '../header/style.css';
import { IoSearchOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import SummaryApi from '../../../common';
import {toast} from 'react-toastify'
import { logout } from '../../../store/slices/userSlice';
import { useContext, useState } from 'react';
import Context from '../../../context';

const Header = () => {
    const user = useSelector(state => state?.user?.user);
    const dispatch = useDispatch();
    console.log("user", user);
    const navigate = useNavigate();
    const context = useContext(Context);
    const [menuDisplay, setMenuDisplay] = useState(false);
    const searchInput = useLocation();
    const URLSearch = new URLSearchParams(searchInput?.search);
    const searchQuery = URLSearch.getAll("q");
    const [search, setSearch] = useState(searchQuery);

    const handleLogout = async () => {
        const fetchData = await fetch(SummaryApi.logout_user.url, {
            method: SummaryApi.logout_user.method,
            credentials: "include",
        });
        const data = await fetchData.json();
        console.log("data", data);
        if(data.success){
            toast.success(data.message);
            dispatch(logout());
            navigate("/")
        }
        if(data.error){
            toast.error(data.message)
        }
    }

    const handleSearch = (e) => {
        const {value} = e?.target;
        setSearch(value);
        if(value){
            navigate(`/search?q=${value}`)
        }
        else{
            navigate("/search")
        }
    }
    
   return(
        <div className='headerWrapper'>
            <header>
                <div className='logoBox'>
                    <Link to={'/'}>
                        <h2>DesignDwell<span>.</span></h2>
                    </Link>
                </div>
                <div className='searchBox'>
                    <div className='search'>
                        <input 
                           type='text'
                           placeholder='Search for products...'
                           value={search}
                           onChange={handleSearch}
                        />
                        <div className='searchIconBox'>
                          <IoSearchOutline/>
                        </div>
                    </div>
                </div>
                <div className='iconsBox'>
                     {
                        user?.role === 'ADMIN' && (
                            <div className='admin_panel'>
                                <div className='icon_'>
                                        <FaRegUser onClick={() => setMenuDisplay(!menuDisplay)}/>
                                </div>
                                {
                                    menuDisplay && (
                                        <div className='pop_up'>
                                            <Link to={'/admin-panel/all-products'}>Admin Panel</Link>
                                        </div>
                                    )
                                }
                         </div>
                        )
                     }
                     {
                        (user && user.role === 'GENERAL') && (
                            <Link to={"/basket"}>
                                <div className='icon_ icon'>
                                    <FiShoppingCart/>
                                    <div className='countBox'>
                                        <span>
                                            {context?.basketProductCount}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        )
                     }
                     {
                        (user && user.role === 'GENERAL') && (
                            <Link to={"/favorite"}>
                                <div className='icon_'>
                                    <FaRegHeart/>
                                </div>
                            </Link>
                        )
                     }
                     <div className='btnBox'>
                        {
                            (user) ? (
                            <button
                              onClick={handleLogout}
                            >
                                Logout
                            </button>
                            )
                            :
                            (
                         <Link to={'/login'}>
                             <button>
                                 Login
                             </button>
                         </Link>
                            )
                        }
                     </div>
                </div>
            </header>
        </div>
   )
}

export default Header