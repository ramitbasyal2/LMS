import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
      name:"course",
      initialState:{
         creatorCourseData:null, //for inividuals creator's courses
         courseData:null, //for published course data
         selectedCourse:null
      },
      reducers:{
        setCreatorCourseData:(state,action)=>{
            state.creatorCourseData = action.payload
        },
        setCourseData:(state,action)=>{
          state.courseData = action.payload
        },
        setSelectedCourse:(state,action)=>{ //for getting particular course lectures details as well {viewCourse}
          state.selectedCourse = action.payload
        },
      }
})

export const {setCreatorCourseData}  = courseSlice.actions
export const {setCourseData} = courseSlice.actions
export const {setSelectedCourse} = courseSlice.actions
export default courseSlice.reducer