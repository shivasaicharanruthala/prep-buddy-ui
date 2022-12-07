import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Row, Col } from "reactstrap";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import EditIcon from '@mui/icons-material/Edit';

import "./add-job.scss";
import axios from 'axios';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
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

export default function EmployeeForm({ isModalOpen, handleModal, fetchTableDetails, updateData }) {
  const [value, setValue] = useState("Controlled");
  const [id, setId] = useState(updateData?.id ?? "");
  const [title, setTitle] = useState(updateData?.jobTitle ?? "");
  const [jobLink, setJobLink] = useState(updateData?.jobLink ?? "");
  const [company, setCompany] = useState(updateData?.company ?? "");
  const [jobType, setJobType] = useState( updateData?.jobType ?? "");

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleCompany = (event) => {
    setCompany(event.target.value);
  };
  const handleJobLink = (event) => {
    setJobLink(event.target.value);
  };

  const handleJobType = (event) => {
    setJobType(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {  jobTitle :title, jobLink, company, jobType , jobId:id};
    //call the backend api
    
    console.log("update data here: ", updateData)
    console.log("update data length: ", Object.keys(updateData).length)
    if(Object.keys(updateData).length  > 0) {
      console.log("1: ");
      axios({
        url: `http://localhost:8080/job-listings/${updateData.id}`,
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
          "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
        },
        data: data
      }).then( res => {
        handleModal()
        fetchTableDetails()
      })
     

    } else {
      console.log("3: ");
      const response = await fetch("http://localhost:8080/job-listings", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: { 
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    if(response){
      console.log("4: ");
      handleModal()
      fetchTableDetails()
    }

    return response.json();
    }
  };

  console.log("update data", updateData.jobType)
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}

      <Modal
        open={isModalOpen}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {
          <Box sx={style}>
           <Typography align="center" id="modal-modal-title" variant="h5" component="h2">
                        {updateData ? 'Edit Job Listings' : 'Add Job Openings'}
          </Typography>
            <form>
              <Row>
                <div className="rowContainer">
                 
                  <TextField
                    id="title"
                    label="title"
                    placeholder="title"
                    value={title }
                    className="textfield-style"
                    style={{marginRight:"1rem", marginBottom:"1rem"}}

                    multiline
                    required
                    onChange={handleTitle}
                  />
                  <TextField
                    id="company"
                    label="company"
                    placeholder="Company"
                    value={company}
                    multiline
                    required
                    style={{marginRight:"1rem", marginBottom:"1rem"}}

                    className="textfield-style"
                    onChange={handleCompany}
                  />
                  <TextField
                    id="Job Link"
                    label="Job Link"
                    placeholder="Job Link"
                    value={jobLink}
                    multiline
                    required
                    style={{marginRight:"1rem", marginBottom:"1rem"}}
                    className="textfield-style"
                    onChange={handleJobLink}
                  />
                
                  <FormControl variant="standard" sx={{minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">Job Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={jobType}
                                onChange={handleJobType}
                                required
                                label="Job Type"
                            >
                                <MenuItem value="Internship">Internship</MenuItem>
                                <MenuItem value="FullTime">Full Time</MenuItem>
                            </Select>
                        </FormControl>
                </div>
              </Row>
            </form>
            <div className='job-listings-form-actions' style={{ display: 'flex', flexDirection: 'row', marginLeft:'400px' }}>
            <div className="job-listings-save-btn">
            <Button
              variant="outlined"
              onClick={handleSubmit}
              className="submit-style"
            >
              Submit
              {/* {hand ? 'Edit' : 'Save'} */}
            </Button>
            </div>
            <div className="job-listings-cancel-btn" style={{marginLeft:'10px'}}>
            <Button  
            variant="outlined"
            onClick={handleModal}> Cancel</Button>
            </div>
            </div>
          </Box>
        
        }
      </Modal>
    </div>
  );
}
