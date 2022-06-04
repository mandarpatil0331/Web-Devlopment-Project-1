import React,{ createContext } from "react";

const AuthContext = createContext({
    instructor: false,
    currentUser: null,
    UserSignIn: (user) => {},   
    UserSignOut: () => {},  
    ChangeisEducator: (isEducator) => {},
}
);


export default AuthContext;