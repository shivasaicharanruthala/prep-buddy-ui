import * as React from "react";

// imports Styled
import {CardContent, Typography, Card} from "@mui/material";


// NoInterviews Component as a common component to when no interviews available.
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