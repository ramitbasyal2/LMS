import { createSlice } from "@reduxjs/toolkit";



const userslice = createSlice({
     name:"user",
     initialState:{
        userData:null
     },
     reducers:{
        setUserData:(state,action)=>{
              state.userData = action.payload;
        }
     }
})

export const {setUserData} = userslice.actions
export default userslice.reducer