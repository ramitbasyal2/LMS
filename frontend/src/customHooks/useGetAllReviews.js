import React from 'react'
import { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setReviewData } from '../redux/reviewSlice'
import axios from 'axios'

const useGetAllReviews = () => {
     const dispatch = useDispatch() 
 
    useEffect(()=>{
       const allReviews = async () => {
          try {
            const {data} = await axios.get(`${serverUrl}/api/review/getreview`, {withCredentials:true});
            dispatch(setReviewData(data)) 
            console.log("review,",data)
        } catch (error) {
            console.log("review error ,",error.message)
          }
       }
       allReviews()
    },[dispatch])
}

export default useGetAllReviews