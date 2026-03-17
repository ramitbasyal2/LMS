import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ReviewCard from './ReviewCard';


const ReviewPage = () => {
 
    const {reviewData} = useSelector(state=>state.review);
    const [latestReview , setLatestReview] = useState(null);

    useEffect(()=>{
       setLatestReview(reviewData?.slice(0,6))
    },[reviewData])

  return (
    <div className='flex items-center justify-center flex-col' >
         <h1 className='md:text-[50px] text-[30px] font-semibold text-center mt-[30px] 
           px-[20px] '>Real Reviews for Real Courses</h1>
           <span className='lg:w-[50%] md:w-[80%] text-[15px] text-center 
              mt-[30px] mb-[30px] px-[20px]'>
           Discover how our Virtual Courses is transforming learining experiences through real 
           feedback from students and professionals worldwide.
           </span>

           <div className='w-[100%]  flex items-center justify-center flex-wrap 
               gap-[50px] lg:p-[50px] md:p-[30px] p-[10px] mb-[40px] '>
                  
                  {
                    latestReview?.map((review, index)=> (
                         <ReviewCard key={index} name={review.user?.name} comment={review.comment} photoUrl={review.user?.photoUrl} 
                            rating={review.rating} courseTitle={review.course?.title} description={review.user?.description} />
                    )) 
                  }
           </div>
         
    </div>
  )
}

export default ReviewPage