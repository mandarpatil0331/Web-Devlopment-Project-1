import React,{useContext} from 'react'
import { Outlet } from 'react-router-dom'
import EducatorLinkBlock from './EducatorLinkBlock'
import AuthContext from '../context/AuthContext'

const EducatorHome = () => {
    const {User,isInstructor} = useContext(AuthContext)
    const educatorSignUpLinkBox=(
        <EducatorLinkBlock/>
    )
  return (
    <>
    {!User && educatorSignUpLinkBox}
    {User && !isInstructor && educatorSignUpLinkBox}
    <Outlet/>
    </>
  )
}

export default EducatorHome