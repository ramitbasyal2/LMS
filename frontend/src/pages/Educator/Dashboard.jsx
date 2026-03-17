import { ArrowLeft } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'

const Dashboard = () => {
  const navigate = useNavigate()  
  const {userData} = useSelector(state=>state.user)
  const {creatorCourseData} = useSelector(state=>state.course); //for graph

  // for courses graph
 const courseProgressData = creatorCourseData?.map((course) => ({
   name: course.title?.slice(0,10) + "...",
   lectures: course.lectures?.length || 0
 })) || [];

//  for enrolledCourses graph
const EnrollData = creatorCourseData?.map((course)=>({
  name: course.title?.slice(0,10) + "...",
  enrolled: course.enrolledStudents?.length || 0
})) || [];

// to show the total revenue
const totalEarning = creatorCourseData?.reduce((sum, course)=> {
  const studentCount = course.enrolledStudents?.length || 0;
  const courseRevenue = course.price ? course.price * studentCount : 0

  return sum + courseRevenue;
},0) || 0



  return (
    <div className='flex min-h-screen bg-gray-100'>
       <ArrowLeft onClick={()=> navigate('/')} size={28} className='absolute top-[7%] left-[5%] lg:left-[10%] h-[22px] cursor-pointer '/>
        <div className='w-full px-6 py-10 bg-gray-50 space-y-10'>
               {/* main section  */}
             <div className='max-w-5xl mx-auto bg-white rouunded-xl shadow-md p-6 flex flex-col 
             md:flex-row items-center gap-6'>
              { userData?.photoUrl ? <img  onClick={()=> setShow(prev=>!prev)} src={userData?.photoUrl} className=' w-28 h-28 
              rounded-full border-4 border-black object-cover '
               alt="" /> : <div  onClick={()=> setShow(prev=>!prev)} className=' w-28 h-28 rounded-full text-white 
              flex items-center text-4xl font-medium  justify-center border-2 bg-black border-white '>
                {userData?.name.slice(0,1).toUpperCase()}</div>}
                              
             
             <div className='text-center md:text-left space-y-1' >
                 <h1 className='text-2xl font-bold text-gray-800'>Welcome, {userData.name || "Educator" } 👋 </h1>
                 <h1 className='text-xl font-semibold text-gray-800'>Total Earning : ₹ {totalEarning.toLocaleString()} </h1>
                 <p  className='text-gray-600 text-sm mb-2'>{userData?.description || "Start Creating Courses For Your Students." }</p> 
                 <h1 className='px-14 text-center py-3 border-2 bg-black border-black text-white rounded-[10px]
                                text-[15px] font-light flex items-center justify-center cursor-pointer ' 
                  onClick={()=> navigate('/courses')} >Create Courses</h1>
             </div>
            
             </div>

             {/* Graph section  */}
             <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8'>
                
                    {/* for lectures  Progress graph */}

                    <div className='bg-white rounded-lg shadow-md p-6'>
                       <h2 className='text-lg font-semibold mb-4'>Course Progress (Lectures)</h2>

                        <ResponsiveContainer width='100%' height={300} >
                          <BarChart data={courseProgressData}>
                             <CartesianGrid strokeDasharray= '3 3' /> 
                           <XAxis dataKey= 'name' />
                           <YAxis/>
                            <Tooltip/>
                             <Bar dataKey="lectures" fill="black" radius={[5,5,0,0]} />
                          </BarChart>
                        </ResponsiveContainer>
                    </div>

                        {/* for enrolled courses Progress graph */}

                    <div className='bg-white rounded-lg shadow-md p-6'>
                       <h2 className='text-lg font-semibold mb-4'>Students Enrollment</h2>

                        <ResponsiveContainer width='100%' height={300} >
                          <BarChart data={EnrollData}>
                             <CartesianGrid strokeDasharray= '3 3' /> 
                           <XAxis dataKey= 'name' />
                           <YAxis/>
                            <Tooltip/>
                             <Bar dataKey="enrolled" fill="black" radius={[5,5,0,0]} />
                          </BarChart>
                        </ResponsiveContainer>
                    </div>
                 
             </div>
        </div>
    </div>
  )
}

export default Dashboard