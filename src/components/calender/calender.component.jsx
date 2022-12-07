import moment from "moment";
import {useContext, useEffect, useState} from "react";

import {UserContext} from "../../Context/user.context";
import {getUserEvents} from "../../services/calender";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

// MyCalendar Component to display all calendar events specific to logged-in user.
const MyCalendar = () => {
    const {userData} = useContext(UserContext)
    const [events, setEvents] = useState([])
    const userId = userData.id

    useEffect( () => {
        const fetchData = async () => {
            return await getUserEvents(userId)
        }

        fetchData().then(res => {
            res?.map(event => {
                event.start = moment(event.start, 'YYYY-MM-DDTHH:mm').subtract(6, 'hours').format('YYYY-MM-DDTHH:mm')
                event.end = moment(event.end, 'YYYY-MM-DDTHH:mm').subtract(5, "hours").format('YYYY-MM-DDTHH:mm')
            })

            setEvents(res)
        }).catch(err => {
            console.log("error: ", err)
            //TODO: alert
        })
    }, [])

    return (
        <div className="calendar-view">
            <FullCalendar
                headerToolbar={{
                    start: "prev,today,next",
                    center: 'title',
                    end: "dayGridMonth dayGridWeek dayGridDay",
                }}
                plugins={[dayGridPlugin]}
                views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
                events={events}
            />;
        </div>
    );
};

export default MyCalendar;