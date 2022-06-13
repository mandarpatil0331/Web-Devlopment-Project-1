import React, { useContext } from 'react'
import MyCourses from '../course/MyCourses'
import Courses from "../course/CoursesComponent/Courses"
import EducatorLinkBlock from './EducatorLinkBlock'
import AuthContext from '../context/AuthContext'

const Home = () => {
  const {User}=useContext(AuthContext)
  const UserCourses=(<MyCourses/>)
  return (
      <>
      {User && UserCourses}
      <Courses/>
      <EducatorLinkBlock/>
    </>
  )
}

export default Home