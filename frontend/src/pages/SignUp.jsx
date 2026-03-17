import React, { useState } from 'react'
import logo from '../assets/logo.jpg'
import google from '../assets/google.jpg'
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App';
import { toast } from 'react-toastify';
import {ClipLoader} from 'react-spinners'
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/firebase.js';

const SignUp = () => { 

     const navigate = useNavigate();
     const [isVisible, setIsVisible] = useState("password") //for password hide/show
     const [name, setName] = useState("");
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [role, setRole] = useState("student"); 
     const [loading, setLoading] = useState(false);
     const dispatch = useDispatch()

   const handleSignup = async (e)=>{
      setLoading(true)
      try {
         e.preventDefault();
         const result = await axios.post(serverUrl+"/api/auth/signup" , 
          {name,email,password,role}, {withCredentials:true} )
         dispatch(setUserData(result.data))
         setLoading(false)
         navigate('/')
         toast.success("signUp successfully")
      } catch (error) {
        setLoading(false)
        toast.error(error.response.data.message) 
      }
   }
  
  //  GoogleSignUp with firebase
  const googleSignUp = async () => {
      try {
         const response = await signInWithPopup(auth,provider)
         let user = response.user;
         let name = user.displayName;
         let email = user.email;
 
         const result = await axios.post(serverUrl + "/api/auth/googleauth",
           {name, email, role},{withCredentials:true})
           dispatch(setUserData(result.data))
           navigate("/")
           toast.success("SignUp Successfully")
          } catch (error) {
        toast.error(error.response?.data?.message)
      }
  }


  return (
    <div className='bg-[#dddbdb] w-full h-screen flex items-center justify-center '>
            <form className='w-[90%] md:w-200 h-150 bg-white shadow-xl rounded-2xl flex'>
                  
                  {/* left div */}
                  <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3'>
                       <div>
                         <h1 className='font-semibold text-black text-2xl '>Let's get Started</h1>
                           <h2 className='text-[#999797] text-[18px]'>Create your account</h2>
                       </div>
                            <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 '>
                                 <label htmlFor="name" className='font-semibold'>Name</label>
                                 <input id='name' type="text" required onChange={(e)=> setName(e.target.value)} value={name}
                                 className='border-1 w-[100%] h-[45px] border-[#e7e6e6]  text-[15px] px-[20px] mb-3' 
                                 placeholder='Your name' />
                                   <label htmlFor="email" className='font-semibold'>Email</label>
                                 <input id='email' type="email" required onChange={(e)=> setEmail(e.target.value)} value={email}
                                 className='border-1 w-[100%] h-[45px] border-[#e7e6e6]  text-[15px] px-[20px] mb-3' 
                                 placeholder='Your email' />
                                   <label htmlFor="password" className='font-semibold'>Password</label>
                                    <div className='w-[100%] flex items-center  border-1 border-[#e7e6e6] px-2 mb-3'>
                                        <input id='password' type={isVisible} required onChange={(e)=> setPassword(e.target.value)} value={password}
                                        className=' w-[100%] h-[45px] outline-0 text-[15px] px-[10px]' 
                                             placeholder='Your password' />
                                      <div onClick={()=> setIsVisible(isVisible === "password" ? "text" : "password")}
                                       className='cursor-pointer'>{isVisible === "password" ? <FaEyeSlash size={18}/> : <FaRegEye size={18}/>}</div>
                                    </div>
                            </div>
                            <div className='flex md:w-[50%] w-[70%] items-center justify-between'>
                                <span className={`px-[10px] py-[5px] border-3 border-[#9586867c]
                                 rounded-xl cursor-pointer ${role === "student" ? "border-3 border-black" : "border-[#646464]"  } `} onClick={()=> setRole("student")}>Student</span>
                                  <span className={`px-[10px] py-[5px] border-3 border-[#9586867c]
                                 rounded-xl cursor-pointer ${role === "educator" ? "border-3 border-black" : "border-[#646464]"  } `} onClick={()=> setRole("educator")}>Educator</span>
                            </div>
                            <button onClick={handleSignup} type='submit' className='w-[80%] h-[40px] bg-black text-white cursor-pointer 
                            flex items-center justify-center rounded-[5px]' disabled={loading} >{loading ? <ClipLoader size={30} color='white'/> : "SignUp"}</button>
                           
                           <div className='w-[80%] flex items-center justify-between gap-2'>
                            <div className='w-[25%] h-[0.5px] bg-[#c4c4c4] '></div>
                             <div className='w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center'>Or continue with</div>
                             <div className='w-[25%] h-[0.5px] bg-[#c4c4c4] '></div>       
                         </div>  
                         <div onClick={googleSignUp} className='w-[80%] h-[40px] border-1 border-black rounded-[5px] flex items-center justify-center'>
                            <img src={google} className='w-[25px] ' alt="google" />
                            <span className='text-xl'>oogle</span>
                         </div>
                          <div  className='text-neutral-500'>
                            <p>already have an account? <span className='text-blue-500 border-b cursor-pointer'
                             onClick={()=> navigate('/login')}>login here</span> </p>
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

export default SignUp