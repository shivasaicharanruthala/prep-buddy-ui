import * as React from 'react';
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";

// import user context to access or set user data.
import { UserContext } from "../../Context/user.context";

// imports dependent components.
import {formattedDateForChip} from "./date-picker";
import InterviewFeedback from "./mock-interview-feedback";
import InterviewRequestForm from "./mock-interview-form-modal.component";
import { acceptMockInterviewRequest, deleteInterview } from "../../services/mock-interview";

// import styled components from Material UI.
import DeleteIcon from '@mui/icons-material/Delete';
import CardContent from '@mui/material/CardContent';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import {Card, Chip, Stack, Avatar, Button, Link, Typography, Tooltip} from '@mui/material';

// import colors from Material UI.
import {deepOrange, deepPurple, pink, red} from '@mui/material/colors';

// imports styles for this component.
import './mock-interview-card.styles.scss';

// StatusChip Component to show the status in colored chips according to status.
const StatusChip = ({status}) => {
    const color = {"REQUESTED": "warning", "INACTIVE": "error", "ACCEPTED": "success", "COMPLETED": "primary"}
    return (
        <Stack direction="row" spacing={1} style={{marginLeft: '2px'}}>
            <Chip label={status} size="small" color={color[status]} />
        </Stack>
    );
}

// AvailableTimeSlots Component to available time slots in chips
const AvailableTimeSlots = ({availableSlots, isFeedBackOpen, handleFeedbackExpand, slotId, handleSlotSelect}) => {
    const [slotBooked, setSlot] = useState("")

    const handleSlotChange = (e) => {
        if(slotBooked !== "") {
            document.getElementById(slotBooked).style.backgroundColor = 'orange';
        }

        e.currentTarget.style.backgroundColor = 'green'

        setSlot(e.currentTarget.id)
        handleSlotSelect(e.currentTarget.id)
    }

    return (
        <Stack direction="row" spacing={1.5} >
            {
                availableSlots.map(slot => <Chip key={slot.id}  id={slot.id} label={formattedDateForChip(slot)} size="small" color={slot.booked ? "success" : "warning"} onClick={handleSlotChange} />)
            }

            {/* feedback form opener */}
            {
                isFeedBackOpen ? (
                    <div style={{marginLeft: '100px'}}>
                        <Tooltip title="Close FeedBack Section">
                            <ExpandLessOutlinedIcon onClick={handleFeedbackExpand} fontSize="medium" />
                        </Tooltip>
                    </div>
                ) : (
                    <div style={{marginLeft: '100px'}}>
                        <Tooltip title="Open FeedBack Section">
                            <ExpandMoreOutlinedIcon onClick={handleFeedbackExpand} fontSize="medium" />
                        </Tooltip>
                    </div>
                )
            }
        </Stack>
    );
}

// MockInterviewCard Component to show interview with feedback section.
export default function MockInterviewCard({interviewDetails, updateInterviewsAfterDelete, setAcceptRequest, feedbackGiven}) {
    const {userData} = useContext(UserContext);
    const navigate = useNavigate()

    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)
    const [status, setStatus] = useState(interviewDetails.status)
    const [slotId, setSlotId] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)

    const userId = userData.id;

    // function to handle open/close feedback form
    const handleFeedbackExpand = () => {
        setIsFeedbackOpen(!isFeedbackOpen);
    }

    // function to handle modal open/close
    const handleModalOpen = () => {
        setIsModalOpen(!isModalOpen)
    }

    // function to handle delete interview
    const handleDeleteInterview = (interviewId) => {
        const apiCall = async () => {
            return await deleteInterview(userId, interviewId)
        }

        apiCall().then(res => {
            if(res.data === '') {
                updateInterviewsAfterDelete(interviewId)
            }

        }).catch(err => {
            console.log("error: ", err)
            //TODO: alert
        })
    }

    // function to handle slot select and set it to state
    const handleSlotSelect = (slotId) => {
        if(interviewDetails.userId !== userId) {
            setSlotId(slotId)
        }
    }

    // function to open resume in drive in new window.
    const fetchResume = (interviewedBy, id, resumeId) => {
        if(userId === interviewedBy || userId === id) {
            window.open(`https://drive.google.com/file/d/${resumeId}/view?usp=drivesdk`, '_blank', 'noopener, noreferrer');
        } else {
        //    TODO: alert user and interviewer can only see the resume.
        }
    }

    // function to handle accept interview request accept.
    const handleAcceptRequest = (interviewId) => {
        const postData = async (slotId) => {
            if(slotId === "") {
                alert("Please choose your available slot")

                return
            }

            return await acceptMockInterviewRequest(userId, interviewId, slotId, interviewDetails.resume)
        }

        postData(slotId).then(res => {
            setAcceptRequest(true)
        }).catch(err => {
            console.log("error: ", err)
            //TODO: alert
        })
    }

    return (
        <Card sx={{ minWidth: 275, width: '1130px', borderTop: 5, borderColor: 'primary.main', marginBottom: '20px'}}>
                <CardContent sx={{marginLeft: '12px', paddingBottom: 0, marginBottom: 0 }}>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <StatusChip status={status} />
                        {
                            interviewDetails.userId === userId ? (
                                <>
                                    <ModeEditOutlineIcon className="edit-btn" style={{marginLeft: '910px'}} fontSize="medium" color="primary" onClick={handleModalOpen}/>
                                    <DeleteIcon className="delete-btn" fontSize="medium" sx={{ color: red[500], marginLeft: '10px' }} onClick={() => handleDeleteInterview(interviewDetails.id)}/>
                                    <InterviewRequestForm isModalOpen={isModalOpen} handleModal={handleModalOpen} interviewDetails={interviewDetails}/>
                                </>
                            ) : (
                                interviewDetails.status=== "REQUESTED" ? (
                                    <Button variant="contained" style={{marginLeft: '900px'}} size="small" color="success" onClick={() => handleAcceptRequest(interviewDetails.id)}>Accept</Button>
                                ) : null
                            )
                        }
                    </div>

                    <div style={{display: "flex", flexDirection: "row"}}>
                        <Typography gutterBottom variant="h5" component="div" align="left" style={{marginLeft: '2px', marginTop: "15px", width: '280px'}}>
                            {interviewDetails.title}
                        </Typography>

                        <div style={{display: "flex", flexDirection: "row", marginTop: '12px', marginLeft: '240px'}}>
                            {
                                interviewDetails.interviewer.length > 0 && (
                                   <>
                                       <div style={{display: "flex", flexDirection: "column", width: '50px'}}>
                                           <Avatar sx={{ bgcolor: deepPurple[500], width: 30, height: 30 }} style={{alignContent: "center", marginLeft: '10px'}}>{interviewDetails.interviewer[0].firstName[0].toUpperCase()}</Avatar>
                                           <Typography variant="caption" style={{marginLeft: '2px'}} align="center">
                                               {interviewDetails.interviewer[0].firstName}
                                           </Typography>
                                       </div>

                                       <ArrowRightAltIcon sx={{ color: pink[500], width: '35px', height: '35px' }} />
                                   </>
                                )
                            }

                            <div style={{display: "flex", flexDirection: "column", width: '50px'}}>
                                <Avatar sx={{ bgcolor: deepOrange[500], width: 30, height: 30 }} style={{alignContent: "center", marginLeft: '10px'}}>{interviewDetails.user[0].firstName[0].toUpperCase()}</Avatar>
                                <Typography variant="caption" style={{marginLeft: '2px'}} align="center">
                                    {interviewDetails.user[0].firstName}
                                </Typography>
                            </div>
                        </div>
                    </div>

                    <div style={{display: "flex", flexDirection: "row", marginTop: '10px'}}>
                        <Typography variant="body2" color="text.primary" >
                            <b>Company:</b> {interviewDetails.company}
                        </Typography>
                        <Typography variant="body2" color="text.primary" sx={{marginLeft: '40px', marginRight: '40px'}}>
                            <b>Role:</b> {interviewDetails.role}
                        </Typography>
                        <AttachFileOutlinedIcon className="icon-rotate-45" fontSize="small" />
                        <Typography variant="body2" color="text.primary" sx={{marginLeft: '3px'}}>
                            <Link onClick={() => fetchResume(interviewDetails.interviewedBy, interviewDetails.userId, interviewDetails.resume)}>Resume</Link>
                        </Typography>
                    </div>

                    <Typography variant="body2" color="text.secondary"  align="left" style={{marginTop: '15px', marginBottom: '20px'}}>
                        {interviewDetails.description}
                    </Typography>

                    <AvailableTimeSlots availableSlots={interviewDetails.availableSlots} isFeedBackOpen={isFeedbackOpen} handleFeedbackExpand={handleFeedbackExpand} slotId={slotId} handleSlotSelect={handleSlotSelect}/>
                </CardContent>

                {/* Feedback Section */}
                { isFeedbackOpen && interviewDetails.interviewedBy ? (
                    <InterviewFeedback interviewId={interviewDetails.id}
                                       interviewedBy={interviewDetails.interviewedBy}
                                       interviewerName={interviewDetails.interviewer[0].firstName}
                                       feedbackDetails={interviewDetails.feedback ? interviewDetails.feedback : ''}
                                       feedbackAt={interviewDetails.feedbackAt}
                                       setStatus={setStatus}
                                       feedbackGiven={feedbackGiven }
                    />
                ) : null }
            </Card>
    );
}
