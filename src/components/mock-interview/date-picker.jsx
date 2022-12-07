import React from 'react';

import uuid from 'react-uuid';
import * as moment from 'moment';

import Grid from '@mui/material/Grid';
import Chip from "@mui/material/Chip";
import TextField from '@mui/material/TextField';
import ArrowCircleRightRoundedIcon from '@mui/icons-material/ArrowCircleRightRounded';

import './date-picker.styles.scss';

// formattedCurrentDate to format current timestamp by adding hours.
const formattedCurrentDate = (addHours) => {
   return moment().add(addHours, 'hour').format('YYYY-MM-DDTHH:mm')
}

// formattedCustomDate takes a custom date and formats it as required after adding hours.
const formattedCustomDate = (date, addHours) => {
    return moment(date, 'YYYY-MM-DDTHH:mm').add(addHours, 'hour').format('YYYY-MM-DDTHH:mm')
}

// formattedDateForChip formats availableSlots when time selected on same day to display in chip.
export const formattedDateForChip = (slot) => {
    const from = moment(slot.start, 'YYYY-MM-DDTHH:mm')
    const to  = moment(slot.end, 'YYYY-MM-DDTHH:mm')

    let fromYear = from.year()
    let fromMonth = from.month()
    let fromDate = from.date()

    let toYear = to.year()
    let toMonth = to.month()
    let toDate = to.date()

    if(fromYear === toYear && fromMonth === toMonth && fromDate === toDate ) {
        return from.format('Do MMM YYYY hh:mm a') + " - " + to.format('hh:mm a')
    }

    return from.format('Do MMM YYYY hh:mm a') + " - " + to.format('Do MMM YYYY hh:mm a')
}


// DatetimePicker Component to handle availableSlots picker and display slots chosen.
function DatetimePicker({initialSlots, setSlots}) {
    const [startTime, setStartTime] = React.useState(formattedCurrentDate(0));
    const [endTime, setEndTime] = React.useState(formattedCurrentDate(1));
    const [availableSlots, setAvailableSlots] = React.useState(initialSlots? initialSlots : []);

    const handleStartTimeChange = (e) => {
        if (moment().format('YYYY-MM-DDTHH:mm') > moment(e.target.value, 'YYYY-MM-DDTHH:mm').format('YYYY-MM-DDTHH:mm')) {
            alert("Interview startTime")

            return
        }

        setStartTime(formattedCustomDate(e.target.value, 0));
        setEndTime(formattedCustomDate(e.target.value, 1));
    };

    const handleSlotSubmit = (newSlot) => {
        if(availableSlots.length > 3) {
            alert("Sorry!!!, You cant add more than 4 slots.")

            return
        }

        setStartTime(formattedCurrentDate(0))
        setEndTime(formattedCurrentDate(1))

        for (let i = 0; i < availableSlots.length; i++) {
            if(availableSlots[i].start === newSlot.start) {
                alert("Sorry!!!, You have already added the same slot.")

                return
            }
        }

        setAvailableSlots([...availableSlots, newSlot])
        setSlots([...availableSlots, newSlot])
    };

    const handleDelete = (slotId) => {
        setAvailableSlots(availableSlots.filter(slot => slot.id.toString() !== slotId.toString()))
    };


    return (
        <div style={{backgroundColor: '#f2f2f7', padding: '10px'}}>
            <div style={{margin: '10px', marginBottom: '20px'}}>
                {
                    availableSlots.map(slot => <Chip style={{marginRight: 10, marginBottom: 4}} key={slot.id} label={formattedDateForChip(slot)} color="warning" onDelete={() => handleDelete(slot.id)} /> )
                }
            </div>
            <Grid container>
                <Grid style={{margin: '10px'}}>
                    <TextField
                        style={{backgroundColor: "white"}}
                        id="datetime-local"
                        label="From"
                        type="datetime-local"
                        inputProps={{ min: moment().format("YYYY-MM-DDTHH:mm") }}
                        value={startTime}
                        onChange={handleStartTimeChange}
                        sx={{ width: 310 }}
                        required
                    />
                </Grid>
                <Grid style={{margin: '10px', marginLeft: '15px'}}>
                <TextField
                    style={{backgroundColor: "white"}}
                    id="datetime-local"
                    label="To"
                    value={endTime}
                    type="datetime-local"
                    sx={{ width: 310 }}
                    disabled
                />
            </Grid>
                <Grid className="interview-slot-submit-btn" style={{margin: '17px'}}>
                    <ArrowCircleRightRoundedIcon fontSize="large" color="primary" onClick={() => handleSlotSubmit({id: uuid(), start: startTime, end: endTime})}/>
                </Grid>
            </Grid>
        </div>
    );
}

export default DatetimePicker;