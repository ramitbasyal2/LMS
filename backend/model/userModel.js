import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
        name:{
            type:String,
            required:true
        },
        description:{
            type:String
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:false            
        },
        role:{
            type:String,
            enum:["student","educator"],
            required:true
        },
        photoUrl:{
            type:String,
            default:""
        },
        enrolledCourses:[{
            type:mongoose.Schema.Types.ObjectId,
            ref: "Course" //reference of course
        }],
        resetOtp:{
            type:String,
        },
        otpExpires:{
            type:Date
        },
        isOtpVerified:{
            type:Boolean,
            default:false
        }


},{timestamps:true})

const User = mongoose.model("User", userScheme);
export default User;