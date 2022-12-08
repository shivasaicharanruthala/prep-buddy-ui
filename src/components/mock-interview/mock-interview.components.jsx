import * as React from 'react';
import {useContext} from 'react';

// imports user context to access and set user data
import {UserContext} from "../../Context/user.context";

// imports dependent components.
import MyMockInterviews from "./my-mock-interviews";
import OtherMockInterviews from "./other-mock-interviews";
import InterviewRequestForm from "./mock-interview-form-modal.component";

// imports styled components from Material UI.
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import {Box, Tab, Button } from '@mui/material';
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

// imports styles for this component.
import './mock-interview.styles.scss';


const MockInterview = () => {
    const {userData} = useContext(UserContext);

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [tabPanel, setTabPanel] = React.useState('1');

    const userId = userData.id;

    // function to handle tab panel change
    const handleTabChange = (event, newValue) => {
        setTabPanel(newValue);
    };

    // function to open/close the modal by setting state.
    const handleModal = () => setIsModalOpen(!isModalOpen)

    return (
        <Box className="mock-interview-container">
            <div className="request-interview-btn" style={{display: 'flex', flexDirection: 'row-reverse', marginRight: '40px', marginBottom: '15px'}}>
                <Button
                    color="primary"
                    variant="contained"
                    sx={{backgroundColor: 'rgba(229,79,24,0.92)'}}
                    endIcon={<AddOutlinedIcon  fontSize="small" />}
                    onClick={handleModal}
                >Request Interview</Button>
            </div>
            <InterviewRequestForm isModalOpen={isModalOpen} handleModal={handleModal} />

            {/* Interview Tabs */}
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={tabPanel}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                            <Tab label="Active Interviews" value="1" />
                            <Tab label="Requested & Completed Interviews" value="2" />
                            <Tab label="Interviews To Take" value="3" />
                            <Tab label="Interviews Taken" value="4" />
                            <Tab label="Others Interviews" value="5" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        {/* Tab Panel for all active interviews */}
                        <MyMockInterviews status={["ACCEPTED"]} />
                    </TabPanel>
                    <TabPanel value="2">
                        {/* Tab Panel for all requested and completed interviews */}
                        <MyMockInterviews status={["REQUESTED", "COMPLETED"]} />
                    </TabPanel>
                    <TabPanel value="3">
                        {/* Tab Panel for all accepted interviews */}
                        <OtherMockInterviews status="ACCEPTED" />
                    </TabPanel>
                    <TabPanel value="4">
                        {/* Tab Panel for all completed interviews */}
                        <OtherMockInterviews status="COMPLETED" />
                    </TabPanel>
                    <TabPanel value="5">
                        {/* Tab Panel for all requested interviews by other users */}
                        <OtherMockInterviews status="REQUESTED" />
                    </TabPanel>
                </TabContext>
            </Box>
        </Box>
    )
}

export default MockInterview;
