import React,{useState,useContext} from 'react'
import { Typography, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Card, CardContent,Grid} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import  AuthContext  from '../context/AuthContext';

const MyPublicProfile = () => {
  const contextval=useContext(AuthContext);
    const navigate=useNavigate();
    const host = "http://localhost:8000";
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
      });
    
    
      const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };
    
      const clickSubmit = async (e) => {
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
  return (
    <Card>
      <CardContent>
          <Typography
            variant="h1"
            sx={{ mb: 1 }}
            align="center"
          >
            Public Profile
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
                className="input"
                value={credentials.email}
                onChange={onChange}
                style={{ width: 400 }}
              />
            </Grid>
            <br/>
            <Grid item>
              <TextField
                id="password"
                type="password"
                label="Password"
                name="password"
                className="input"
                value={credentials.password}
                onChange={onChange}
                style={{ width: 400 }}
              />
            </Grid>
            </Grid>
        </CardContent>
    </Card>
  )
}

export default MyPublicProfile