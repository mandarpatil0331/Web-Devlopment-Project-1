import React,{useContext, useState,useEffect} from 'react'
import { Dialog,DialogTitle,DialogContent,DialogContentText,TextField,Button,DialogActions } from '@mui/material'
import{Link, useNavigate} from 'react-router-dom';
import classes from "../authStudent/SignIn.module.css";
import AuthContext from '../context/AuthContext';
import { SliderValueLabelUnstyled } from '@mui/base';

const SignInEducator = () => {
    const host = "http://localhost:8000";
    const contextval=useContext(AuthContext);
    const navigate=useNavigate()
    const [openDialog,setOpenDialog] = useState(true);
    const [formErrors,setFormErrors] = useState({});
    const [isSubmit,setIsSubmit] = useState(false);
    const [credentials, setCredentials] = useState({
        email:"",
        password:""
      });
      const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };
      const handleCloseDialog = () => {
        setOpenDialog(false)
        navigate("/Educator")
    }
    const clickSubmit = async (e) => {
        e.preventDefault();
        setIsSubmit(true);
        setFormErrors(validate(credentials));
        const educatordata = {
          email: credentials.email ,
          password: credentials.password ,
        };
        let response = await fetch(`${host}/api/auth/educator/signin`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(educatordata),
          });
          const svrres = await response.json();
          console.log(svrres);
          localStorage.setItem("token", svrres.token);
          contextval.UserSignIn(svrres.data.user);
          contextval.ChangeisEducator(true);
          localStorage.setItem("isInstructor", true);
          navigate(`/Instructor`);
      }
    const validate =  (values) => {
      const errors = {};
      const regex_email = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      if(!values.email){
        errors.email = "Email is required";
      }
      else if(!regex_email.test(values.email))
      {
        errors.email = "This is not a valid email";
      }
      if(!values.password){
        errors.password = "Password is required";
      }
      return errors;
    }
  useEffect(()=> {
    console.log(formErrors);
    if(Object.keys(formErrors).length === 0 && isSubmit)
    {
        console.log(credentials);
    }
  })
  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
    <DialogTitle>Login Educator Account</DialogTitle>
    <DialogContent>
              <TextField
                id="email"
                type="email"
                label="Email"
                name="email"
                className={classes.input}
                value={credentials.email}
                onChange={onChange}
                style={{ width: 400 ,marginBottom:15}}
              />
              <p style={{ color: 'red' }}>{formErrors.email}</p>
              <br/>
              <TextField
                id="password"
                type="password"
                label="Password"
                name="password"
                className={classes.input}
                value={credentials.password}
                onChange={onChange}
                style={{ width: 400,marginBottom:15 }}
              />
              <p style={{ color: 'red' }}>{formErrors.password}</p>
    </DialogContent>
    <DialogActions>
        <Button onClick={clickSubmit}>Submit</Button>
    </DialogActions>
  </Dialog>
  )
}

export default SignInEducator