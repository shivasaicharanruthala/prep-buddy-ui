import axios from "axios";

const headers = {
    "Content-Type": "application/json"
};

const BASE_URL = 'http://localhost:8080'


// getUserEvents function to fetch all user events through API and sets the response in component state.
export const getUserEvents = async (userId) => {
    try {
        const res = await axios({
            url: `${BASE_URL}/user/${userId}/events`,
            method: 'GET',
            header: headers,
        })

        return res.data
    } catch (err) {
        console.error("axios catch error: ", err)

        return []
    }
}