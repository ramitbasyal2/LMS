import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
export const serverUrl = "http://localhost:4000"; //backend url
import { ToastContainer } from "react-toastify";
import getCurrentUser from "./customHooks/useGetCurrentUser.js";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Dashboard from "./pages/Educator/Dashboard";
import Courses from "./pages/Educator/Courses";
import CreateCourses from "./pages/Educator/CreateCourses";
import ForgetPassword from "./pages/ForgetPassword";
import getCreatorCourse from "./customHooks/useGetCreatorCourse.js";
import EditCourse from "./pages/Educator/EditCourse.jsx";
import useGetPublishedCourse from "./customHooks/useGetPublishedCourse.js";
import AllCourses from "./pages/AllCourses.jsx";
import CreateLecture from "./pages/Educator/CreateLecture.jsx";
import EditLecture from "./pages/Educator/EditLecture.jsx";
import ViewCourse from "./pages/Educator/ViewCourse.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ViewLectures from "./components/ViewLectures.jsx";
import MyEnrolledCourses from "./pages/MyEnrolledCourses.jsx";
import useGetAllReviews from "./customHooks/useGetAllReviews.js";
import SearchWithAi from "./pages/SearchWithAi.jsx";


const App = () => {
  getCurrentUser();
  getCreatorCourse();
  useGetPublishedCourse() //hooks same as above 2
  useGetAllReviews()
  const {userData} = useSelector(state=>state.user) // getting userData using react-redux
  return (
    <>
      <ToastContainer />
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={ !userData ? <SignUp /> : <Navigate to={"/"} /> } />
        <Route path="/profile"  element={ userData ? <Profile/> : <Navigate to={"/signup"} /> } />
        <Route path="/forget" element={userData ? <ForgetPassword/> : <Navigate to={"/signup"} />}  />
        <Route path="/editprofile" element={userData ? <EditProfile/> : <Navigate to={'/signup'} /> } />
        <Route path="/dashboard" element={userData?.role === 'educator' ? <Dashboard/> : <SignUp/> } />
        <Route path="/courses" element={userData?.role === 'educator' ? <Courses/> : <Navigate to={'/signup'} /> } />
        <Route path="/allcourses" element={userData ? <AllCourses/> : <Navigate to={'/signup'} /> } />
        <Route path="/createcourses" element={userData?.role === 'educator' ? <CreateCourses/> : <Navigate to={'/signup'} /> } />
        <Route path="/editcourse/:courseId" element={userData?.role === 'educator' ? <EditCourse/> : <Navigate to={'/signup'} /> }/>
        <Route path="/createlecture/:courseId" element={userData?.role === 'educator' ? <CreateLecture/> : <Navigate to={'/signup'}/> } />
        <Route path="/editlecture/:courseId/:lectureId" element={userData?.role === 'educator'? <EditLecture/> :<Navigate to={'/signup'} /> } />
        <Route path="/viewcourse/:courseId" element={userData ? <ViewCourse/> : <Navigate to={'/signup'} /> } />
         <Route path="/viewLecture/:courseId" element={userData ? <ViewLectures/> : <Navigate to={'/signup'} /> } />        
         <Route path="/mycourses" element={userData ? <MyEnrolledCourses/> : <Navigate to={'/signup'} /> } />        
           <Route path="/search" element={userData ? <SearchWithAi/> : <Navigate to={'/signup'} /> } />        
      </Routes>
    </>
  );
};

export default App;
