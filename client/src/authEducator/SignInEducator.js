import React,{useContext, useState} from 'react'
import { Dialog,DialogTitle,DialogContent,DialogContentText,TextField,Button,DialogActions } from '@mui/material'
import{Link, useNavigate} from 'react-router-dom';
import classes from "../authStudent/SignIn.module.css";
import AuthContext from '../context/AuthContext';

const SignInEducator = () => {
    const host = "http://localhost:8000";
    const contextval=useContext(AuthContext);
    const navigate=useNavigate()
    const [openDialog,setOpenDialog] = useState(true);
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
          navigate(`/Instructor/${svrres.data.user._id}`);
      }
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
    </DialogContent>
    <DialogActions>
        <Button onClick={clickSubmit}>Submit</Button>
    </DialogActions>
  </Dialog>
  )
}

export default SignInEducator