import { ArrowLeft } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'

const EditProfile = () => {
    const navigate = useNavigate()
    const {userData} = useSelector(state=>state.user)
    const [name, setName] = useState(userData?.name || "");
    const [description, setDescription] = useState(userData.description || "");
    const [photoUrl, setPhotoUrl] = useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();


    // to upload the image we need form so,
    const formData = new FormData()
    formData.append("name",name)
    formData.append("description",description)
    formData.append("photoUrl", photoUrl )


    const handleEditProfile = async () => {
         setLoading(true) 
        try {
            const result = await axios.post(serverUrl + "/api/user/profile", formData,
               {withCredentials:true})
               dispatch(setUserData(result.data))
               setLoading(false)
               navigate('/')
               toast.success("Profile Updated Successfully!")
         } catch (error) {
            setLoading(false)
            console.log(error)
            toast.error(error.response.data.message)
         }
    }


  return (
    <div className=' h-screen bg-gray-100 flex items-center justify-center'>
        <div className=' relative bg-white rounded-md p-8 flex items-center justify-center flex-col '>
                 <ArrowLeft onClick={()=> navigate('/profile')} className='absolute top-[8%] left-[5%]  cursor-pointer'/>
               <div className='flex items-center justify-between flex-col space-y-4'>
                      <h1 className='text-2xl font-bold'>Edit Profile</h1>
                     {userData?.photoUrl ? <img src={userData?.photoUrl} className='w-24 h-24 rounded-full object-cover border-4 border-black' alt="" />
                          :
                           <div className='w-24 h-24 rounded-full bg-black text-white flex items-center justify-center
                       font-bold text-4xl'>{userData.name.slice(0,1).toUpperCase()}</div> 
                     }
              </div>

            <form onSubmit={(e)=> e.preventDefault()} className='space-y-4 mt-6'> 
                  <div>
                 <label htmlFor="image" className='text-sm font-medium text-gray-700'>Select Avator</label>
                 <input id='image' type="file" required onChange={(e)=> setPhotoUrl(e.target.files[0])} 
                  name='photoUrl' 
                  placeholder='PhotoUrl'
                  accept='image/*'
                  className='w-full px-4 py-2 border rounded-md text-sm'/>
              </div>
               <div>
                 <label htmlFor="name" className='text-sm font-medium text-gray-700'>UserName</label>
                 <input id='name' type="text" required onChange={(e)=> setName(e.target.value)} value={name}
                  placeholder={userData.name}
                  accept='image/*'
                  className='w-full px-4 py-2 border rounded-md text-sm'/>
              </div>
               <div>
                 <label className='text-sm font-medium text-gray-700'>Email</label>
                 <input readOnly type="email" 
                  placeholder={userData.email}
                  className='w-full px-4 py-2 border rounded-md text-sm'/>
              </div>
               <div>
                 <label htmlFor="name" className='text-sm font-medium text-gray-700'>Bio</label>
                 <textarea rows={3} required onChange={(e)=> setDescription(e.target.value)} value={description}
                 name='description'
                 placeholder='Tell us about yourself..'
                  className='w-full px-4 py-2 border rounded-md resize-none focus:ring-2 focus:ring-black'/>
              </div>
              <button onClick={handleEditProfile} disabled={loading} className='w-full bg-black active:bg-[#454545] text-white py-2 
              rounded-md font-medium transition cursor-pointer ' >{loading ? <ClipLoader size={30} color='white' /> : "Save Changes"}</button>  
            </form>
        </div>
    </div>
  )
}

export default EditProfile