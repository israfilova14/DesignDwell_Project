import { useContext, useState } from 'react';
import '../login/style.css';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import Context from '../../../context';
import SummaryApi from '../../../common';
import { toast } from 'react-toastify';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const {fetchUserDetails} = useContext(Context);

    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setData((prev) => {
            return{
                ...prev,
                [name] : value,
            }
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const dataResponse = await fetch(SummaryApi.signIn.url, {
            method: SummaryApi.signIn.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const dataApi = await dataResponse.json();
        if(dataApi.success){
            toast.success(dataApi.message);
            navigate("/");
            fetchUserDetails()
        }
        if(dataApi.error){
            toast.error(dataApi.message)
        }
    }
    return(
        <div className="loginWrapper">
            <div className='container'>
                 <div className='titleBox'>
                    <h2>Sign In</h2>
                 </div>
                 <div className='formBox'>
                    <form action='#' onSubmit={handleSubmit}>
                         <div className='row'>
                            <label htmlFor='#'>Email:</label>
                            <div className='input-box'>
                                <input
                                  type='email'
                                  name='email'
                                  value={data.email}
                                  placeholder='Enter your email...'
                                  onChange={handleOnChange}
                                />
                            </div>
                         </div>
                         <div className='row'>
                            <label htmlFor='#'>Password:</label>
                            <div 
                                className='input-box'
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                <input
                                  type={showPassword ? 'text' : 'password'}
                                  name='password'
                                  value={data.password}
                                  placeholder='Enter your password...'
                                  onChange={handleOnChange}
                                />
                                {
                                    showPassword
                                    ?
                                    (
                                        <FaEye/>
                                    )
                                    :
                                    (
                                        <FaEyeSlash/>
                                    )
                                }
                            </div>
                         </div>
                         <div className='row'>
                            <div className='btnBox'>
                                <button>Continue</button>
                            </div>
                         </div>
                    </form>
                 </div>
                 <div className='aboutAccount'>
                          <p>Don't have an account ? <Link to={'/signup'}>Sign Up</Link></p>
                 </div>
            </div>
        </div>
    )
}

export default Login