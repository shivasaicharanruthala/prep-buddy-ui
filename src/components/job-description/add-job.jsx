import React, { useState, useEffect } from "react";

// import styled components from Material UI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Row, Col } from "reactstrap";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import EditIcon from "@mui/icons-material/Edit";
import "./add-job.scss";
import axios from "axios";
import Divider from "@mui/material/Divider";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  //border: '2px solid #000',
  boxShadow: 24,
  borderRadius: "20px",
  p: 4,
};

//Constant values for different sections has been used
export default function EmployeeForm({
  isModalOpen,
  handleModal,
  fetchTableDetails,
  updateData,
}) {
  const [value, setValue] = useState("Controlled");
  const [id, setId] = useState(updateData?.id ?? "");
  const [title, setTitle] = useState(updateData?.jobTitle ?? "");
  const [jobLink, setJobLink] = useState(updateData?.jobLink ?? "");
  const [company, setCompany] = useState(updateData?.company ?? "");
  const [jobType, setJobType] = useState(updateData?.jobType ?? "");
  const [allFeilds, setAllFeilds] = useState(false);

  useEffect(() => {
    setTitle(updateData?.jobTitle ?? "");
    setJobLink(updateData?.jobLink ?? "");
    setCompany(updateData?.company ?? "");
    setJobType(updateData?.jobType ?? "");
  }, [updateData]);

  //Change event for ID has been mentioned
  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  //Change event for title has been mentioned
  const handleTitle = (event) => {
    setTitle(event.target.value);
    setAllFeilds(false);
  };

  //Change event for company has been mentioned
  const handleCompany = (event) => {
    setCompany(event.target.value);
    setAllFeilds(false);
  };

  //Change event for Job link has been mentioned
  const handleJobLink = (event) => {
    setJobLink(event.target.value);
    setAllFeilds(false);
  };

  //Change event for Job type has been mentioned
  const handleJobType = (event) => {
    setJobType(event.target.value);
    setAllFeilds(false);
  };

  //Function for edit for the modal elements is being used and the add modal is being called to edit the elements.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { jobTitle: title, jobLink, company, jobType, jobId: id };
    //Call of the backend api is taking place
    //console.log("update data here: ", updateData)
    console.log("update data length: ", Object.keys(updateData).length);
    if (Object.keys(updateData).length > 0) {
      console.log("1: ");
      //Axios is used for Request method related functionalities
      axios({
        url: `https://prep-buddy-backend.herokuapp.com/job-listings/${updateData.id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
          "Access-Control-Allow-Headers":
            "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
        },
        data: data,
      }).then((res) => {
        //Conditions written to fetch the table details from database
        handleModal();
        fetchTableDetails();
      });
    } else {
      const response = await fetch("https://prep-buddy-backend.herokuapp.com/job-listings", {
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

      //Call function handleModal() if response is populated
      if (response) {
        handleModal();
        fetchTableDetails();
      }

      return response.json();
    }
  };

  console.log(
    "update data",
    updateData.jobType,
    title,
    company,
    jobLink,
    jobType
  );
  return (
    <div>
      {/* Modal Open and close functionalities are handled by calling the below methods */}
      <Modal
        open={isModalOpen}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {
          //Heading for the Modal. While addition, Add Job Openings is shown and while edit, Edit Job Listings is shown
          <Box sx={style}>
            <Typography
              align="center"
              id="modal-modal-title"
              variant="h5"
              component="h2"
            >
              {Object.keys(updateData).length > 0
                ? "Edit Job Listings"
                : "Add Job Openings"}
            </Typography>
            <Divider />
            <form onSubmit={handleSubmit}>
              {/* Form has been started. The field inputs are described below required for modal*/}
              <Row>
                <div className="rowContainer">
                  <TextField
                    id="standard-basic"
                    label="Job Title"
                    variant="standard"
                    value={title}
                    onChange={handleTitle}
                    required
                    sx={{ width: 300, marginRight: 5, marginTop: 3 }}
                  />
                  <FormControl
                    variant="standard"
                    sx={{ minWidth: 120, marginTop: 3 }}
                  >
                    <InputLabel id="demo-simple-select-standard-label">
                      Job Type
                    </InputLabel>
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
                  </FormControl>{" "}
                  <br />
                  <TextField
                    id="standard-basic"
                    label="Company"
                    variant="standard"
                    value={company}
                    onChange={handleCompany}
                    required
                    sx={{ width: 260, marginRight: 5, marginTop: 3 }}
                  />
                  <TextField
                    id="standard-basic"
                    label="Job Link"
                    variant="standard"
                    value={jobLink}
                    onChange={handleJobLink}
                    required
                    sx={{ width: 250, marginRight: 5, marginTop: 3 }}
                  />
                  <br />
                  <div
                    className="job-listings-form-actions"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: "380px",
                      marginTop: 25,
                    }}
                  >
                    <div className="job-listings-save-btn">
                      <Button
                        color="primary"
                        type="submit"
                        variant="contained"
                        endIcon={<ChevronRightOutlinedIcon fontSize="small" />}
                      >
                        {Object.keys(updateData).length > 0 ? "Edit" : "Save"}
                      </Button>
                    </div>
                    <div
                      className="job-listings-cancel-btn"
                      style={{ marginLeft: "10px" }}
                    >
                      <Button
                        color="error"
                        variant="outlined"
                        endIcon={<ClearOutlinedIcon fontSize="small" />}
                        onClick={handleModal}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </Row>
            </form>
          </Box>
        }
      </Modal>
    </div>
  );
}
