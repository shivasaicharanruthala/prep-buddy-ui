import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import * as React from "react";


export const NoInterviews = () => {
    return (
        <Card variant="outlined" sx={{boxShadow: 4, borderRadius: 3, width: 1100 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom align="center">
                    No Interviews Available!!!
                </Typography>
            </CardContent>
        </Card>
    )
}