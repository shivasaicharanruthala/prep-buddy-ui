import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

import { TextField, Button, Box, Grid, Link, Typography, Container, Card } from "@mui/material";
import isEmail from 'validator/lib/isEmail';
import axios from 'axios';
import BasicAlerts from '../Alerts/alert';

import './SignUp.styles.scss';


function SignUp(props) {
    // State initialization
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValid, setEmailValid] = useState(true);
    const [userExists, setUserExists] = useState(false);
    const [allFeilds, setAllFeilds] = useState(false);
    const [verificationEmail, setVerificationEmail] = useState(false);

    const navigate = useNavigate();

    // Updates the email firstName lastName and Password on change and provides an alert if the user doesn't enter a valid email
    const emailChangeValidate = (e) => {
        const val = e.target.value;
        setAllFeilds(false);
        if (isEmail(val)) {
            setEmail(val);
            setEmailValid(true);
            setUserExists(false);
        }
        else {
            setEmailValid(false);
            setEmail('');
        }
    }
    const firstNameChange = (e) => { setFirstName(e.target.value); setAllFeilds(false); }
    const lastNameChange = (e) => { setLastName(e.target.value); setAllFeilds(false); }
    const passwordChange = (e) => { setPassword(e.target.value); setAllFeilds(false); }

    //Submit the user credentials to the server
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('password', password);

        // Handles the submission only when all the mandatory feilds are entered
        if (firstName && lastName && email && password) {
            axios({
                // Endpoint to send files
                url: "http://localhost:8080/user/signup",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                // Attaching the form data
                data: formData
            })
                // Handle the response from backend here
                .then((res) => {
                    // Email verification notification
                    setVerificationEmail(true);
                    setTimeout(() => {
                        navigate('/Login');
                    }, 1000);
                    //console.log("response: ", res)
                })
                // Catch errors if any
                .catch((err) => {
                    //console.log(err.code);
                    if (err.code === "ERR_BAD_REQUEST") {
                        setUserExists(true);
                    }
                });
        }
        else {
            //If any mandatory feilds are empty it will throw an alert
            setAllFeilds(true);
        }
    }



    return (
        <Card className="signupCard" sx={{ boxShadow: 4, borderRadius: 4 }} variant="outlined">
            <Container component="main" maxWidth="xs">
                <Box className="boxMain">
                    <div className="AccountDiv">
                        <Typography component="h2" variant="h5" className="signUpAccountTypography">
                            CREATE AN ACCOUNT
                        </Typography>
                    </div>

                    {/* Display Alert if user tries to signup without providing all mandator feilds or user already exists */}
                    {userExists && <BasicAlerts message='User with this email already exists' severity='error' />}
                    {allFeilds && <BasicAlerts message='All fields are mandatory' severity='error' />}
                    {verificationEmail && <BasicAlerts message='An Verification Email was sent' severity='success' />}

                    <Box component="form" onSubmit={(e) => handleSubmit(e)} noValidate>

                        <TextField margin="normal" required fullWidth id="firstName" label="First Name" name="firstName" autoComplete="First Name" autoFocus onChange={(e) => firstNameChange(e)} />
                        <TextField margin="normal" required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="Last Name" autoFocus onChange={(e) => lastNameChange(e)} />
                        <TextField error={emailValid === false} margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus onChange={(e) => emailChangeValidate(e)} />

                        <TextField margin="normal" required fullWidth id="password" label="Password" type="password" name="password" autoComplete="Password" autoFocus onChange={(e) => passwordChange(e)} />

                        <Button type="submit" fullWidth variant="contained" className="signUpBtn" sx={{ backgroundColor: 'rgb(21, 196, 38)', marginTop: 2 }}>Sign Up</Button>

                        <Grid container className="gridLogin">

                            <Grid item >
                                <Link href="/login" variant="body2">
                                    {"Already a member? Login"}
                                </Link>
                            </Grid>

                        </Grid>

                    </Box>
                </Box>
            </Container>
        </Card>
    );
}
export default SignUp;