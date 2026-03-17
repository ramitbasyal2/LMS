import React from 'react'
import { SiViaplay } from "react-icons/si";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { FaUikit } from "react-icons/fa6";
import { FaAppStoreIos } from "react-icons/fa";
import { FaHackerrank } from "react-icons/fa";
import { AiFillOpenAI } from "react-icons/ai";
import { SiGoogledataproc } from "react-icons/si";
import { BsClipboardData } from "react-icons/bs";
import { SiOpenaigym } from "react-icons/si";
import { useNavigate } from 'react-router-dom';

const ExploreCourses = () => {
    const navigate = useNavigate()
  return (
    <div className='w-[100vw] min-h-[50vh] lg:h-[50vh] flex flex-col 
    lg:flex-row items-center justify-center gap-4 px-[30px] mb-8'>
          
        {/* left top/div */}
         <div className='w-[100%] lg:w-[350px] lg:h-[100%] h-[400px] 
         flex flex-col items-start justify-center gap-1 md:px-[40px] px-[20px] '>

           <span className='text-[35px] font-semibold '>Explore</span>
           <span className='text-[35px] font-semibold '>Our Courses</span>  
           <p className='text-[17px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores totam laborum earum nostrum 
            consectetur cupiditate, incidunt numquam obcaecati, neque voluptatem doloremque iste tempore, a id 
            impedit quibusdam mollitia. Dignissimos, nesciunt.</p>
            <button onClick={()=> navigate('allcourses')} className='px-[20px] py-[10px] border-2 bg-black border-white rounded-[10px] text-[18px]
            font-light flex gap-2 mt-[40px] text-white items-center cursor-pointer fill-white '>Explore Courses <SiViaplay size={30} /></button>
         </div>
    
    {/* riht bottom/div */}
    <div className='w-[720px] maax-w-[90%] lg:h-[300px] md:min-h-[300px] flex items-center 
      justify-center lg:gap-[60px] gap-[50px] flex-wrap mb-[50px] lg:mb-[0px] '>
        <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center '>
            <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center 
            justify-center  '>
                <TbDeviceDesktopAnalytics className='w-[50px] h-[50px] text-[#6d6c6c] ' />
            </div>
            Web Dev
        </div>
         <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center '>
            <div className='w-[100px] h-[90px] bg-[#d9fbe0] rounded-lg flex items-center 
            justify-center  '>
                <FaUikit className='w-[50px] h-[50px] text-[#6d6c6c] ' />
            </div>
             UI/UX Designing
        </div>
         <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center '>
            <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center 
            justify-center  '>
                <FaAppStoreIos className='w-[50px] h-[50px] text-[#6d6c6c] ' />
            </div>
           App Dev
        </div>
         <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center '>
            <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center 
            justify-center  '>
                <FaHackerrank className='w-[50px] h-[50px] text-[#6d6c6c] ' />
            </div>
            Ethical Hacking
        </div>
         <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center '>
            <div className='w-[100px] h-[90px] bg-[#d9fbe0] rounded-lg flex items-center 
            justify-center  '>
                <AiFillOpenAI className='w-[60px] h-[60px] text-[#6d6c6c] ' />
            </div>
           AI/ML
        </div>
         <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center '>
            <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center 
            justify-center  '>
                <SiGoogledataproc className='w-[50px] h-[50px] text-[#6d6c6c] ' />
            </div>
            Data Science
        </div>
         <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center '>
            <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center 
            justify-center  '>
                <BsClipboardData className='w-[50px] h-[50px] text-[#6d6c6c] ' />
            </div>
            Data Analytics
        </div>
         <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center '>
            <div className='w-[100px] h-[90px] bg-[#d9fbe0] rounded-lg flex items-center 
            justify-center  '>
                <SiOpenaigym className='w-[50px] h-[50px] text-[#6d6c6c] ' />
            </div>
          AI/Tools
        </div>
    </div>

    </div>
  )
}

export default ExploreCourses