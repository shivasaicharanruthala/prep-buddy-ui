import * as React from "react";
import { useState } from "react";
import moment from "moment";

// import styled components from Material UI.
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
import { UserContext } from "../../Context/user.context";


//import icons from Material UI.
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import IconButton from '@mui/material/IconButton';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import { useContext } from "react";

import { deleteInterviewExperienceComment, createInterviewExperienceComment, fetchComments } from "../../services/interview-experinces";
import { useEffect } from "react";

import './interview-experience-comments.styles.scss';
import { CustomAlert } from '../Alerts/alert';

const InterviewExperienceComments = ({ experinceId }) => {
    const { userData } = useContext(UserContext);
    const userId = userData.id

    const [feedback, setFeedback] = useState("");
    const [commentsList, setCommentsList] = useState([])
    const [commentListLength, setCommentListLength] = useState(0)

    const [isAlertSet, setIsAlertSet] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");

    useEffect(() => {
        const apiCall = async () => {
            return await fetchComments(userId, experinceId)
        }

        apiCall().then(res => {
            setCommentsList(res.comments)
            setCommentListLength(res.comments.length)
        }).catch(err => {
            console.log("error: ", err)
            setIsAlertSet(true);
            setAlertMessage("Couldn't fetch your comments")
        })
    }, [commentListLength])



    const handleDelete = (commentId) => {
        const apiCall = async () => {
            return await deleteInterviewExperienceComment(userId, experinceId, commentId)
        }

        apiCall().then(res => {
            setCommentListLength(commentsList.filter(comment => comment.id !== commentId).length)
        }).catch(err => {
            console.log("error: ", err)
            setIsAlertSet(true);
            setAlertMessage("Couldn't delete your comment")
        })
    }


    const handleFormSubmit = (e) => {
        e.preventDefault()

        const apiCall = async () => {
            return await createInterviewExperienceComment(userId, experinceId, { "comment": feedback })
        }

        apiCall().then(res => {
            setCommentListLength(commentListLength + 1)
            setFeedback("")
        }).catch(err => {
            console.log("error: ", err)
            setIsAlertSet(true);
            setAlertMessage("Couldn't post your comment")
        })

    }

    return (
        <div className="interview-comments">
            <CustomAlert isAlertSet={isAlertSet} severity="error" message={alertMessage} />
            <Typography gutterBottom variant="h6" component="div" align="left" style={{ marginLeft: '25px' }}>
                Comments
            </Typography>
            <div className="comments-form">
                <form onSubmit={handleFormSubmit}>
                    <TextField
                        id="filled-textarea"
                        className="comment-textbox"
                        rows={1}
                        placeholder="write your comment..."
                        onChange={(e) => {
                            setFeedback(e.target.value);
                            setIsAlertSet(false);
                            setAlertMessage("")
                        }}
                        value={feedback}
                        style={{ width: '1000px', marginLeft: '65px' }}
                        InputProps={{
                            endAdornment: (
                                <IconButton type="submit">
                                    <ArrowRightAltOutlinedIcon fontSize="large" color="primary" />
                                </IconButton>
                            )
                        }}
                    />
                </form>
            </div>

            <div className="comments">
                <Paper style={{ padding: "10px 15px", marginTop: 10, width: '1150px' }}>
                    {
                        commentsList.map(comment => (
                            <Grid key={comment.id} container wrap="nowrap" spacing={1} sx={{ padding: 2 }}>
                                <Grid item>
                                    <Avatar alt="Remy Sharp" src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" />
                                </Grid>
                                <Grid justifyContent="left" item xs zeroMinWidth>
                                    <div className="comment-grid">
                                        <h4 className="comment-user">Nikhil</h4>
                                        {
                                            comment.userId === userId ? (
                                                <DeleteIcon className="delete-btn" fontSize="small" sx={{ color: red[500], marginLeft: '970px', cursor: 'pointer' }} onClick={() => handleDelete(comment.id)} />
                                            ) : null
                                        }

                                    </div>
                                    <Typography className="comment-txt" sx={{ marginLeft: 2 }}>
                                        {comment.comment}
                                    </Typography>
                                    <Typography sx={{ color: "gray" }}>
                                        {"posted " +  moment().startOf('minutes').fromNow()}
                                    </Typography>
                                </Grid>
                            </Grid>
                        ))
                    }

                </Paper>
            </div>
        </div>
    )
}

export default InterviewExperienceComments;