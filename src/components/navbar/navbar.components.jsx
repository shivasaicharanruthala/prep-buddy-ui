import * as React from 'react';
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { UserContext } from "../../Context/user.context";

// imports component to be rendered.
import PermanentDrawerLeft from "../side-navabar/side-navbar.component";

// imports styled components & Icons from Material UI.
import Diversity3Icon from '@mui/icons-material/Diversity3';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {AppBar, Box, IconButton, Avatar, Toolbar, Typography, Button } from '@mui/material';

import './navbar.styles.scss';



function NavBar(props) {
    const navigate = useNavigate();
    const { userData , setUser} = useContext(UserContext)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(userData.isLoggedIn)
    }, [userData])


    const Logout = () => {
        setUser({});
        navigate('/login');
    }
    return (
        <Box sx={{ display: 'flex'}}>
            {/*208094,   'rgba(78,32,148,0.88)' */}
            <AppBar component="nav" sx={{backgroundColor: 'rgba(31,68,241,0.94)'}}>
                <Toolbar>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                       <div style={{display: 'flex', flexDirection: 'row'}}>
                           <Diversity3Icon sx={{marginRight: 1, marginTop: '2px'}}/>
                           <Typography variant="h6" style={{color:'white'}}>PrepBuddy</Typography>
                       </div>
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                        {
                            isLoggedIn ? (
                                <>
                                    <IconButton sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" sx={{ width: '30px', height: '30px'}}> {userData?.firstName ? userData?.firstName[0]?.toUpperCase(): ""} </Avatar>
                                        <Typography sx={{marginLeft: '10px', color: 'white'}}> { 'Hello!!,' + '   ' +userData.firstName} </Typography>
                                    </IconButton>

                                    <IconButton sx={{marginLeft: 3}} onClick={Logout}>
                                        <LogoutOutlinedIcon fontSize="medium" color="black"/>
                                    </IconButton>
                                </>
                            ) : (
                                <>
                                    <Button sx={{ color: 'white' }} href="/login">
                                        Login
                                    </Button>

                                    <Button sx={{ color: '#fff' }} href="/sign-up">
                                        Register
                                    </Button>
                                </>
                            )
                        }
                    </Box>
                </Toolbar>
            </AppBar>
            {
                isLoggedIn ? (
                    <>
                        <PermanentDrawerLeft />
                        <Box
                            component="main"
                            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, marginLeft: '280px', marginRight: '12px' }}
                        >
                            <Toolbar />
                            {
                                props.children ? props.children : <Outlet />
                            }
                        </Box>
                    </>
                ) : (
                    props.children ? props.children : <Outlet />
                )
            }
        </Box>
    );
}

export default NavBar;