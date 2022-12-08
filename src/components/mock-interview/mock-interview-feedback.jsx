import moment from "moment";
import * as React from "react";
import {useContext, useState} from "react";

// imports user context to fetch 7 set user data
import {UserContext} from "../../Context/user.context";
import {postFeedback} from "../../services/mock-interview";

// import styled components & icons from Material UI.
import {deepOrange} from "@mui/material/colors";
import IconButton from '@mui/material/IconButton';
import Typography from "@mui/material/Typography";
import {Grid, Paper, Avatar, TextField} from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';

// import styles to apply on this component.
import './mock-interview-feedback.styles.scss'


// InterviewFeedback component to share and edit feedback
const InterviewFeedback = ({interviewId, interviewedBy, interviewerName, feedbackDetails, feedbackAt, setStatus, feedbackGiven }) => {
    const {userData} = useContext(UserContext);

    const [feedback, setFeedback] = useState(feedbackDetails);
    const [feedbackGivenAt, setFeedbackGivenAt] = useState(feedbackAt);
    const [feedbackChange, setFeedbackChange] = useState(feedbackDetails);
    const [isFeedback, setIsFeedback] = useState(feedbackDetails === '');

    const userId = userData.id;

    // function to check is feedback modified or not
    const handleIsEdit = () => {
        setIsFeedback(!isFeedback);
    }

    // function to set modified feedback into component state
    const handleFeedChange = (event) => {
        setFeedbackChange(event.target.value);
    }

    // function to add/modify on form submit
    const handleEdit = (e) => {
        e.preventDefault();

        const apiCall = async () => {
            return await postFeedback(userId, interviewId, feedbackChange)
        }

        apiCall().then(res => {
            setFeedback(res.feedback);
            setFeedbackChange(res.feedback);
            setFeedbackGivenAt(res.feedbackAt);
            setStatus(res.status)
            feedbackGiven(true);

            setIsFeedback(!isFeedback);
        }).catch(e => {
            console.log("error: ", e)
            //TODO: alert
        })
    }


    return (
        <div className="interview-feedback">
            <Typography gutterBottom variant="h6" component="div" align="left" style={{marginLeft: '30px', marginTop: "35px"}}>
                Feedback
            </Typography>
            {
                isFeedback ? (
                    <div className="feedback-form" style={{marginLeft: '60px'}}>
                       <form onSubmit={handleEdit}>
                           <TextField
                               id="filled-textarea"
                               rows={4}
                               placeholder="write your feedback..."
                               multiline
                               variant="filled"
                               onChange={handleFeedChange}
                               value={feedbackChange}
                               required
                               style={{width: '1010px'}}
                               InputProps={{endAdornment: (
                                       <IconButton type="submit">
                                           <ArrowRightAltOutlinedIcon fontSize="large" color="primary"/>
                                       </IconButton>
                                   )}}
                           />
                       </form>
                    </div>
                ) : (
                    <Paper style={{ padding: "40px 20px" }}>
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item>
                                <Avatar sx={{ bgcolor: deepOrange[500] }}>{interviewerName[0]?.toUpperCase()}</Avatar>
                            </Grid>
                            <Grid justifyContent="left" item xs zeroMinWidth>
                                <div style={{display: 'flex', flexDirection: 'row'}}>
                                    <h4 style={{ margin: 0, textAlign: "left", width: '110px' }}>{interviewerName}</h4>
                                    {
                                        userId === interviewedBy ? (
                                            <ModeEditOutlineIcon className="edit-btn" fontSize="small" color="primary" sx={{marginLeft: '870px'}} onClick={handleIsEdit} />
                                        ) : null
                                    }
                                </div>
                                <p style={{ textAlign: "left" }}>
                                    {feedback}
                                </p>
                                <p style={{ textAlign: "left", color: "gray" }}>
                                     {"posted " +  moment(feedbackAt, 'YYYY-MM-DDTHH:mm').subtract(5, 'hours').startOf('seconds').fromNow()}
                                </p>
                            </Grid>
                        </Grid>
                    </Paper>
                )
            }
        </div>
    )
}

export default InterviewFeedback;
