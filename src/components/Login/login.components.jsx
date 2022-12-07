import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { TextField, Button, Box, Grid, Link, Typography, Container, Card } from "@mui/material";
import isEmail from 'validator/lib/isEmail';
import axios from 'axios';
import BasicAlerts from '../Alerts/alert';

import { UserContext } from "../../Context/user.context";
import logo from './../Login/Icon.png';

import './login.styles.scss';

function Login(props) {
    // State initialization
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValid, setEmailValid] = useState(true);
    const [userLogged, setUserLogged] = useState(false);
    const [allFeilds, setAllFeilds] = useState(false);
    const [inValidLogin, setinValidLogin] = useState({ status: false, message: 'None' });
    const { userData, setUser } = useContext(UserContext)

    const navigate = useNavigate();

    // Update emailfeild on change and provides an alert if the user doesn't enter a valid email
    const emailChangeValidate = (e) => {
        const val = e.target.value;
        setAllFeilds(false);
        if (isEmail(val)) {
            setinValidLogin({ status: false, message: 'None' });
            setEmail(val);
            setEmailValid(true);
        }
        else {
            setEmailValid(false);
            setEmail('');
        }
    }
    // Update passwordfeild on change
    const passwordChange = (e) => {
        setinValidLogin({ status: false, message: 'None' });
        setPassword(e.target.value);
        setAllFeilds(false);
    }

    //Submit the user credentials to the server for authentication
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        if (email && password) {
            axios({
                // Endpoint to send files
                url: "https://prep-buddy-backend.herokuapp.com/user/login",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                // Attaching the form data
                data: formData
            })
                // Handle the response from backend here
                .then((res) => {
                    console.log("log in response", res)
                    const jsonData = {
                        isLoggedIn: true,
                        firstName: res.data.firstName,
                        lastName: res.data.lastName,
                        id: res.data.id,
                        email: res.data.email,
                        token: res.data.token
                    }
                    setUser(jsonData);
                    navigate('/mock-interviews');
                })
                // Catch errors if any
                .catch((err) => {
                    setinValidLogin({ status: true, message: err.response.data.message });
                    //console.log(err.code);
                    //console.log("error: ", err.response.data.message)
                });
        }
        else {
            //If any mandatory feilds are filled it will throw an error popup
            setAllFeilds(true);
        }
    }
    return (
        <>
            {
                userLogged ? (
                    // <Homepage />
                    <h1>LoggedIn</h1>
                ) : (
                    <Card className="loginCard" sx={{ boxShadow: 4, borderRadius: 4 }} variant="outlined">

                        <Container component="main" maxWidth="xs">
                            <Box className="boxMain">
                                {/* PrepBuddy Logo */}
                                <img src={logo} alt="logo" className="logo" />
                                <div className="signInDiv">
                                    <Typography component="h1" variant="h5" className="signInTypography">
                                        Sign in
                                    </Typography>
                                </div>

                                {/* Display Alert if user tries to signup without providing all mandator feilds or user email is not verified or enter invalid credentials */}
                                {allFeilds && <BasicAlerts message="All fields are mandatory" severity='error' />}
                                {inValidLogin.status && <BasicAlerts message={inValidLogin.message} severity='error' />}

                                <Box component="form" onSubmit={(e) => handleSubmit(e)} noValidate sx={{ mt: 1 }}>

                                    <TextField error={emailValid === false} margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus onChange={(e) => emailChangeValidate(e)} />

                                    <TextField margin="normal" required fullWidth id="password" label="Password" type="password" name="password" autoComplete="Password" autoFocus onChange={(e) => passwordChange(e)} />

                                    <Button type="submit" fullWidth variant="contained" sx={{ marginTop: 2 }}>Sign In</Button>

                                    <Grid container className="gridSignUp">
                                        <Grid item>
                                            <Link href="/sign-up" variant="body2">
                                                {"Don't have an account? Sign Up"}
                                            </Link>
                                        </Grid>
                                    </Grid>

                                </Box>
                            </Box>
                        </Container>
                    </Card>
                )
            }
        </>
    );
}

export default Login;