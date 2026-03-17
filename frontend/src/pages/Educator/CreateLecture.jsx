import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { serverUrl } from '../../App'
import { ClipLoader } from 'react-spinners'
import { setLectureData } from '../../redux/lectureSlice'
import { toast } from 'react-toastify'
import { FaEdit } from 'react-icons/fa'

const CreateLecture = () => {
  const {courseId} =  useParams()

  const navigate  = useNavigate()
  const [lectureTitle, setLecutureTitle] = useState("")
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const {lectureData} = useSelector(state=>state.lecture)


  // Function to handleLecture
  const handleCreateLecture = async () => {
    setLoading(true)
      try {
        const {data} = await axios.post(`${serverUrl}/api/course/createlecture/${courseId}`,
          {lectureTitle},{withCredentials:true})
          console.log(data)
           dispatch(setLectureData([...lectureData,data.lecture]))//lectureData ko aray vitra push garako hokinavi lecturedata aafaima eauta Array ho so,
           setLoading(false)
           toast.success("Lecture added");
           setLecutureTitle("")
        } catch (error) {
        setLoading(false);
        console.log(error)
        toast.error(error.response?.data?.message)
      }
  }

  useEffect(()=>{
     const getCourselecture = async () => {
         try {
           const {data} = await axios.get(`${serverUrl}/api/course/courselecture/${courseId}`,
            {withCredentials:true})
            console.log(data)
            dispatch(setLectureData(data.lectures))
         } catch (error) {
          console.log(error)
         }
     }
    if(courseId){
        getCourselecture()
    }
  },[courseId,dispatch])

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
        <div className='bg-white shadow=xl rounded-xl w-full max-w-2xl p-6'>
             {/* header  */}
             <div className='mb-6'>
               <h1 className='text-2xl font-semibold text-gray-800 mb-1'>
                   Let's Add a Lecture
               </h1>
                <p className='text-sm text-gray-500 '>
                   Enter the title and add your video lectures to enhance your 
                   course content.
                </p>
             </div>

             {/* input area */}
             <input type="text" className='w-full border border-gray-300 rounded-md 
                p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black mb-4'
                placeholder='eg. Introduction to Mern Stack' 
                onChange={(e)=> setLecutureTitle(e.target.value)} value={lectureTitle}  />

              {/* button */}
              <div className='flex gap-4 mb-6'>
                <button onClick={()=> navigate(`/editcourse/${courseId}`)} className='flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer
                           bg-gray-200 hover:bg-gray-300 text-xm font-medium  ' ><FaArrowLeftLong/>Back to course</button>
                <button disabled={loading} onClick={handleCreateLecture} className='px-5 py-2 rounded-md bg-black text-white hover:bg-gray-600 
                transition-all text-sm font-medium shadow cursor-pointer' >{loading ? <ClipLoader size={30} color='white' /> : ' + Create Lecture'}</button>
              </div>

           {/* Lecture list */}
           <div className='space-y-2'>
               {lectureData?.map((lecture,index)=>{
                return  <div key={index} className='bg-gray-100 rounded-md flex justify-between items-center p-3 text-sm 
                     font-medium text-gray-700 ' >
                     <span>Lecture - {index + 1} : {lecture.lectureTitle} </span>   
                     <FaEdit onClick={()=> navigate(`/editlecture/${courseId}/${lecture._id}`)} className='text-gray-500 hover:text-gray-700 cursor-pointer'/>
                  </div>
                  
               })}
           </div>
        </div>
    </div>
  )
}

export default CreateLecture