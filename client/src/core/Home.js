import React, { useState } from 'react'
import MyCourses from '../course/MyCourses'
import Courses from "../course/Courses"
import EducatorLinkBlock from './EducatorLinkBlock'

const Home = () => {
  const [user,setUser]=useState(false);
  const UserCourses=(<MyCourses/>)
  return (
      <>
      {user && UserCourses}
      <Courses/>
      <EducatorLinkBlock/>
    </>
  )
}

export default Home