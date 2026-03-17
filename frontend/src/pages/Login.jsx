import React, { useState } from 'react'
import logo from '../assets/logo.jpg'
import google from '../assets/google.jpg'
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { serverUrl } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/firebase.js';
import { FaArrowLeftLong } from 'react-icons/fa6';


const Login = () => {
 
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState("password")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin =async (e)=>{
    setLoading(true)   
    try {
        e.preventDefault();
        const result = await axios.post(serverUrl + "/api/auth/login",
           {email,password}, //email and password given to the server
           {withCredentials:true}) // for setting the cookies
           dispatch(setUserData(result.data))
           setLoading(false)
           navigate('/')
           toast.success("Login Successfully!")
          
       } catch (error) {
        console.log(error);
        setLoading(false);
        toast.error(error.response.data.message)
       }
  }

  // GoogleLogin with firebase
  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth,provider)
      let user = response.user;
      let name = user.displayName;
      let email = user.email;
      let role = ""
      
      const result = await axios.post(serverUrl + "/api/auth/googleauth",
        {name,email,role},{withCredentials:true})
        dispatch(setUserData(result.data))
        navigate("/")
        toast.success("Login successfully")
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  return (
  <div className='bg-[#dddbdb] w-full h-screen flex items-center justify-center '>
             <form className=' relative w-[90%] md:w-200 h-150 bg-white shadow-xl rounded-2xl flex'>
                      <FaArrowLeftLong className='absolute top-[4%] left-[4%] w-[22px] h-[22px] cursor-pointer'onClick={()=>navigate('/')} />
                   {/* left div */}
                   <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3'>
                        <div>
                          <h1 className='font-semibold text-black text-2xl '>Welcome back</h1>
                            <h2 className='text-[#999797] text-[18px]'>Login to your account</h2>
                        </div>
                             <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 '>
                            
                                    <label htmlFor="email" className='font-semibold'>Email</label>
                                  <input id='email' type="email" required onChange={(e)=> setEmail(e.target.value)} value={email} 
                                  className='border-1 w-[100%] h-[45px] border-[#e7e6e6]  text-[15px] px-[20px] mb-3' 
                                  placeholder='Your email' />
                                    <label htmlFor="password" className='font-semibold'>Password</label>
                                     <div className='w-[100%] flex items-center border-1 border-[#e7e6e6] px-2 mb-3'>
                                         <input id='password' type={isVisible} required onChange={(e)=> setPassword(e.target.value)} value={password} 
                                         className=' w-[100%] h-[45px] outline-0 text-[15px] px-[10px]' 
                                              placeholder='Your password' />
                                       <div onClick={()=> setIsVisible(isVisible === "password" ? "text" : "password")}
                                        className='cursor-pointer'>{isVisible === "password" ? <FaEyeSlash size={18}/> : <FaRegEye size={18}/>}</div>
                                     </div>
                             </div>
                             <button onClick={handleLogin} type='submit' className='w-[80%] h-[40px] bg-black text-white cursor-pointer 
                             flex items-center justify-center rounded-[5px]' disabled={loading} >{loading ? <ClipLoader size={30} color='white' /> : "Login" }</button>
                             <div className='text-gray-500 cursor-pointer' onClick={()=> navigate('/forget')} ><p>Forget your password ?</p></div>
                            
                            <div className='w-[80%] flex items-center justify-between gap-2 '>
                             <div className='w-[25%] h-[0.5px] bg-[#c4c4c4] '></div>
                              <div className='w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center'>Or continue</div>
                              <div className='w-[25%] h-[0.5px] bg-[#c4c4c4] '></div>       
                          </div>  
                          <div onClick={googleLogin} className='w-[80%] h-[40px] border-1 border-black rounded-[5px] flex items-center justify-center'>
                             <img src={google} className='w-[25px] ' alt="google" />
                             <span className='text-xl'>oogle</span>
                          </div>
                          <div className='text-neutral-500'>
                            <p>don't have an account? <span className='text-blue-500 border-b cursor-pointer' onClick={()=> navigate('/signup')}>click here</span> </p>
                          </div>
 
                   </div> 
 
                   {/* Right div */}
                    <div className='w-[50%] h-[100%] rounded-r-2xl bg-black md:flex items-center justify-center flex-col hidden'>
                          <img src={logo} alt="logo" className='w-30 shadow-2xl'/>
                          <span className='text-2xl text-white '>VIRTUAL COURSES</span>
                    </div>
             </form>
     </div>
  )
}

export default Login