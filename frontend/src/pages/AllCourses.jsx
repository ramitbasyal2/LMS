import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import img_ai from '../assets/SearchAi.png'
import { useSelector } from 'react-redux';
import CourseCard from '../components/CourseCard';

const AllCourses = () => {
    const navigate = useNavigate()
    const {courseData} = useSelector(state=>state.course)
    const [category, setCategory] = useState([])
    const [filterCourses, setFilterCourses] = useState([])
    const [isSlidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleCategory = (e)=>{
        if(category.includes(e.target.value)){
             setCategory(prev => prev.filter(c => c !== e.target.value))
        }else{
            setCategory(prev => [...prev,e.target.value])//take the category of multiple if we check 2 category both data will show
        }
    }
  
    const applyFilter = ()=>{ //category which is equal to selected category will be saved
        let courseCopy = courseData?.slice()
        if(category.length > 0){
            courseCopy = courseCopy.filter(c => category.includes(c.category))
        }
        setFilterCourses(courseCopy)
    }
     
    useEffect(()=>{
      setFilterCourses(courseData)
    },[courseData])

   useEffect(()=>{
      applyFilter()
   },[category])

  return (
    <div className='flex bg-gray-50'>
          <Navbar/>
          
          <button className='fixed top-20 left-4 z-50 bg-white text-black px-3 py-1 
          rounded md:hidden border-2 border-black' onClick={()=> setIsSidebarOpen(prev=>!prev)} >
             {isSlidebarOpen ? 'Hide' : 'Show'} Filters   
          </button>

       {/* sideBar */}
   
       <aside className={`w-[250px] h-screen overflow-y-auto bg-black fixed top-0 left-0 p-6 
         p-6 py-[130px] border-r border-gray-100 shadow-md transition-transform duration-300 z-5 
          ${isSlidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:block md:translate-x-0 `}>

        <h2 className='text-xl font-bold flex items-center justify-center gap-2 text-gray-50 mb-6 '>
            <FaArrowLeftLong className='cursor-pointer' onClick={()=> navigate('/')} />Filter by Category</h2>
       
         <form onSubmit={(e)=>e.preventDefault()} action="" className='space-y-4 text-sm bg-gray-600 border border-white text-white p-[20px] rounded-2xl'>
             
              <button onClick={()=> navigate('/search')} className='px-[10px] py-[10px] bg-black text-white rounded-[10px] text-[15px] font-light flex 
               items-center justify-center gap-2 cursor-pointer'>Search with Ai<img 
               className='w-[30px] h-[30px] rounded-full ' src={img_ai} alt="" /> </button>
        
            <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                <input type="checkbox" className='accent-black w-4 h-4 rounded-md' 
                value={'App Development'} onChange={toggleCategory} /> App Development
            </label>

            
            <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                <input type="checkbox" className='accent-black w-4 h-4 rounded-md'
                  value={'AI/ML'} onChange={toggleCategory} /> AI/ML
            </label>

            
            <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                <input type="checkbox" className='accent-black w-4 h-4 rounded-md' 
                   value={'AL/Tools'} onChange={toggleCategory} /> AI/Tools
            </label>

            
            <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                <input type="checkbox" className='accent-black w-4 h-4 rounded-md' 
                  value={'Data Science'} onChange={toggleCategory} /> Data Science
            </label>

            
            <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                <input type="checkbox" className='accent-black w-4 h-4 rounded-md' 
                    value={'Data Analytics'} onChange={toggleCategory} /> Data Analytics
            </label>

            
            <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                <input type="checkbox" className='accent-black w-4 h-4 rounded-md' 
                 value={'Ethical Hacking'} onChange={toggleCategory} /> Ethical Hacking
            </label>

            
            <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                <input type="checkbox" className='accent-black w-4 h-4 rounded-md' 
                  value={'UI/UX Designing'} onChange={toggleCategory} /> UI/UX Designing
            </label>

            
            <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                <input type="checkbox" className='accent-black w-4 h-4 rounded-md' 
                  value={'Web Development'} onChange={toggleCategory} /> Web Development
            </label>

            
            <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
                <input type="checkbox" className='accent-black w-4 h-4 rounded-md'
                  value={'Others'} onChange={toggleCategory} /> Others
            </label>
         </form>

       </aside>
     
     {/* main section */}
        
        <main className='w-full transition-all duration-300 py-[130px] md:pl-[300px] flex 
           items-start justify-center md:justify-start flex-wrap gap-6 px-[10px] '>
                
                {
                    filterCourses?.map((course,index)=>(
                        <CourseCard  key={index} thumbnail={course.thumbnail} category={course.category} level={course.level}
                                    price={course.price} title={course.title} id={course._id} reviews={course.reviews} />
                    ))
                }
        </main>

    </div>
  )
}

export default AllCourses
