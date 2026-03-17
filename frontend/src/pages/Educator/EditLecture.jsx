import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { serverUrl } from '../../App'
import { setLectureData } from '../../redux/lectureSlice'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'

const EditLecture = () => {
  const {courseId,lectureId} = useParams()
  const navigate = useNavigate()
  const {lectureData} = useSelector(state=>state.lecture)
  const selectedLecture = lectureData.find(lecture => lecture._id === lectureId) //lectureData itself a big array so we take a particular lecture whose id is equal to the lectureId(which we get from params)
  const [lectureTitle, setLectureTitle] = useState(selectedLecture?.lectureTitle || "" )
  const [videoUrl, setVideoUrl] = useState("")
  const [isPreviewFree, setIsPreViewFree] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)
  const dispatch = useDispatch()



   //fetching data
   const handleEditLecture = async () => {
    setLoading(true)
     try {
        //we need formdata because we are passing videoUrl
        const formData = new FormData();
        formData.append("lectureTitle",lectureTitle)
        formData.append("videoUrl",videoUrl)
        formData.append("isPreviewFree",isPreviewFree)

      const {data} = await axios.post(`${serverUrl}/api/course/editlecture/${lectureId}`,
         formData,{withCredentials:true});
         dispatch(
     setLectureData(lectureData.map((lecture) =>
      lecture._id === lectureId ? data : lecture
    )
  )
);//lectureData is an array so 
         console.log(data)
         toast.success("Lecture Updated")
         navigate('/courses')
         setLoading(false)

     } catch (error) {
       setLoading(false)
       console.log(error.message)
       toast.error(error.response?.data?.message)
     }
   }

  //  function to remove lecture
  const handleRemoveLecture = async () => {
     setLoading1(true)
      try {
        const {data} = await axios.delete(`${serverUrl}/api/course/removelecture/${lectureId}`,{withCredentials:true})
        console.log(data)
        setLoading1(false)
        navigate(`/createlecture/${courseId}`)
        toast.success("Lecture Removed")
      } catch (error) {
          setLoading1(false)
         console.log(error.message)
         toast.error(error.response?.data?.message)
      }
  }

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4 '>
        <div className='w-full max-w-xl bg-white rounded-xl shadow-lg p-6 space-y-6' >
              
              {/* header  */}
              <div className='flex items-center gap-2 mb-2'>
                  <FaArrowLeftLong onClick={()=> navigate(`/createLecture/${courseId}`)} className='text-gray-600 cursor-pointer' />
                  <h2 className='text-xl font-semibold text-gray-800'>
                       Update Course Lecture     
                  </h2>
              </div>

              <button onClick={handleRemoveLecture} disabled={loading1} className='mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 
               transition-all text-sm cursor-pointer'>{loading1 ? <ClipLoader size={30} color='white'/> : 'Remove Lecture' }</button>
              
              <form onSubmit={(e)=> e.preventDefault()} className='space-y-4'> 
                   <div>
                     <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor=''>LectureTitle</label>
                     <input type="text" className='w-full p-3 border border-gray-300  rounded-md text-sm focus:ring-2
                      focus:ring-black focus:outline-none' onChange={(e)=> setLectureTitle(e.target.value)} value={lectureTitle} required/>
                   </div>
                    <div>
                     <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor=''>Video<span className='text-red-500'>*</span></label>
                     <input type="file" className='w-full border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md 
                     file:border-0 file:text-sm file:bg-gray-700 file:text-[white] hover:file:bg-gray-500  file:cursor-pointer'
                     onChange={(e)=> setVideoUrl(e.target.files[0])}  accept='video/*' required/>
                   </div>
                    <div className='flex items-center gap-3'>
                      <input type="checkbox" className='accent-black h-4 w-4' id='isFree' onChange={()=> setIsPreViewFree(prev=>!prev)} />
                      <label htmlFor="isFree" className='text-sm text-gray-700'> Is this video FREE</label>
                    </div>
                    {loading ? <p>Uploading video... Please wait</p> : ''}
                      <div className='pt-4'>
                    <button type='submit' onClick={handleEditLecture} disabled={loading} className='w-full bg-black text-white rounded-md text-xl cursor-pointer font-medium hover:bg-gray-700
                   py-3 transition'>{loading ? <ClipLoader size={30} color='white' /> : 'Update Lecture'}</button>
              </div>
              </form>

            
        </div>
    </div>
  )
}

export default EditLecture