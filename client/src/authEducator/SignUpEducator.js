import React, { useState,useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
  DialogActions,
  Box
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import classes from "../authStudent/SignIn.module.css";
import { color } from "@mui/system";


const SignUpEducator = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(true);
  const [formErrors,setFormErrors] = useState({});
  const [isSubmit,setIsSubmit] = useState(false);
  const host = "http://localhost:8000";
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const checkRePassword = () => {
    if (credentials.password === credentials.rePassword) {
      return true;
    }
    return false;
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/Instructor");
  };
  const clickSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    setFormErrors(validate(credentials));
    if (checkRePassword()) {
      const neweducatordata = {
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        description: "",
      };
      console.log(neweducatordata);
      let response = await fetch(`${host}/api/educator`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(neweducatordata),
      });
      const svrres = await response.json();
      console.log(svrres);
      setOpenDialog(false);
      navigate("/Educator");
    } else {
      console.log("password not match");
    }
  };
  const validate =  (values) => {
    const errors = {};
    const regex_email = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if(!values.name)
    {
      errors.name = "Name is required";
    }
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
    if(!values.rePassword)
    {
      errors.rePassword = "Re enter the password";
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
      <DialogTitle>Create New Educator Account</DialogTitle>
      <DialogContent>
        <TextField
          id="name"
          type="name"
          label="Name"
          name="name"
          className={classes.input}
          value={credentials.name}
          onChange={onChange}
          style={{ width: 400, marginBottom: 15 }}
        />
        <Box style={{ color: 'red' }}>
        <p>{formErrors.name}</p>
        </Box> 
        <br />
        <TextField
          id="email"
          type="email"
          label="Email"
          name="email"
          className={classes.input}
          value={credentials.email}
          onChange={onChange}
          style={{ width: 400, marginBottom: 15 }}
        />
        <Box style={{ color: 'red' }}> 
        <p>{formErrors.email}</p>
        </Box> 
        <br />
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
        <Box style={{ color: 'red' }}> 
        <p>{formErrors.password}</p>
        </Box> 
        <br/>
        <TextField
                id="repassword"
                type="repassword"
                label="Enter Password Again"
                name="rePassword"
                className={classes.input}
                value={credentials.rePassword}
                onChange={onChange}
                style={{ width: 400 }}
              />
          <Box style={{ color: 'red' }}> 
          <p>{formErrors.rePassword}</p>
          </Box> 
      </DialogContent>
      <DialogActions>
        <Button onClick={clickSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignUpEducator;
