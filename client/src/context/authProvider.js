import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = (props) => {
    const [isInstructor, setIsInstructor] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const host = "http://localhost:8000"; 
    const checkAuthentication=async()=>{
      if (localStorage.getItem("token") && localStorage.getItem("isInstructor")){
        console.log("token found and is instructor");
      let response = await fetch(`${host}/api/auth/educator/isLoggedIn`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include"
        });
        const svrres = await response.json();
        setCurrentUser((prevuser)=>{
          return svrres.data.user;
        })
        setIsInstructor((prevEducatorbool)=>{return true});
      }
      else if(localStorage.getItem("token")){
        console.log("token found and student");
      let response = await fetch(`${host}/api/auth/student/isLoggedIn`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include"
        });
        const svrres = await response.json();
        setCurrentUser((prevuser)=>{
          return svrres.data.user;
        })
        setIsInstructor((prevEducatorbool)=>{return false});
    }
  }
    useEffect(()=>{
      checkAuthentication();
      console.log("function called");
      const token=localStorage.getItem("token")
    },[])

    const UserSignIn=(user)=>{
      setCurrentUser((prevuser)=>{
        return user;
      });
    }

    const UserSignOut=()=>{
      setCurrentUser((prevuser)=>{ return null})
    }

    const ChangeisEducator=(isEducator)=>{
      setIsInstructor((prevEducatorbool)=>{return isEducator})
    }

    const context={
      isInstructor:isInstructor
      ,User:currentUser
      ,UserSignIn:UserSignIn
      ,UserSignOut:UserSignOut
      ,ChangeisEducator:ChangeisEducator
    }

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
