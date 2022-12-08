import * as React from 'react';
import {useNavigate} from "react-router-dom";

// imports Styled Components & Icons from Material-UI
import WorkIcon from '@mui/icons-material/Work';
import CommentBankIcon from '@mui/icons-material/CommentBank';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';
import {Box, List, Drawer, Divider, ListItem, ListItemText, ListItemIcon, ListItemButton} from '@mui/material';

// imports styles to apply for this component.
import './side-navbar.styles.scss';


export default function PermanentDrawerLeft() {
    const navigate = useNavigate();
    // rgba(23,84,148,0.95)   rgba(12,54,222,0.95)
    return (
        <Box sx={{ display: 'flex'}}>
            <Drawer
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 270,
                        boxSizing: 'border-box',
                        marginTop: '64px',
                        backgroundColor: 'rgba(31,68,241,0.94)'
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate('/job-listings')} sx={{ color: 'white'}}>
                            <ListItemIcon>
                               <WorkIcon style={{color: 'rgba(237,104,55,0.92)'}}/>
                            </ListItemIcon>
                            <ListItemText primary="Job Listings" />
                        </ListItemButton>
                    </ListItem>
                    <Divider variant="middle" className="divider"/>

                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate('/mock-interviews')} sx={{ color: 'white'}}>
                            <ListItemIcon>
                                <InterpreterModeIcon style={{color: 'rgba(237,104,55,0.92)'}}/>
                            </ListItemIcon>
                            <ListItemText primary="Mock Interviews" />
                        </ListItemButton>
                    </ListItem>
                    <Divider variant="middle" className="divider"/>

                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate('/calender')} sx={{ color: 'white'}}>
                            <ListItemIcon >
                                <CalendarMonthIcon style={{color: 'rgba(237,104,55,0.92)'}}/>
                            </ListItemIcon>
                            <ListItemText primary="Calender" />
                        </ListItemButton>
                    </ListItem>
                    <Divider variant="middle" className="divider"/>

                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate('/interview-experiences')} sx={{ color: 'white'}}>
                            <ListItemIcon>
                                <CommentBankIcon style={{color: 'rgba(237,104,55,0.92)'}}/>
                            </ListItemIcon>
                            <ListItemText primary="Interview Experiences" />
                        </ListItemButton>
                    </ListItem>

                </List>
            </Drawer>
        </Box>
    );
}