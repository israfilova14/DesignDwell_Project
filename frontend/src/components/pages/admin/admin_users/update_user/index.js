import React, { useState } from 'react';
import './style.css';
import { IoCloseOutline } from "react-icons/io5";
import SummaryApi from '../../../../../common';
import { toast } from 'react-toastify';
import { FaPen } from "react-icons/fa";
import Role from '../../../../../common/role';

const UpdateUser = ({
  name,
  email,
  role,
  callFunc,
  userId,
  setOpenUpdateUser
}) => {
  const [userName, setUserName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);
  const [userRole, setUserRole] = useState(role);
  const [loading, setLoading] = useState(false);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
  };

  const updateUser = async () => {
    setLoading(true);
    try {
      const fetchResponse = await fetch(SummaryApi.updateUser.url, {
        method: SummaryApi.updateUser.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          name: userName,
          email: userEmail,
          role: userRole,
        })
      });
      const responseData = await fetchResponse.json();
      
      if (responseData.success) {
        toast.success(responseData.message);
        callFunc();
      } else {
        toast.error(responseData.message || 'Failed to update user');
      }
    } catch (error) {
      toast.error('An error occurred while updating the user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='userBox'>
      <div className='updateUserModal'>
        <div
          className='close_'
          onClick={() => setOpenUpdateUser(false)}
        >
          <IoCloseOutline />
        </div>
        <h2>Update User Details</h2>
        
        <div className='update_name row'>
          <p>Name:</p>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <FaPen />
        </div>
        
        <div className='update_email row'>
          <p>Email:</p>
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <FaPen />
        </div>
        
        <div className='select'>
          <p>Role:</p>
          <select
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {
              Object.values(Role).map((element) => (
                <option value={element} key={element} className='option'>
                  {element}
                </option>
              ))
            }
          </select>
        </div>
        
        <button
          onClick={updateUser}
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Change Details'}
        </button>
      </div>
    </div>
  );
};

export default UpdateUser;
