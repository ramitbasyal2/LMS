import React, { useState } from 'react'
import logo from '../assets/logo.jpg'
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import { toast } from 'react-toastify';
import { Menu, X } from 'lucide-react'
import {} from 'react-redux'

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {userData} = useSelector(state=> state.user);
    const [show, setShow] = useState(false)
    const [menu, setMenu] = useState(false)
    
   //handle logout function
   const handleLogout = async () => {
       try {
        const result = await axios.get(serverUrl + "/api/auth/logout", {withCredentials: true} ) 
        dispatch(setUserData(null)) 
        console.log(result.data)
        toast.success("Logout Successfully")
      } catch (error) {
        console.log(error.message)
        toast.error(error.response.data.message)        
       }
   }

  return (
    <div>
        <div className='w-full h-[70px] fixed top-0 px-[20px] py-[10px] flex items-center justify-between bg-[#00000047] z-10 '>
          <div className='lg:w-[20%] w-[40%] lg:pl-[50px]'>

              <img src={logo} alt="" className='w-[60px] rounded-[5px] border-2 border-white  ' />
          </div>
          <div className='w-[30%] lg:flex items-center justify-center gap-4 hidden'>
              {!userData && <CgProfile onClick={()=> setShow(prev=>!prev)} className='w-[50px] h-[50px] text-gray-100 cursor-pointer'/>}

                {/* if user available */}
                { userData &&
                 <div>
               { userData?.photoUrl ? <img  onClick={()=> setShow(prev=>!prev)} src={userData?.photoUrl} className='w-[50px] h-[50px] 
              rounded-full border-2 border-white object-cover cursor-pointer '
               alt="" /> : <div  onClick={()=> setShow(prev=>!prev)} className='w-[50px] h-[50px] rounded-full text-white 
              flex items-center justify-center border-2 bg-black border-white cursor-pointer '>
                {userData?.name.slice(0,1).toUpperCase()}</div>}
             </div>}
             
       {/* onclick links */}
       {show && <div className='absolute top-[110%] right-[15%] flex items-center flex-col justify-center gap-2 text-[16px] rounded-md 
        bg-white px-[15px] py-[10px] border-[2px] border-black hover:border-white hover:text-white  cursor-pointer hover:bg-black '>
          <span className='bg-black text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600 ' onClick={()=> navigate('/profile')} >My Profile</span>
          <span className='bg-black text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600 ' onClick={()=> navigate('/mycourses')}  >My Courses</span>   
         </div>}

              {userData?.role === "educator" && <div className='px-[20px] py-[10px] border-2 lg:border-white border-black
               lg:text-white border-black lg:text-white bg-[black] rounded-[10px] text-[18px] font-light flex gap-2
                cursor-pointer' onClick={()=> navigate('/dashboard')} > Dashboard</div>}

           {!userData ? <span className=' px-[20px] py-[10px] border-2 border-white text-white cursor-pointer bg-[#000000d5]' 
           onClick={()=> navigate('/login')} >Login</span>
           : <span className='px-[20px] py-[10px] bg-white text-black rounded-[10px] shadow-sm shadow-black text-[18px] cursor-pointer'
            onClick={handleLogout}>Logout</span>}

        </div>  
          
          {/* Mobile View setUp */}
          <Menu onClick={()=> setMenu(prev=>!prev)}
           className='w-[35px] h-[35px] text-white lg:hidden cursor-pointer flex' />
      
         <div className={`fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#000000d6] lg:hidden flex items-center justify-center flex-col gap-5 z-10
            ${menu ? "translate-x-[0] transition duration-600 " : "translate-x-[-100%] transiton duration-600 " } `}>

            <X onClick={()=> setMenu(prev=>!prev)} className='w-[40px] h-[40px] text-white cursor-pointer absolute top-5 right-[4%]' />
            {!userData && <CgProfile className='w-[50px] h-[50px] text-white cursor-pointer'/>}
            
            
             {/* if user available */}
            {userData &&
                <div>
                  { userData?.photoUrl ? <img src={userData?.photoUrl} className='w-[50px] h-[50px] 
              rounded-full border-2 border-white object-cover'
               alt="" /> : <div  onClick={()=> setShow(prev=>!prev)} className='w-[50px] h-[50px] rounded-full text-white 
              flex items-center justify-center border-2 bg-black border-white'>
                {userData?.name.slice(0,1).toUpperCase()}</div>}
              </div>
            }

                <div className='w-[200px] h-[70px] flex items-center justify-center border-2 border-white 
               lg:text-white border-black bg-[black] text-white rounded-[10px] text-[18px] font-light flex gap-2
                cursor-pointer' onClick={()=> navigate('/profile')}> My Profile</div>
                <div className='w-[200px] h-[70px] flex items-center justify-center border-2 border-white 
               lg:text-white border-black bg-[black] text-white rounded-[10px] text-[18px] font-light flex gap-2
                cursor-pointer' onClick={()=> navigate('/mycourses')} > My Courses</div>
                 {userData?.role === "educator" && <div className='w-[200px] h-[70px] flex items-center justify-center border-2 border-white
               lg:text-white border-black text-white bg-[black] rounded-[10px] text-[18px] font-light flex gap-2
                cursor-pointer' onClick={()=> navigate('/dashboard')} > Dashboard</div>}
                 {!userData ? <span className=' w-[200px] h-[70px] flex items-center justify-center border-2 border-white
               lg:text-white border-black text-white bg-[black] rounded-[10px] text-[18px] font-light flex gap-2
                cursor-pointer' onClick={()=> navigate('/login')} >Login</span>
           : <span className='w-[200px] h-[70px] flex items-center justify-center border-2 border-white
               lg:text-white border-black text-white bg-[black] rounded-[10px] text-[18px] font-light flex gap-2
                cursor-pointer'
            onClick={handleLogout}>Logout</span>}

         </div>

    </div>
</div>
  )
}

export default Navbar