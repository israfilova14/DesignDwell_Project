import React, { useEffect, useState } from 'react';
import './style.css';
import SummaryApi from '../../../../../common';
import {toast} from 'react-toastify';
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import UpdateUser from '../update_user';

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateUser, setOpenUpdateUser] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
      email: "",
      name: "",
      role: "",
      _id: ""
  })
  const fetchAllUsers = async () => {
    try{
      const fetchData = await fetch(SummaryApi.allUsers.url, {
         method: SummaryApi.allUsers.method,
         credentials: 'include'
      });
      const dataResponse = await fetchData.json();
      if(dataResponse.success){
        setAllUsers(dataResponse?.data || []);
      }
      else if(dataResponse.error){
        toast.error(dataResponse.message);
      }
    }catch(error){
       toast.error("Error fetching users.");
       console.error("Fetch error: ", error);
    }
  }
  useEffect(() => {
    fetchAllUsers()
  },[]);

  const handleDeleteUser = async(userId) => {
     try{
       const response = await fetch(SummaryApi.deleteUser.url, {
          method: SummaryApi.deleteUser.method,
          headers: {
            'Content-Type': 'application/json'
          }, 
          body: JSON.stringify({_id: userId}),
          credentials: 'include'
       });

       const dataResponse = await response.json();

       if(dataResponse.success){
         toast.success("User deleted successfully");
         setAllUsers(allUsers.filter(user  => user._id !== userId))
       }
       else if(dataResponse.error){
         toast.error(dataResponse.message)
       }
     }catch(err){
      toast.error("Error deleting user.");
      console.error("Delete user", err)
     }
  }
  return (
    <div className='tableWrapper'>
        <div
          className='titleBox'
        >
          <h2>User <span>Management.</span></h2>
        </div>
        <table>
          <thead>
             <tr>
               <th>Id</th>
               <th>Name</th>
               <th>Email</th>
               <th>Role</th>
               <th>Created At</th>
               <th>Actions</th>
             </tr>
          </thead>
          <tbody>
             {
               Array.isArray(allUsers) && allUsers.length > 0 ? (
                   allUsers.map((element, index) => (
                     <tr key={element.id}>
                        <td>{index + 1}</td>
                        <td>{element.name}</td>
                        <td>{element.email}</td>
                        <td>{element.role}</td>
                        <td>
                          {
                            new Date(element.createdAt).toLocaleDateString()
                          }
                        </td>
                        <td>
                           <div className='actionBox'>
                              <div className='icon icon1'>
                                  <FaPen
                                    onClick={() => {
                                       setUpdateUserDetails(element)
                                       setOpenUpdateUser(true)
                                    }
                                    }
                                  />
                              </div>
                              <div className='icon icon2'>
                                  <MdDelete
                                    onClick={() => handleDeleteUser(element._id)}
                                  />
                              </div>
                           </div>
                        </td>
                     </tr>
                   ))
               )
               :
               (
                <tr>
                   <td colSpan="6">No users found.</td>
                </tr>
               )
             }
          </tbody>
        </table>
        {
           openUpdateUser && (
             <UpdateUser
                openUpdateUser = {openUpdateUser}
                setOpenUpdateUser = {setOpenUpdateUser}
                name = {updateUserDetails.name}
                email = {updateUserDetails.email}
                role = {updateUserDetails.role}
                userId = {updateUserDetails._id}
                callFunc={fetchAllUsers}
             />
           )
        }
    </div>
  )
}

export default AllUsers