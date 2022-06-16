import React,{useState,useContext,useEffect} from 'react'
import { Typography, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Card, CardContent,Grid} from "@mui/material";
import classes from "./SignIn.module.css";
import { useNavigate } from 'react-router-dom';
import  AuthContext  from '../context/AuthContext';

export default function SignIn(props) {
  const contextval=useContext(AuthContext);
    const navigate=useNavigate();
    const [formErrors,setFormErrors] = useState({});
    const [isSubmit,setIsSubmit] = useState(false);
    const host = "http://localhost:8000";
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
      });
    
    
      const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };
    
      const clickSubmit = async (e) => {
        e.preventDefault();
        setIsSubmit(true);
        setFormErrors(validate(credentials));
        const userdata = {
          email: credentials.email ,
          password: credentials.password ,
        };
        let response = await fetch(`${host}/api/auth/student/signin`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(userdata),
          });
          const svrres = await response.json();
          console.log(svrres);
          localStorage.setItem("token", svrres.token);
          contextval.UserSignIn(svrres.data.user);
          navigate(-1);
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
    <>
    <Card style={{boxShadow: "none"}} sx={{mt:10}}>
        <CardContent>
          <Typography
            variant="h6"
            sx={{ mb: 1 }}
            align="center"
          >
            Sign In
          </Typography>
          <Grid
            container
            alignItems="center"
            justify="center"
            direction="column"
          >
            <Grid item>
              <TextField
                id="email"
                type="email"
                label="Email"
                name="email"
                className={classes.input}
                value={credentials.email}
                onChange={onChange}
                style={{ width: 400 }}
              />
            </Grid>
            <p style={{ color: 'red' }}>{formErrors.email}</p>
            <br/>
            <Grid item>
              <TextField
                id="password"
                type="password"
                label="Password"
                name="password"
                className={classes.input}
                value={credentials.password}
                onChange={onChange}
                style={{ width: 400 }}
              />
            </Grid>
            <p style={{ color: 'red' }}>{formErrors.password}</p>
            </Grid>
        </CardContent>
        <div className={classes["submit-btn-contianer"]}>
          <Button onClick={clickSubmit} className={classes.SubmitBtn}>
            Submit
          </Button>
        </div>
      </Card>
    </>
  )
}
