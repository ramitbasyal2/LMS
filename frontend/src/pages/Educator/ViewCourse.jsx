import React from 'react'
import { useState } from 'react'
import { FaArrowLeftLong, FaStar } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { setSelectedCourse } from '../../redux/courseSlice.js'
import { useEffect } from 'react'
import img from '../../assets/empty.jpg'
import { FaPlayCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import axios from 'axios'
import { serverUrl } from '../../App.jsx'
import CourseCard from '../../components/CourseCard.jsx'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
 

const ViewCourse = () => {
    const navigate = useNavigate()
    const {courseId} = useParams()
    const {courseData} = useSelector(state=>state.course)
    const {selectedCourse} = useSelector(state=>state.course)
    const dispatch = useDispatch()
    const [selectedLecture, setSelectedLecture] = useState(null)
    const [creatorData, setCreatorData] = useState([]) //for individual creatorData
    const [creatorCourses, setCreatorCourses] = useState([]);//to set the individual creator's courses
    // const [isEnrolled, setIsEnrolled] = useState(false)
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("")
    const [loading, setLoading] = useState(false)


    // const fetchCourseData = async () => {
    //     courseData.find((course)=>{
    //         if(course._id === courseId){
    //             dispatch(setSelectedCourse(course)) //if the id are equal then it will keep the data in setSelectedCourse
    //             console.log(selectedCourse);
               
    //         }
    //     })
    // }

    // useEffect(()=>{
    //     fetchCourseData()
    // },[courseData,courseId])

   useEffect(() => {
    if (!courseData.length) return

    const course = courseData.find(c => c._id === courseId)

    if (course) {
        dispatch(setSelectedCourse(course))
    }
    console.log(selectedCourse)
}, [courseData, courseId])

// for creator
useEffect(()=>{
   const handleCreator = async () => {
        if(selectedCourse?.creator){
           try {
               const {data} = await axios.post(`${serverUrl}/api/course/creator`,
                     {userId:selectedCourse?.creator} , {withCredentials:true})
              console.log(data)   
              setCreatorData(data)       
                } catch (error) {
               console.log(error.message)
           }    
     }
   }
   handleCreator()
},[selectedCourse])


useEffect(()=>{ //to filter the courses of each creator
   if(creatorData?._id && courseData.length > 0){
       const creatorCourse = courseData?.filter(course=> course.creator[0] === creatorData?._id && course?._id !== courseId);
           setCreatorCourses(creatorCourse)
        //    console.log("creatorcourse",creatorCourse)
        //    console.log("coursedata",courseData[0])
        //    console.log("creadtordata",creatorData)
     }

},[creatorData,courseData,courseId ])


// handle review section function
const handleReview = async () => {
    setLoading(true)
      try {
          const {data} = await axios.post(`${serverUrl}/api/review/createreview`,
            {rating, comment, courseId},
            {withCredentials:true})
            setLoading(false) 
            toast.success("Review Added")
            console.log(data)
              setRating(0)
            setComment('')
      } catch (error) {
         console.log(error.message)
         setLoading(false);
         toast.error(error?.response?.data?.message)
          setRating(0)
          setComment('')
        }
}

const calculateAvgReview = (reviews) =>{
    if(!reviews || reviews.length === 0){
        return 0
    }
    const total = reviews.reduce((sum, review)=> sum + review.rating, 0)
    return (total / reviews.length).toFixed(1)
}

 const avgRating = calculateAvgReview(selectedCourse?.reviews)

//   console.log("Avg Rating :", avgRating)


  return (
    <div className='min-h-screen bg-gray-50 p-6'>
         <div className='max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6 relative'>
              
              {/* top section  */}
              <div className='flex flex-col md:flex-row gap-6'>

                 {/* thumbnail  */}
                   <div className='w-full md:w-1/2'>
                        <FaArrowLeftLong className='text-black w-[22px] h-[22px] cursor-pointer' onClick={()=> navigate('/')} />
                        {selectedCourse?.thumbnail ?  <img src={selectedCourse?.thumbnail} 
                           className='rounded-xl w-full object-cover'alt="" /> 
                        :  <img src={img}  className='rounded-xl w-full object-cover' alt="" /> }
                    
                   </div>

                   {/* courseInfo */}
                   <div className='flex-1 space-y-2 mt-[20px]'>
                       <h2 className='text-2xl font-bold'>{selectedCourse?.title}</h2>
                       <p className='text-gray-600'>{selectedCourse?.subTitle}</p>

                       <div className='text-yellow-500 font-medium flex gap-2  '>
                           <span className='flex items-center justify-start gap-1'><FaStar/>{avgRating}</span>
                           <span className='text-gray-400'>(1,200 Reviews)</span>
                       </div>

                       <div>
                           <span className='text-xl font-semibold text-black'>
                             ₹{selectedCourse?.price}</span>{" "}
                             <span className='line-through text-sm text-gray-400'>₹1299</span>
                       </div>

                       <ul className='text-sm text-gray-700 space-y-1 pt-2'>
                           <li>✅ 10+ hours of video content</li>
                           <li>✅ Lifetime access to course materials</li>
                       </ul>
                       {/* untile payment integration isn't added we keep it as watch now after that Enroll Now */}
                       <button className='bg-green-100 text-green-700 border border-green-400 px-6 py-2 rounded hover:bg-green-200 mt-3 cursor-pointer' 
                          onClick={()=> navigate(`/viewlecture/${courseId}`)} >Watch Now</button>
                   </div>
              </div>
              
              {/* bottom section */}
              <div>
                  <h2 className='text-xl font-semibold mb-2'>What you'll Learn</h2>
                  <ul className='list-disc pl-6 tet-gray-700 space-y-1' >
                      <li>Learn {selectedCourse?.category} From Beginning</li>
                  </ul>
              </div>
              
              <div>
                  <h2 className='text-xl font-semibold mb-2'>Who This Course For</h2>
                  <p className='text-gray-700'>Beginners,aspiring developers, and professionals looking to upgrade skills.</p>
              </div>

              <div className='flex flex-col md:flex-row gap-6'>
                   <div className='bg-white w-full md:w-2/5 p-6 rounded-2xl  shadow-lg border border-gray-200'>
                       <h2 className='text-xl font-bold mb-1 text-gray-800'>Course Curriculum</h2>
                       <p className='text-sm text-gray-500 mb-4'>{selectedCourse?.lectures?.length} Lectures</p>
                        
                        <div className='flex flex-col gap-3'>
                             {selectedCourse?.lectures?.map((lecture,index)=>(
                                  <button key={index} 
                                   disabled={!lecture.isPreviewFree} 
                                   onClick={()=>{
                                         if(lecture.isPreviewFree){
                                             setSelectedLecture(lecture)
                                         }
                                   }}
                                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all
                                   duration-200 text-left ${lecture.isPreviewFree ? 'hover:bg-gray-100 cursor-pointer border-gray-300' 
                                        : 'cursor-not-allowed opacity-60 border-gray-200' } ${selectedLecture?.lectureTitle === lecture?.lectureTitle ?
                                              'bg-gray-100 border-gray-400 ':'' } `}>
                                                  <span className='text-lg text-gray-700' >
                                                   {lecture.isPreviewFree ? <FaPlayCircle /> : <FaLock /> }
                                                  </span>
                                                  <span className='text-sm font-medium text-gray-800'>{lecture?.lectureTitle}</span>
                                                 </button>
                             ))}
                        </div>
                   </div>
                   {/* video part */}
                        <div className='bg-white w-full md:w-3/5 p-6 rounded-2xl shadow-lg border border-gray-200'>
                              <div className='aspect-video w-full rounded-lg overflow-hidden mb-4 bg-black flex items-center justify-center'>
                                   {selectedLecture?.videoUrl ? <video src={selectedLecture?.videoUrl} controls /> : 
                                      <span className='text-white text-sm'>Select a preview lecture to watch</span> }
                              </div>                         
                        </div>
              </div>
              {/* reviews */}
               <div className='mt-8 border-t pt-6'>
                    <h2 className='text-xl font-semibold mb-2'>
                         Write a Review
                    </h2>
                    <div className='mb-4'>
                      <div className='flex gap-1 mb-2'>
                            {
                              [1,2,3,4,5].map((star)=>(
                                   <FaStar key={star} onClick={()=> setRating(star)} 
                                   className= {star <= rating ? 'fill-amber-300' : 'fill-gray-300' } />
                              ))
                         }
                      </div>
                      <textarea onChange={(e)=> setComment(e.target.value)} value={comment} className='w-full resize-none border border-gray-300 rounded-lg p-2'
                        placeholder=' Write your review here...' rows={3} />
                        
                      <button onClick={handleReview} disabled={loading} className='px-4 py-2 bg-black text-white rounded-md mt-2 
                      cursor-pointer'>{loading ? <ClipLoader size={30} color='white' /> : 'Submit Review' }</button>
                    </div>

               </div>
               {/* creators Data */}
               <div className='flex items-center gap-4 pt-4 border-t'>
                       
                      {creatorData?.photoUrl ? <img src= {creatorData?.photoUrl} className='w-16 h-16 object-cover rounded-full border-2 border-gray-400' alt="" /> 
                                             :  <img src={img} className='w-16 h-16 object-cover rounded-full border-2 border-gray-400 ' alt="" /> }

                                      <div className='text-lg font-semibold'>
                                       <h2 className='text-lg font-semibold'> {creatorData?.name}</h2>
                                       <p className='md:text-sm text-gray-600 text-[10px]'>{creatorData?.description}</p>
                                       <p className='md:text-sm text-gray-600 text-[10px]'>{creatorData?.email}</p>
                                      
                                        
                                        </div>       
                                   </div>

                                   {/* Other published courses by educator*/}
                                <div>
                                    <p className='text-xl font-semibold mb-2'>
                                          Other Published Courses by the Educator
                                    </p>
                                </div>
                                <div className='w-full transition-all duration-300 py-[20px] flex items-start justify-center 
                                  lg:justify-start flex-wrap gap-6 lg:px-[80px] '> 
                                    {
                                        creatorCourses?.map((course)=>(
                                            <CourseCard key={course._id} thumbnail={course.thumbnail} id={course._id} price={course.price} 
                                            title={course.title} category={course.category}/>
                                        ))
                                    }
                                </div>
                              
                         </div>
                </div>
  )
}

export default ViewCourse