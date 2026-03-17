import { ArrowLeft } from 'lucide-react'
import { FaEdit } from "react-icons/fa";
import React from 'react'
import { useNavigate } from 'react-router-dom'
import empty_img from '../../assets/empty.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { serverUrl } from '../../App';
import { useEffect } from 'react';
import axios from 'axios';
import { setCreatorCourseData } from '../../redux/courseSlice';

const Courses = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
     const {creatorCourseData} = useSelector(state=>state.course)
     const {userData} = useSelector(state=>state.user)
       useEffect(()=>{ //to show the created data instant after creation on courses page
              const creatorCourses = async () => {
                   try {
                      const result = await axios.get(serverUrl + '/api/course/getcreator',
                         {withCredentials:true})
                         console.log(result.data)
                         dispatch(setCreatorCourseData(result.data))
                   } catch (error) {
                     console.log(error)
                   }
              }
              creatorCourses()
         },[userData])

  return (
    <div className='flex min-h-screen bg-gray-100'>
       <div className='w-[100%] min-h-screen p-4 sm:p-6 bg-gray-100 '>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3'>
           
                <div className='flex items-center justify-center gap-3'>
                     <ArrowLeft className='cursor-pointer' onClick={()=> navigate('/dashboard')}/>
                     <h1 className='text-2xl font-semibold'> All Created Courses</h1>
                  </div>
                  <button onClick={()=> navigate('/createcourses')} className='bg-black text-white px-4 py-2 rounded-md hover:bg-gray-500 cursor-pointer'>Create Course</button>
         </div>

         {/* for large screen table */}
         <div className='hidden md:block p-4 bg-white rounded-xl shadow-xl overflow-x-auto'>
                <table className='min-w-full text-sm'>
                    <thead className='border-b bg-gray-50' >
                        <tr>
                            <th className='text-left py-3 px-4'>Courses</th>
                            <th className='text-left py-3 px-4'>Price</th>
                            <th className='text-left py-3 px-4'>Status</th>
                            <th className='text-left py-3 px-4'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {creatorCourseData?.map((course,index)=>{

                     return <tr key={index} className='border-b hover:bg-gray-100 transition duration-200'>
                            <td className='py-3 px-4 flex items-center gap-4'>
                              {course?.thumbnail ? <img className='w-25 h-14 rounded-md object-cover' src={course?.thumbnail} alt="" /> 
                                                 : <img className='w-25 h-14 rounded-md object-cover' src={empty_img} alt="" />}
                              <span>{course?.title}</span>
                            </td>
                        {course?.price ? <td className='px-4 py-3'>₹{course?.price}</td> : <td className='px-4 py-3'>₹ NA</td> }
                            <td className='px-4 py-3'><span className={`px-3 py-1 rounded-full text-xs
                                  ${course?.isPublished ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600' }`}>
                                    {course.isPublished ? 'Publised' : 'Draft'}</span></td>
                            <td className='px-4 py-3'><FaEdit size={18} onClick={()=> navigate(`/editcourse/${course?._id}`)} className='text-gray-600 hover:text-blue-600 cursor-pointer' /></td>
                        </tr>
                          })}
                    </tbody>
                </table>
                <p className='text-center text-sm text-gray-400 mt-6'>A list of your recent courses</p>
         </div>
 
         {/* for small screen table */}
          <div className='md:hidden space-y-4'>
              {creatorCourseData?.map((course,index)=>{
             return   <div key={index} className='bg-white rounded-lg shadow p-4 flex flex-col gap-3'>                   
                    <div  className='flex gap-4 items-center'>
                        { !course?.thumbnail ?
                           <img src={empty_img} className='w-16 h-16 rounded-md object-cover' alt="" />
                           : <img src={course?.thumbnail} className='w-16 h-16 rounded-md object-cover' alt="" />  }
                            <div className='flex-1'>
                                <h2 className='font-medium text-sm'>{course.title}</h2>
                                  { course?.price ? <p className='text-gray-600 text-xs mt-1'>{course?.price}</p>
                                                  : <p className='text-gray-600 text-xs mt-1'>$ NA</p>}
                            </div>
                            <FaEdit size={18} onClick={()=> navigate(`/editcourse/${course?._id}`)} className='text-gray-600 hover:text-blue-600 cursor-pointer' />
                      </div>
                      <span className={`w-fit px-3 py-1 text-xs rounded-full ${course?.isPublished ? 'bg-green-100 text-green-600 ' 
                        : 'bg-red-100 text-red-600' } `}>{course?.isPublished ? 'Published' : 'Draft' }</span>
              </div> })}
              <p className='text-center text-sm text-gray-400 mt-4'>A list of your recent courses.</p>
          </div>
       </div>
    </div>
  )
}

export default Courses