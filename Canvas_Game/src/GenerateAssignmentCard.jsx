import React from "react";
import { Box, Card, CardContent, Typography, CardActions, Button, useTheme } from '@mui/material';
import { tokens } from "./theme";

import {assignments} from './data/mockAssignmentsData.js'; 

/*Generates a card with assignment information for an assignment
    //card content might change
*/

const GenerateAssignmentCard = (props) => {
    const assignment = props.assignment; 

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const formatDateTime = (dateTimeString) => {
        const dateObj = new Date(dateTimeString);
        const formattedDate = dateObj.toLocaleDateString(); // Formats to "MM/DD/YYYY"
        const formattedTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Formats to "HH:MM AM/PM"
        return `${formattedDate} at ${formattedTime}`;
    };

    return (
        <div className="GenerateAssignmentCard">
            <Card 
                key={assignment.id}
                style={{ 
                marginBottom: 8, 
                backgroundColor: colors.gray[700], 
                color: colors.gray[100],
                padding: '10px',
                borderRadius: '8px',
                cursor: 'grab',     //do i need grab?
                }}
            >

                <CardContent>
                    <Typography variant="h5">{assignment.assignment_name}</Typography>
                    <Typography color="textSecondary">{formatDateTime(assignment.due_at)}</Typography>
                    <Typography color="textSecondary">{assignment.in_game_status}</Typography>
                </CardContent>

            </Card>
        </div>
    );
}
export default GenerateAssignmentCard

//is_submitted? more info, points_possible?