import * as React from 'react';
import { useContext, useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import './navbar.styles.scss';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import PermanentDrawerLeft from "../side-navabar/side-navbar.component";
import { UserContext } from "../../Context/user.context";



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
            <AppBar component="nav">
                <Toolbar>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        <b>PrepBuddy</b>
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
                                    <Button sx={{ color: '#fff' }} href="/login">
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