import { ArrowLeft, Subtitles } from 'lucide-react'
import React, { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import img from '../../assets/empty.jpg'
import { FaEdit } from "react-icons/fa";
import axios from 'axios'
import { serverUrl } from '../../App'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import { useDispatch, useSelector } from 'react-redux'
import { setCourseData } from '../../redux/courseSlice'

function EditCourse() {
  const navigate = useNavigate();
  const {courseId} = useParams()
  const thumb = useRef()
  const [isPublished, setIsPublished] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [level, setLevel] = useState("")
  const [price, setPrice] = useState("")
  const [frontendImage,setFrontendImage] = useState(img)
  const [backendImage, setBackendImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)
  const dispatch = useDispatch()
  const {courseData} = useSelector(state=>state.course)

 const handleThumbnail = (e) => { //to set the image on frontend ad path at backend
   const file = e.target.files[0]
   setBackendImage(file)
   setFrontendImage(URL.createObjectURL(file)); //through this we can create a url of the path/file
   
 }

//  get course by their id
 const getCourseById = async () => {
   try {
      const result = await axios.get( serverUrl + `/api/course/getcourse/${courseId}`,{withCredentials:true}) 
      setSelectedCourse(result.data)
      console.log(result.data)
   } catch (error) {
    console.log(error)
   }
 }
 useEffect(()=>{
  getCourseById()
 },[courseId])

//  ===============
 useEffect(()=>{
   if(selectedCourse){
      setTitle(selectedCourse.title || "")
      setSubTitle(selectedCourse.subTitle || "")
      setDescription(selectedCourse.description || "")
      setCategory(selectedCourse.category || "")
      setLevel(selectedCourse.level || "")
      setPrice(selectedCourse.price || "")
      setFrontendImage(selectedCourse.thumbnail || img)
      setIsPublished(selectedCourse?.isPublished)

   }
 },[selectedCourse])

// function to handle editCourse

 const handleEditCourse = async ()=>{
       setLoading(true)
       const formData = new FormData() //wew have to insert data inside the formData
       formData.append("title",title)
       formData.append("subTitle",subTitle)
       formData.append("description", description)
       formData.append("category", category)
       formData.append("level", level)
       formData.append("price", price)
       formData.append("thumbnail", backendImage)
       formData.append("isPublished", isPublished)
      try {
         const result = await axios.post(serverUrl + `/api/course/editcourse/${courseId}`, formData,
          {withCredentials:true})  
          console.log(result.data)
          
          // update the course recenlt onHomePage after Edited
          const updateData = result.data;
          if(updateData.isPublished){
            const updateCourses = courseData.map(c => c._id === courseId ? updateData : c )
            
            if(!courseData.some(c => c._id === courseId)){
              updateCourses.push(updateData)
            }
            dispatch(setCourseData(updateCourses))
       
          }else{
            const filterCourses = courseData.filter(c => c._id !== courseId)
            dispatch(setCourseData(filterCourses))
          }
          
          setLoading(false)
          navigate('/courses')
          toast.success("Course updated!")
      } catch (error) {
         console.log(error)
         toast.error(error.response?.data?.message)
         setLoading(false)
      }
 }

//  function to fetch remove course controller from backend
  const handleRemoveCourse = async () => {
    setLoading1(true)
     try {
      const result = await axios.delete(serverUrl + 
        `/api/course/remove/${courseId}`,{withCredentials:true})
        console.log(result.data)
        const filterCourses = courseData.filter(c => c._id !== courseId) //helps to removethe items from hover page instantly after clicked on remove course
        dispatch(setCourseData(filterCourses)) //sets the data in courseData
        setLoading1(false)
        navigate('/courses')
        toast.success("Course Removed")
     } catch (error) {
        setLoading1(false)
        toast.error(error.response?.data?.message)
        console.log(error)
     }
  }  


  return (
    <div className='max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md '>
            {/* top bar */}
            <div className='flex items-center gap-[-20px] md:justify-between flex-col
             md:flex-row mb-6 relative' >
           <ArrowLeft onClick={()=> navigate('/courses') } className='top-[-20%] md:top-[20%]
            absolute left-[0] md:left-[2%] w-[22px] h-[22px] cursor-pointer ' />
           
            <h2 className='text-2xl font-semibold md:pl-[60px]'>Add Detail Information regarding the course </h2>

            <div onClick={()=> navigate(`/createlecture/${selectedCourse?._id}`)} className='bg-black text-white px-4 py-2 rounded-md cursor-pointer' >Go to Lecture page</div>
           </div>


            {/* form data */}
            <div className='bg-gray-50 p-6 rounded-md' >
                <h2 className='text-lg font-medium mb-4 '>Basic Course Information</h2>
                 <div className='space-x-2 space-y-2' >
                    { !isPublished 
                    ?  <button onClick={()=> setIsPublished(prev=>!prev)} className='bg-green-100 text-green-600 px-4 py-2 rounded-md 
                               cursor-pointer border-1' >Click to Publish</button>
                    :  <button  onClick={()=> setIsPublished(prev=>!prev)} className='bg-green-100 text-red-600 px-4 py-2 rounded-md 
                               cursor-pointer border-1' >Click to UnPublish</button> }

                     <button disabled={loading1} onClick={handleRemoveCourse} className='bg-red-600 text-white px-4 
                     py-2 rounded-md cursor-pointer' >{loading1 ? <ClipLoader size={20} color='white' /> : "Remove Course"}</button> 
                 </div>     

                 <form className='space-y-6 ' onSubmit={(e)=> e.preventDefault()} >
                       <div>
                        <label htmlFor="title" className='block text-sm font-medium text-gray-700 
                          mb-1 ' >Title</label>
                          <input id='title' type="text" className='w-full border px-4 py-2 rounded-md ' 
                          placeholder='CourseTitle' onChange={(e)=> setTitle(e.target.value)} value={title} />
                       </div> 
                        <div>
                        <label htmlFor="subtitle" className='block text-sm font-medium text-gray-700 
                          mb-1 ' >SubTitle</label>
                          <input id='subtitle' type="text" className='w-full border px-4 py-2 rounded-md ' 
                          placeholder='CourseSubTitle' onChange={(e)=> setSubTitle(e.target.value)} value={subTitle} />
                       </div> 
                        <div>
                        <label htmlFor="desc" className='block text-sm font-medium text-gray-700 
                          mb-1 ' >Description</label>
                          <textarea id='desc' className=' resize-none w-full border px-4 py-2 rounded-md h-24'
                           placeholder='Course Description' onChange={(e)=> setDescription(e.target.value)} value={description} ></textarea>
                       </div> 

                       <div className='flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 '>
                        {/* for category */}
                        <div className='flex-1'>
                            <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1' >Course Category</label>
                             <select name="" id="" className='w-full border px-4 py-2 rounded-md bg-white' 
                             onChange={(e)=> setCategory(e.target.value)} value={category} >
                                <option value="">Select Category</option>
                                <option value="App Development">App Development</option>
                                <option value="AI/ML">AI/ML</option>
                                <option value="AI Tools">AI Tools</option>
                                <option value="Data Science">Data Science</option>
                                <option value="Data Analytics">Data Analytics</option>
                                <option value="Ethical Hacking">Ethical Hacking</option>
                                <option value="UI UX Designing">UI UX Designing</option>
                                <option value="Web Development">Web Development</option>
                             </select>
                        </div>
                          {/* for lavvel */}
                        <div className='flex-1'>
                           <label htmlFor="level" className='block text-sm font-medium text-gray-700 mb-1' >Course Level</label>
                           <select id="level" className='w-full border px-4 py-2 rounded-md bg-white' onChange={(e)=> setLevel(e.target.value)} value={level} >
                                <option value="">Select Level </option>
                                <option value="Beginner">Beginner</option>
                               <option value="Intermediate">Intermediate</option>
                               <option value="Advanced">Advanced</option>
                           </select>
                        </div>
                          {/* for price */}
                        <div className='flex-1'>
                             <label htmlFor="price" className='block text-sm font-medium text-gray-700 mb-1' >Course Price (NPR) </label>
                             <input id='price' type="number" className='w-full border px-4 py-2 rounded-md' placeholder='₹' 
                             onChange={(e)=> setPrice(e.target.value)} value={price} />
                        </div>
                       </div>
                       
                        {/* for thumbnail  */}
                        <div>
                           <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Course Thumbnail</label>
                           <input onChange={handleThumbnail} type="file" hidden ref={thumb} accept='image/*' />
                        </div>
                         <div className='relative w-[300px] h-[170px] '>
                          <img src={frontendImage} alt="" className='w-[100%] h-[100%] border-1 border-black rounded-[5px]'
                            onClick={()=>thumb.current.click()}  />
                            < FaEdit  onClick={()=>thumb.current.click()} className='w-[20px] h-[20px] absolute top-2 right-2 cursor-pointer' />
                         </div>

                         <div className='flex items-center justify-start gap-[15px]'>
                            <button className='bg-[#e9e8e8] hover:bg-red-200 text-black border-1 
                              border-black cursor-pointer px-7 py-2 rounded-md' onClick={()=> navigate('/courses')} >Cancel</button>
                            <button disabled={loading} onClick={handleEditCourse} className='bg-black text-white px-7 py-2 rounded-md
                             hover:bg-gray-500 cursor-pointer ' >{loading ?<ClipLoader size={30} color='white'/> : "Save" }</button>
                         </div>
                 </form>       
            </div>
    </div>
  )
}

export default EditCourse