import axios from 'axios';

// required headers
const headers = {
    "Content-Type": "application/json"
};

const BASE_URL = 'http://localhost:8080'

// getAllMyMockInterviews function fetches all interviews to a specific user and sets response component state.
export const getAllMyMockInterviews = async (userId) => {
    try {
        const res = await axios({
            url: `${BASE_URL}/user/${userId}/mock-interviews`,
            method: 'GET',
            header: headers,
        })

        return res.data
    } catch (err) {
        console.error("axios catch error: ", err)

        return []
    }
};

// postFeedback function sends feedback to an interview to API through axios and sets response in UI state.
export const postFeedback = async (interviewerId, mockInterviewId, feedback) => {
    try {
        const res = await axios({
            url: `${BASE_URL}/user/${interviewerId}/mock-interviews/${mockInterviewId}/feedback`,
            method: 'PATCH',
            header: headers,
            data: {"feedback": feedback}
        })

        return res.data
    } catch (err) {
        console.error("axios catch error: ", err)

        return []
    }
};

// deleteInterview function to delete a interview requested by a user and sets the response accordingly component state.
export const deleteInterview = async (interviewerId, mockInterviewId) => {
    try {
        return await axios({
            url: `${BASE_URL}/user/${interviewerId}/mock-interviews/${mockInterviewId}`,
            method: 'DELETE',
            header: headers,
        })
    } catch (err) {
        console.error("axios catch error: ", err)

        return 0
    }
}

// getInterviewsTaken function to fetch all interviews with status filter by API and sets the response in component state.
export const getInterviewsTaken = async (interviewerId, status) => {
    try {
        let queryString = status? `?status=${status}` : ''

        const res = await axios({
            url: `${BASE_URL}/user/${interviewerId}/interviews-taken`+ queryString,
            method: 'GET',
            header: headers,
        })

        return res.data
    } catch (err) {
        console.error("axios catch error: ", err)

        return []
    }
}

// acceptMockInterviewRequest function to accept mock-interviews request by user API and sets the response in component state.
export const acceptMockInterviewRequest = async (interviewerId, interviewId, slotId, resumeId) => {
    try {
        const res = await axios({
            url: `${BASE_URL}/user/${interviewerId}/mock-interviews/${interviewId}/accept-request`,
            method: 'PATCH',
            header: headers,
            data: {"slotId": slotId, "resume": resumeId},
        })

        return res.data
    } catch (err) {
        console.error("axios catch error: ", err)

        return []
    }
}

// requestInterview function to request a mock-interview by a user through API and sets the response in component state.
export const requestInterview = async (userId, payload) => {
    try {
        const res = await axios({
            url: `${BASE_URL}/user/${userId}/mock-interviews`,
            method: 'POST',
            header: headers,
            data: payload
        })

        return res.data
    } catch (err) {
        console.error("axios catch error: ", err)

        return {}
    }
}

// modifyInterview function modify interview details through API and sets the response in component state.
export const modifyInterview = async (userId, interviewId, payload) => {
    try {
        const res = await axios({
            url: `${BASE_URL}/user/${userId}/mock-interviews/${interviewId}`,
            method: 'PUT',
            header: headers,
            data: payload
        })

        return res.data
    } catch (err) {
        console.error("axios catch error: ", err)

        return {}
    }
}
