import * as React from "react";
import {useContext, useEffect, useState} from "react";

import Card from '@mui/material/Card';
import {UserContext} from "../../Context/user.context";
import MockInterviewCard from "./mock-interview-card.component";
import { getInterviewsTaken} from "../../services/mock-interview";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import {NoInterviews} from "./No-Interviews";


// OtherMockInterviews Component renders the interviews to take or accept and pass to MockInterviewCard.
const OtherMockInterviews = ({status}) => {
    // fetches userData from user context.
    const {userData} = useContext(UserContext);

    const [interviews, setInterviews] = useState([])
    const [acceptRequest, setAcceptRequest] = useState(false)
    const [feedbackGiven, setFeedbackGiven] = useState(false)

    const userId = userData.id;

    // fetch the interview details to take and accept on component render and when acceptRequest, feedbackGiven changed.
    useEffect( () => {
        const fetchData = async () => {
            return await getInterviewsTaken(userId, status)
        }

        fetchData().then(res => {
            setInterviews(res)
        }).catch(err => {
            console.log("error: ", err)
            //TODO: alert
        })
    }, [acceptRequest, feedbackGiven])

    return (
        <div>
            {
                interviews.length > 0 ? (
                    interviews.filter(interview => interview.userId !== userId).map(interview =>  <MockInterviewCard key={interview.id} interviewDetails={interview} setAcceptRequest={setAcceptRequest} feedbackGiven={setFeedbackGiven} />)
                ) : (
                    <NoInterviews />
                )
            }
        </div>
    )
}

export default OtherMockInterviews;