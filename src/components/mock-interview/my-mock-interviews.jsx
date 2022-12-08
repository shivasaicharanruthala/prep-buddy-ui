import * as React from "react";
import {useContext, useEffect} from "react";

import {UserContext} from "../../Context/user.context";

// imports dependent components to be rendered.
import {NoInterviews} from "./No-Interviews";
import MockInterviewCard from "./mock-interview-card.component";
import {getAllMyMockInterviews} from "../../services/mock-interview";


// MyMockInterviews Component to iterate over each interview and pass those details to MockInterviewCard component.
const MyMockInterviews = ({status}) => {
    const {userData} = useContext(UserContext);

    const [interviews, setInterviews] = React.useState([])

    const userId = userData.id;

    const updateInterviewsAfterDelete = (id) => {
        setInterviews(interviews.filter(interview => interview.id !== id))
    }

    // fetches all interviews specific to a user while rendering for the first time.
    useEffect( () => {
        const fetchData = async () => {
            return await getAllMyMockInterviews(userId)
        }

        fetchData().then(res => {
            const filteredInterviews = res.filter(interview => status.includes(interview.status))
            setInterviews(filteredInterviews)
        }).catch(err => {
            console.log("error: ", err)
            //TODO: alert
        })
    }, [])

    return (
        <div>
            {
                interviews.length > 0 ? (
                    interviews.map(interview =>  <MockInterviewCard key={interview.id} interviewDetails={interview} updateInterviewsAfterDelete={updateInterviewsAfterDelete}/>)
                ) : (
                    <NoInterviews />
                )
            }
        </div>
    )

}

export default MyMockInterviews;