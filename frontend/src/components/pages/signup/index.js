import { Link, useNavigate } from 'react-router-dom';
import '../signup/style.css';
import { useState } from 'react';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import user from '../../../images/user.png';
import SummaryApi from '../../../common';
import {toast} from 'react-toastify';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePic: ""
    });
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(data.password === data.confirmPassword){
            const dataResponse = await fetch(SummaryApi.signUp.url, {
                method: SummaryApi.signUp.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const dataApi = await dataResponse.json();
            if(dataApi.success){
                toast.success(dataApi.message);
                navigate("/login")
            }
            if(dataApi.error){
                toast.error(dataApi.message)
            }
        }
        else{
            console.log("Please check password and confirm password");
        } 

    }

   return(
     <div className='signUpWrapper'>
        <div className='container'>
            <div className='titleBox'>
                <h2>Create an account</h2>
            </div>
            <div className='userImage'>
                <img src={user}/>
            </div>
            <div className='formBox'>
                <form action='#' onSubmit={handleSubmit}>
                    <div className='row'>
                        <label htmlFor='#'>Name:</label>
                        <div className='input-box'>
                            <input 
                              type='text'
                              name='name'
                              value={data.name}
                              placeholder='Enter your name...'
                              required
                              onChange={handleOnChange}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <label>Email:</label>
                        <div className='input-box'>
                            <input
                              type='email'
                              name='email'
                              value={data.email}
                              required
                              placeholder='Enter your email...'
                              onChange={handleOnChange}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <label>Password:</label>
                        <div 
                           className='input-box'
                           onClick={() => setShowPassword((prev) => !prev)}
                        >
                            <input
                              type={showPassword ? "text" : "password"}
                              name='password'
                              value={data.password}
                              required
                              placeholder='Enter your password...'
                              onChange={handleOnChange}
                            />
                            {
                                showPassword ? <FaEye/> : <FaEyeSlash/>
                            }
                        </div>
                    </div>
                    <div className='row'>
                        <label>Confirm Password:</label>
                        <div
                            className='input-box'
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                        >
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              name='confirmPassword'
                              value={data.confirmPassword}
                              required
                              placeholder='Enter your password...'
                              onChange={handleOnChange}
                            />
                            {
                                showConfirmPassword ? <FaEye/> : <FaEyeSlash/>
                            }
                        </div>
                    </div>
                    <div className='row'>
                        <div className='btnBox'>
                            <button type='submit'>Continue</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className='aboutAccount'>
                    <p>Already have an account ? <Link to={'/login'}>Sign in</Link></p>
            </div>
        </div>
     </div>
   )
}
export default SignUp