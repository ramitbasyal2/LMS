import React, { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../../App'
import { toast } from 'react-toastify'
import axios from 'axios'
import { ClipLoader } from 'react-spinners'

const CreateCourses = () => {
  const navigate = useNavigate()

 const [title, setTitle] = useState("");
 const [category, setCategory] = useState("")
 const [loading, setLoading] = useState(false)
 
//  function to fetch data 
 const handeCreateCourse = async (e) => {
    e.preventDefault()
   setLoading(true)
    try {
       const result = await axios.post(serverUrl + '/api/course/create'
        ,{title,category},{withCredentials:true})
        console.log(result.data)
        setLoading(false)
        navigate('/courses')
        toast.success("Course Created")
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message)
    }finally{
      setLoading(false)
    }
 }


  return (
    <div className='w-full h-screen p-6 flex items-center justify-center bg-gray-100'>
        <div className='w-[90%] lg:w-[60%] px-6 py-10 bg-white rounded-xl shadow-xl'>
            <div className='flex items-center justify-between'>
               <ArrowLeft onClick={()=> navigate('/courses')} size={28} className='cursor-pointer' />
                <p className='font-medium text-2xl '>Create Course</p>
                <div></div>
            </div>
          <form className='flex flex-col mt-6'>
            <label htmlFor="title" className='font-medium'>Course Title</label> 
             <input id='title' type="text" placeholder='Enter Course Title' required
               className='border border-gray-300 px-2 py-3 mt-1 focus:outline-none
                focus:ring-2 focus:ring-black' onChange={(e)=> setTitle(e.target.value)} value={title}  />
            <label htmlFor="category" className='font-medium mt-3'>Course Category</label> 
            <select id="category" className='w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none
              focus:ring-2 focus:ring-black' onChange={(e)=> setCategory(e.target.value)} >
              <option value="">Select Category</option>
              <option value="App Development">App Development</option>
              <option value="AI/ML">AI/ML</option>
              <option value="AI Tools">AI Tools</option>
              <option value="Data Science">Data Science</option>
              <option value="Data Analytics">Data Analytics</option>
              <option value="Ethical Hacking">Ethical Hacking</option>
              <option value="UI UX Designing">UI UX Designing</option>
              <option value="Web Development">Web Development</option>
              <option value="Others">Others</option>
            </select>
          </form> 
          <button disabled={loading} onClick={handeCreateCourse} className='w-full mt-6 text-center bg-black text-white
           p-3 rounded-md font-medium text-xl cursor-pointer hover:bg-gray-800 '>{loading ? <ClipLoader size={30} color='white' /> : "Create" }</button>
         </div>
    </div>
  )
}

export default CreateCourses