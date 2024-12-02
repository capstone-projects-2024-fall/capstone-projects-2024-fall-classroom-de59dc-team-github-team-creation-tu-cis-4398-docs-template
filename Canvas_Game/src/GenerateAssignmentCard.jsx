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
                    <Typography variant="h5">{assignment.title}</Typography>
                    <Typography color="textSecondary">{assignment.due_date}</Typography>
                    <Typography color="textSecondary">{assignment.status}</Typography>
                </CardContent>

            </Card>
        </div>
    );
}
export default GenerateAssignmentCard