import * as React from 'react';
import {useNavigate} from "react-router-dom";

// imports StyledComponents from Material-UI
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import WorkIcon from '@mui/icons-material/Work';
import ListItemIcon from '@mui/material/ListItemIcon';
import {ListItemText, ListItemButton} from '@mui/material'
import CommentBankIcon from '@mui/icons-material/CommentBank';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';

// imports styles to apply for this component.
import './side-navbar.styles.scss';



export default function PermanentDrawerLeft() {
    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex'}}>
            <Drawer
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 270,
                        boxSizing: 'border-box',
                        marginTop: '64px',
                        backgroundColor: '#1976d2'
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate('/job-listings')}>
                            <ListItemIcon>
                               <WorkIcon />
                            </ListItemIcon>
                            <ListItemText primary="Job Listings" />
                        </ListItemButton>
                    </ListItem>
                    <Divider variant="middle" className="divider"/>

                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate('/mock-interviews')}>
                            <ListItemIcon>
                                <InterpreterModeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Mock Interviews" />
                        </ListItemButton>
                    </ListItem>
                    <Divider variant="middle" className="divider"/>

                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate('/calender')}>
                            <ListItemIcon >
                                <CalendarMonthIcon />
                            </ListItemIcon>
                            <ListItemText primary="Calender" />
                        </ListItemButton>
                    </ListItem>
                    <Divider variant="middle" className="divider"/>

                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate('/interview-experiences')}>
                            <ListItemIcon>
                                <CommentBankIcon />
                            </ListItemIcon>
                            <ListItemText primary="Interview Experiences" />
                        </ListItemButton>
                    </ListItem>

                </List>
            </Drawer>
        </Box>
    );
}