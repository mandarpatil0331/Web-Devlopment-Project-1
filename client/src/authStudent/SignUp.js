import React, { useState } from "react";
import { Typography, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Card, CardContent, Grid,Dialog,DialogActions,DialogTitle,DialogContent,DialogContentText } from "@mui/material";
import classes from "./SignIn.module.css";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate=useNavigate();
    const [openDialog,setOpenDialog] = useState(false);
  const host = "http://localhost:8000";
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });

    const handleCloseDialog = () => {
        setOpenDialog(false)
        navigate("/SignIn")
    }

  const checkRePassword = () => {
    if (credentials.password === credentials.rePassword) {
      return true;
    }
    return false;
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const clickSubmit = async (e) => {
    if (checkRePassword()) {
      const newuserdata = {
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        description:""
      };
      console.log(newuserdata);
      let response = await fetch(`${host}/api/student`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newuserdata),
      });
      const svrres = await response.json();
      console.log(svrres);
        setOpenDialog(true);

    } else {
      console.log("password not match");
    }
  };
  return (
    <>
      <Card style={{ boxShadow: "none" }} sx={{ mt: 10 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }} align="center">
            Sign Up
          </Typography>
          <Grid
            container
            alignItems="center"
            justify="center"
            direction="column"
          >
            <Grid item>
              <TextField
                id="name"
                type="name"
                label="Name"
                name="name"
                className={classes.input}
                value={credentials.name}
                onChange={onChange}
                style={{ width: 400 }}
              />
            </Grid>
            <br />
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
            <br />
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
            <br />
            <Grid item>
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
            </Grid>
          </Grid>
        </CardContent>
        <div className={classes["submit-btn-contianer"]}>
          <Button onClick={clickSubmit} className={classes.SubmitBtn}>
            Submit
          </Button>
        </div>
      </Card>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account created sucessfully.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signIn" style={{ color: "inherit", textDecoration: "inherit" }}>
            <Button>Sign In</Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignUp;
