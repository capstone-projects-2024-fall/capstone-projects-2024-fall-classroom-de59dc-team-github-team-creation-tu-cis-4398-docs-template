import React from 'react';
import { Card, CardHeader, CardContent, Typography, Box } from '@mui/material';
import CanvasKeyForm from './CanvasKeyForm.jsx';
import SideBar from './scenes/layout/sidebar/index.jsx'; // Adjust the path if necessary
import { useNavigate } from 'react-router-dom';
import { Home, AccountCircle, ExitToApp, Assignment } from '@mui/icons-material';
import { ToggledContext } from "./App.jsx";

export default function ConnectCanvas() {
    return (
        <Box display="flex">


            {/* Main Content */}
            <Box flexGrow={1} padding={2}>
                <Card>
                    <CardHeader
                        title="Connect To Canvas"
                        subheader="Enter a key generated from your canvas account to turn your assignments into a game!"
                    />
                    <CardContent>
                        <CanvasKeyForm />
                        <Typography variant="body">
                            <br />To connect your account to canvas, follow these steps:
                            <ol>
                                <li>Log in to your institution/school's canvas site</li>
                                <li>Click "Account" in the top left<br /><img src="src/assets/account.png" alt="Account Icon" /></li>
                                <li>Click "Settings"<br /><img src="src/assets/settings.png" alt="Settings Icon" /></li>
                                <li>Scroll down to the bottom of the page</li>
                                <li>Find the button that says "New Access Token" and click it<br /><img src="src/assets/accessToken.png" alt="Access Token Icon" /></li>
                                <li>Add Canvas Quest to the purpose, and don't enter an expiration date</li>
                                <li>Copy the token, paste it on this page and hit connect!</li>
                            </ol>
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}
