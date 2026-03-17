import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CourseCard from './CourseCard'

const CourseCardPage = () => {
 
    const {courseData} = useSelector(state=>state.course)
    const [popularCourses, setPopularCourses] = useState([])
    
    useEffect(()=>{
       if(courseData?.length > 0){
          setPopularCourses(courseData?.slice(0,6))
       }
    },[courseData])

  return (
    <div className='relative flex items-center justify-center flex-col'>
        <h1 className='md:text-[45px] text-[30px] font-semibold text-center mt-[30px]
        px-[20px]'>Our Popular Courses</h1>
        <span className='lg:w-[50%] md:w-[80%] text-[15px] text-center mt-[30px] mb-[30px] 
        px-[20px] '>Explore top-rated courses designed to boost your skills, enhance careers,
             and unlock opportunities i tech, AI, business, and beyond.</span>
        <div className='w-[100%] flex items-center justify-center flex-wrap gap-[50px] 
                        lg:p-[50px] md:p-[30px] p-[10px] mb-[40px] '>
               {
                popularCourses?.map((course,index)=>{
                     return <CourseCard key={index} thumbnail={course.thumbnail} category={course.category} level={course.level}
                                    price={course.price} title={course.title} id={course._id} reviews={course.reviews} />
                })
               }
        </div>
    </div>
  )
}

export default CourseCardPage