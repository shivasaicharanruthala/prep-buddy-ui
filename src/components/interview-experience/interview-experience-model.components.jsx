import moment from 'moment';
import * as React from 'react';
import { useContext } from "react";

import { UserContext } from "../../Context/user.context";

// imports dependent components to be rendered.
import { CustomAlert } from '../Alerts/alert';
import { createInterviewExperience, modifyInterviewExperience } from '../../services/interview-experinces';

// import styled components & Icons from Material UI.
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { Box, Button, Typography, Modal, TextField, Divider } from '@mui/material';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

import './interview-experience-model.styles.scss';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    //border: '2px solid #000',
    boxShadow: 24,
    borderRadius: '20px',
    p: 4,
};

export default function InterviewExperienceModal({ isModalOpen, handleModal, experince, experiencesLength, setExperiencesLength, handleExpericesEdit }) {
    const { userData } = useContext(UserContext);
    const userId = userData.id

    const [title, setTitle] = React.useState(experince?.title ?? "")
    const [company, setCompany] = React.useState(experince?.company ?? "")
    const [tags, setTags] = React.useState(experince?.tags ?? "")
    const [interviewedDate, setInterviewedDate] = React.useState(experince?.interviewedDate ?? "")
    const [applicationProcess, setApplicationProcess] = React.useState(experince?.applicationProcess ?? "")
    const [interviewProcess, setInterviewProcess] = React.useState(experince?.interviewProcess ?? "")
    const [interviewExperience, setInterviewExperience] = React.useState(experince?.interviewExperience ?? "")

    const [isAlertSet, setIsAlertSet] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");

    const handleFormSubmit = (e) => {
        e.preventDefault()

        let payload = {
            "title": title,
            "company": company,
            "tags": tags,
            "interviewedDate": interviewedDate,
            "applicationProcess": applicationProcess,
            "interviewProcess": interviewProcess,
            "interviewExperience": interviewExperience,
        }

        const postApiCall = async () => {
            return await createInterviewExperience(userId, payload)
        }

        const modifyApiCall = async () => {
            return await modifyInterviewExperience(userId, experince.id, payload)
        }


        if (experince) {
            modifyApiCall().then(res => {
                if (Object.keys(res).length > 0) {
                    handleExpericesEdit()
                    handleModal()
                } else {
                    setIsAlertSet(true);
                    setAlertMessage("Interview Date must be in the past!!")
                }
            }).catch(err => {
                console.log("error: ", err)
            })
        } else {
            postApiCall().then(res => {
                setTitle("")
                setCompany("")
                setInterviewedDate("")
                setApplicationProcess("")
                setInterviewProcess("")
                setInterviewExperience("")
                setExperiencesLength(experiencesLength + 1)
                handleModal()
            }).catch(err => {
                console.log("error: ", err)
                setIsAlertSet(true);
                setAlertMessage("Interview Date must be in the past!!")
            })
        }
    }

    return (
        <div>
            <Modal
                open={isModalOpen}
                onClose={handleModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography align="center" id="modal-modal-title" variant="h5" component="h2">
                        {experince ? 'Edit Interview Experience' : 'Add Interview Experience'}
                    </Typography>

                    <CustomAlert isAlertSet={isAlertSet} severity="error" message={alertMessage} />
                    <Divider />

                    <form onSubmit={handleFormSubmit}>
                        <TextField id="standard-basic" label="Title" variant="standard" value={title} onChange={(e) => setTitle(e.target.value)} required sx={{width: 250, margin: 1}}/> 

                        <TextField
                            id="date"
                            label="Interview Date"
                            type="date"
                            sx={{ width: 200, margin: 2 }}
                            size="small"
                            value={moment(interviewedDate, 'YYYY-MM-DDTHH:mm:ss').format('YYYY-MM-DD')}
                            onChange={(e) => {
                                setInterviewedDate(e.target.value);
                                setIsAlertSet(false);
                                setAlertMessage("")
                            }}
                            required
                        /><br />
                        <TextField sx={{ marginRight: 15, width: 250, margin: 1 }} id="standard-basic" value={company} label="Company" variant="standard" onChange={(e) => setCompany(e.target.value)} required />

                        <TextField sx={{ marginRight: 15, width: 250, margin: 1 }} id="standard-basic" value={tags} label="Tags" variant="standard" onChange={(e) => setTags(e.target.value)} required /> <br />


                        <TextField
                            sx={{ width: 550, margin: 2 }}
                            id="standard-multiline-static"
                            label="Application Process"
                            multiline
                            rows={3}
                            maxRows={5}
                            value={applicationProcess}
                            onChange={(e) => setApplicationProcess(e.target.value)}
                            variant="standard"
                            required
                        /><br />

                        <TextField
                            sx={{ width: 550, margin: 2 }}
                            id="standard-multiline-static"
                            label="Interview Process"
                            multiline
                            rows={3}
                            maxRows={5}
                            value={interviewProcess}
                            onChange={(e) => setInterviewProcess(e.target.value)}
                            variant="standard"
                            required
                        /><br />

                        <TextField
                            sx={{ width: 550, margin: 2 }}
                            id="standard-multiline-static"
                            label="Interview Experience"
                            multiline
                            rows={3}
                            maxRows={5}
                            value={interviewExperience}
                            onChange={(e) => setInterviewExperience(e.target.value)}
                            variant="standard"
                            required
                        /><br />
                        <br />
                        <div className='interview-experience-form-actions' >
                            <div className="interview-experience-save-btn">
                                <Button
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    endIcon={<ChevronRightOutlinedIcon fontSize="small" />}
                                >{experince ? 'Edit' : 'Save'}</Button>
                            </div>
                            <div className="interview-experience-cancel-btn" >
                                <Button
                                    color="error"
                                    variant="outlined"
                                    endIcon={<ClearOutlinedIcon fontSize="small" />}
                                    onClick={handleModal}
                                >Cancel</Button>
                            </div>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}