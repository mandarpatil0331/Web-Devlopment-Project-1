import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = (props) => {
    const [isInstructor, setIsInstructor] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const host = "http://localhost:8000"; 

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
