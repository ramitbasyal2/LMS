import User from "../model/userModel.js";
import validator from 'validator'
import bcrypt from 'bcryptjs'
import genToken from "../config/token.js";
import sendMail from "../config/sendMail.js";

//Endpoint for signUp
export const signUp = async (req,res)=>{
     try {
         const {name,email,password,role} = req.body;

         const existUser = await User.findOne({email});
         if(existUser){
            return res.status(400).json({message:"User already exits!"})
         }
         if(!validator.isEmail(email)){ //checks wheather the email is valid or not
           return res.status(400).json({message:"Enter a valid email!"})
         }
         if(password.length < 8){
            return res.status(400).json({message:"Enter a Strong Password!"})
         }
         let hashPassword = await bcrypt.hash(password, 10);
         const user = await User.create({
             name,
             email,
             password:hashPassword,
             role
         })

         //after user creation generate a token
         let token =  genToken(user._id);
         res.cookie("token",token,{
            httpOnly:true,
            secure:true, // true in production (https)
            sameSite:"none",
            maxAge: 7 * 24 * 60 * 60 * 1000
         })
         return res.status(201).json({ user,
            message: "User Registered Successfully"
            // _id: user._id,
            // name: user.name,
            // email: user.email,
            // role: user.role,
            // photoUrl:user. photoUrl,
         })
     } catch (error) {
        return res.status(500).json({message:`SignUp error ${error.message}`})
     }
}

//Endpoint for login

export const login = async (req,res)=>{
    try {
      const {email,password} = req.body;
      let user = await User.findOne({email});
       if(!user){
         return res.status(404).json({message:"user not found"})
       } 
       let isMatch = await bcrypt.compare(password, user.password);
       if(!isMatch){
         return res.status(400 ).json({message:"Email or password invalid"})
       }
       
       let token = genToken(user._id);
       res.cookie("token", token, {
          httpOnly:true,
          secure:true, //true in production(https)
          sameSite: "none",//strict for localhost
          maxAge: 7 * 24 * 60 * 60 * 1000
       })
       return res.status(200).json({message:"Logged In Successfully!!",
         _id: user._id,
         name: user.name,
         email: user.email,
         password: user.password,
         role:user.role,
         photoUrl:user. photoUrl,

       })

    } catch (error) {
       return res.status(500).json({message:`Login error ${error.message}`})
    }
}

//Endpoint for logOut

export const logOut =  (req,res)=>{
     try {
        res.clearCookie("token",{
             httpOnly:true,
             secure:true,
             sameSite:"none",
             maxAge: 7 * 24 * 60 * 60 * 1000
        }); // clear the cookie named token
       return res.status(200).json({
         message:"LogOut Successfully"})

     } catch (error) {
       return res.status(500).json({
         message:`LogOut error ${error.message}`})
     }
};

//============================================ for reset functionality starts from here====================================================

export const sendOtp = async (req,res) => {
    try {
       const {email} = req.body;
       const user = await User.findOne({email});
       if(!user){
         return req.status(400).json({meessage:"User not found!"})
       }
       const otp = Math.floor(1000 + Math.random()* 9000).toString()
       user.resetOtp = otp, //pushing the otp value to user's rersetOtp
       user.otpExpires = Date.now() + 5 * 60 * 1000, //expires in 5 min from currentDate
       user.isOtpVerified = false   // otp isn't varifed

       await user.save()
       await sendMail(email,otp); //sending the user's email and the generated Otp
       res.status(200).json({message:"Otp Sent Successfully!"})
    } catch (error) {
      return res.status(500).json({message:`Send Otp error ${error} `})
    }
}

export const verifyOTP = async (req,res) => {
             try {
                  const {email,otp} = req.body;
                   const user = await User.findOne({email});
                   if(!user || user.resetOtp != otp || user.otpExpires < Date.now()){
                     return res.status(404).json({message: "Invalid OTP"})
                   } 
                   user.isOtpVerified = true,
                   user.resetOtp = undefined,
                   user.otpExpires = undefined,

                   await user.save()

                  res.status(200).json({message:"Otp verified Successfully!"})

             } catch (error) {
               return res.status(500).json({message:`Verify Otp error ${error} `})
             }
}

export const resetPassword = async (req,res) => {
        try {
          const {email,password} = req.body;
         const user = await User.findOne({email})
         if(!user ){
            return res.status(400).json({message:"OTP verification is required"});
         }
         const hashPassword = await bcrypt.hash(password,10);
         user.password = hashPassword;;
         user.isOtpVerified = false

         await user.save()
         return res.status(200).json({message: "Reset Password Successfully!"})
      
        } catch (error) {
            return res.status(500).json({messagee:`Reset Password Error ${error} `})   
        }
}

//============================== Google SignUp/login Contooller==========================

export const googleAuth = async (req,res) => {
    try {
     let {name,email,role} = req.body;
      let user = await User.findOne({email});
      if(!user){
        user = await User.create({
          name,
          email,
          role
        })
      }
      let token =  genToken(user._id)
      res.cookie("token", token, {
        httpOnly:true,
        secure:true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      return res.status(200).json(user)

    } catch (error) {
      return res.status(500).json({message: "GoogleAuth error"})
    }
}
