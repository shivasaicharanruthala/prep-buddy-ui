import * as React from 'react';
import {useContext, useState} from "react";

// import user context to access & set user data
import {UserContext} from "../../Context/user.context";

// imports dependent components.
import DatetimePicker from "./date-picker";
import {modifyInterview, requestInterview} from "../../services/mock-interview";

// imports styled components from Material UI
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

// imports styles to apply on this component
import './mock-interview-form-modal.styles.scss';


// InterviewRequestForm Component is modal to request interview / edit interview given the form details.
export default function InterviewRequestForm({isModalOpen, handleModal, interviewDetails}) {
    const {userData} = useContext(UserContext);

    const [title, setTile] = useState(interviewDetails?.title ?? "" )
    const [company, setCompany] = useState(interviewDetails?.company ?? "")
    const [role, setRole] = useState(interviewDetails?.role ?? "")
    const [description, setDescription] = useState(interviewDetails?.description ?? "")
    const [resume, setResume] = useState(interviewDetails?.resume ?? "")
    const [resumeFile, setResumeFile] = useState("")
    const [availableSlots, setAvailableSlots] = useState(interviewDetails?.availableSlots ?? [])

    const userId = userData.id;

    // function to handle file change
    const handleFileChange = (e) => {
        if (e.target.files) {
            setResumeFile(e.target.files[0]);
        }
    };

    // function to add oe edit on form submit
    const handleInterviewRequestSubmit = (e) => {
        e.preventDefault()
        if(!resume) {
        //    TODO: Alert if resume is not submitted
        }

        if(availableSlots.length < 3) {
            //TODO: Alert choice of slots is 4
            alert("Need to select 4 slot")
            return
        }

        //TODO: check if all slots are after today.

        const payload = new FormData();

        payload.append('title', title);
        payload.append('description', description);
        payload.append('company', company);
        payload.append('role', role);
        payload.append('resume', resume);
        payload.append('resumeFile', resumeFile);
        payload.append('availableSlots', JSON.stringify(availableSlots));

        const createApiCall = async () => {
            return await requestInterview(userId, payload)
        }

        const modifyApiCall = async () => {
            return await modifyInterview(userId, interviewDetails.id, payload)
        }

        // if interview details is given then update if not add new details to
        if(interviewDetails) {
            modifyApiCall().then(res => {
                handleModal(!isModalOpen)
            }).catch(err => {
                console.log("error: ", err)
                // TODO: alert
            })
        } else {
            createApiCall().then(res => {
                handleModal(!isModalOpen)
            }).catch(err => {
                console.log("error: ", err)
                //TODO: alert
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
                <Box className='request-interview-form-container' sx={{bgcolor: 'background.paper', p: 4, boxShadow: 24}}>
                    <Typography align="center" id="modal-modal-title" variant="h6" component="h2">
                        <b>{interviewDetails ? 'Edit Your Mock Interview Details' : 'Request a Mock Interview'}</b>
                    </Typography>
                    <Divider />
                    <form onSubmit={handleInterviewRequestSubmit}>
                        <TextField style={{width: '300px', margin: '15px'}} id="standard-basic" label="Title" variant="standard" value={title} onChange={(e) => setTile(e.target.value)} required /><br/>
                        <TextField style={{width: '200px', marginLeft: '15px', marginRight: '10px'}} id="standard-basic" label="Company" variant="standard" value={company} onChange={(e) => setCompany(e.target.value)} required />
                        <TextField style={{width: '200px', marginLeft: '15px', marginRight: '35px'}} id="standard-basic" label="Role" variant="standard" value={role} onChange={(e) => setRole(e.target.value)} required />
                        <Button
                            variant="contained"
                            component="label"
                            sx={{ backgroundColor: 'rgb(18, 145, 139)', marginTop: 1, position: 'static' }}
                            onChange={(e) => handleFileChange(e)}
                        >
                            Upload Resume
                            <input
                                type="file"
                                hidden
                            />
                        </Button>
                        {resume && resume.name || resumeFile && resumeFile.name}
                        <br/>
                        <TextField style={{width: '760px', margin: '15px'}} id="standard-multiline-static" label="Description" multiline rows={3} variant="standard" value={description} onChange={(e) => setDescription(e.target.value)} required />

                        <h5>Let us know what time works for you!!!</h5>
                        <DatetimePicker initialSlots={availableSlots} setSlots={setAvailableSlots} />

                        <div className='request-interview-form-actions'>
                            <div className="request-interview-cancel-btn">
                                <Button
                                    color="error"
                                    variant="outlined"
                                    endIcon={<ClearOutlinedIcon  fontSize="small" />}
                                    onClick={handleModal}
                                >Cancel</Button>
                            </div>

                           <div className="request-interview-request-btn">
                               <Button
                                   type="submit"
                                   color="primary"
                                   variant="contained"
                                   endIcon={<ChevronRightOutlinedIcon  fontSize="small" />}
                               >{interviewDetails? 'Update':'Request'}</Button>
                           </div>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
