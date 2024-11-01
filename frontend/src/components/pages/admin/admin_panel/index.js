import React, { useEffect } from 'react';
import '../admin_panel/style.css';
import adminLogo from '../../../../images/user.png';
import {useSelector} from 'react-redux';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import ROLE from '../../../../common/role';

const AdminPanel = () => {
  const user = useSelector(state => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if(user?.role !== ROLE.ADMIN){
      navigate("/")
    }
  },[user])
  
  return(
    <div className='adminPanelWrapper'>
       <aside>
         <div className='adminLogoWrapper'>
             <img src={adminLogo} alt='Admin'/>
         </div>
         <div className='aboutAdmin'>
             <p className='admin_name'>{user?.name}</p>
             <p className='role'>{user?.role}</p>
         </div>
         <div className='navigationBox'>
             <nav>
                <div className='link-box'>
                   <Link to={'all-users'}>
                     All Users
                   </Link>
                </div>
                <div className='link-box'>
                   <Link to={'all-products'}>
                     All Products
                   </Link>
                </div>
             </nav>
         </div>
       </aside>
       <main>
          <Outlet/>
       </main>
    </div>
  )
}
export default AdminPanel