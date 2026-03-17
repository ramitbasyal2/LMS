import uploadOnCloudinary from "../config/cloudinary.js";
import Course from "../model/courseModel.js";
import Lecture from "../model/lectureModel.js";
import User from "../model/userModel.js";

// controller for creating courses
export const createCourse  = async (req,res) => {
     try {
        const {title, category} = req.body;
        if(!title || !category ){
            return res.status(400).json({message:"title or Category is required "})
        }
        const course = await Course.create({
            title,
            category,
            creator:req.userId, //which comes from isAuth middleware
        })
        return res.status(201).json(course,"course Created")
          
     } catch (error) {
        return res.status(500).json({message:`CreateCourse error ${error}`})
     }
}


// Controller for getting the published courses
export const getPublishedCourses = async (req,res) => {
     try {
        const courses = await Course.find({isPublished:true}).populate("lectures reviews")//so populte garesi tyo course vitra lecture ko title videoUurl sabai access garna milcha
        if(!courses){
            return res.status(400).json({message:"Courses are not found"})
        }
        return res.status(200).json(courses)
     } catch (error) {
        return res.status(500).json({message:` failed to get isPublished Courses ${error}`})
     }
}


//controller to find the particular Creator's(user)  courses
export const getCreatorCourses = async (req,res) => {
     try {
        const userId = req.userId
        const courses = await Course.find({creator:userId})
        if(!courses){
            return res.status(400).json({message:"Courses are not found"})
        }
        return res.status(200).json(courses)
     } catch (error) {
        return res.status(500).json({message:`failed to get Creator's Courses : ${error.mwssage} `})
     }
}

//Controller to edit the specific course
export const editCourse =  async (req,res) => {
    try {
        const {courseId} = req.params //through useParams in frontend we can get the course ID
        const {title, subTitle, description, category, level, 
            isPublished, price} = req.body  
        let thumbnail
        if(req.file){
            thumbnail = await uploadOnCloudinary(req.file.path) //we will pass the selected image on Cloudinary
        }
        let course = await Course.findById(courseId);
        if(!course){
            return res.status(400).json({message:"Course is not found"})
        }
        const updateData = {title, subTitle, description, category, level, isPublished
            ,price, thumbnail}
        course = await Course.findByIdAndUpdate(courseId, updateData, {new:true})
        return res.status(200).json(course)    
    } catch (error) {
        return res.status(500).json({message:` failed to  edit course  ${error}`})
    }
}

// Controller to find the specific course through CourseID
export const getCourseById = async (req,res) => {
     try {
        const {courseId} = req.params;
        let course = await Course.findById(courseId)
        if(!course){
            return res.status(400).json({message:"Course is not found"})
        }
        return res.status(200).json(course)
     } catch (error) {
        return res.status(500).json({message:`failed to getCourseByd ${error} `})
     }
}

//Controller to Delete a particular Course
export const removeCourse = async (req,res) => {
     try {
        const {courseId} = req.params;
        let course = await Course.findById(courseId);
        if(!course){
            return res.status(400).json({message:"Course is not found"})
        }

        course = await Course.findByIdAndDelete(courseId, {new:true})
       return res.status(200).json({message:"Course Deleted Successfully"}) 
    } catch (error) {
        return res.status(500).json({message:` failed to removeCourse ${error}`})
     }
}


// ======================================================================= Lectures Controllers ================================================================

export const createLecture = async (req,res) => {
     try {
         const {lectureTitle} = req.body;
         const {courseId} = req.params;
         if(!lectureTitle || !courseId){
            return res.status(400).json({message:"LectureTitle is required!"})
         } 
         const lecture = await Lecture.create({lectureTitle})
         const course = await Course.findById(courseId)
         if(course){
             course.lectures.push(lecture._id)
         }

        await course.populate("lectures")
         course.save()
         return res.status(201).json({lecture, course})
     } catch (error) {
        return res.status(500).json({message:`failed to create lecture:  ${error.message}`})
     }
}


export const getCourseLecture = async (req,res) => {
    try {
        const {courseId} = req.params;
        const course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({message:"Course is not found"})
        }
        await course.populate("lectures")
        await course.save()
        return res.status(200).json(course)
    } catch (error) {
          return res.status(500).json({message:`failed to get Course lecture:  ${error.message}`})
    }   
} 

export const editLecture = async (req,res) => {
      try {
        const {lectureId} = req.params;
        const {isPreviewFree, lectureTitle} = req.body;
        const lecture = await Lecture.findById(lectureId);
        if(!lecture){
            return res.status(404).json({message:"Lecture is not found"})
        }
        let videoUrl
        if(req.file){
            videoUrl = await uploadOnCloudinary(req.file.path)
            lecture.videoUrl = videoUrl
        }
        if(lectureTitle){
            lecture.lectureTitle = lectureTitle
        }
        lecture.isPreviewFree = isPreviewFree
        await lecture.save()
        return res.status(200).json({mesage:"Lecture Updated",lecture})
      } catch (error) {
        return res.status(500).json({message:`failed to edit lecture ${error.message}`})
      }
}

export const removeLecture = async (req,res) => {
    try {
        const {lectureId} = req.params;
        const lecture = await Lecture.findByIdAndDelete(lectureId)
        if(!lecture){
            return res.status(400).json({message:'Lecture not found!'})
        }
        await Course.updateOne(
            {lectures:lectureId},
            {$pull:{lectures:lectureId}}
        )
        return res.status(200).json({message:'Lecture Removed'})
    } catch (error) {
     return res.status(500).json({message:`failed to remove Lecture ${error.message}`})   
    }
}

//get creator

export const getCreatorById = async (req,res) => {
     try {
         const {userId} = req.body;

         const user = await User.findById(userId).select("-password")

         if(!user){
            return res.status(400).json({message:"User not found"})
         }
         return res.status(200).json(user)
     } catch (error) {
        return res.status(500).json({message:` failed to get User/Creator ${error.message} `})
     }
}