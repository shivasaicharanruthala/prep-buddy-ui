import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function BasicAlerts(props) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert variant="filled" severity={props.severity}>
        {props.message}
      </Alert>
    </Stack>
  );
}


export const CustomAlert = ({ isAlertSet, severity, message }) => {
  return (
    isAlertSet ? (
      <Alert severity={severity}>{message}</Alert>) : null
  )
}