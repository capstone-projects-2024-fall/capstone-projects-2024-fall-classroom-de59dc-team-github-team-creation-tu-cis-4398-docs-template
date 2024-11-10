import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './Router';
import './index.css';
import { Box, CssBaseline, ThemeProvider, TextField, Button, FormControl } from "@mui/material";
import {Card, CardHeader, CardContent, Typography} from '@mui/material';
import CanvasKeyForm from './CanvasKeyForm.jsx';


export default function ConnectCanvas(){
    return(
        <div>
            <Card>
                <CardHeader title='Connect To Canvas' subheader='Enter a key generated from your canvas account to turn your assignments into a game!'></CardHeader>
                <CardContent>
                            <CanvasKeyForm></CanvasKeyForm>
                    <Typography variant='body'>
                        <br/>To connect your account to canvas, follow these steps:
                            <ol>
                                <li>Log in to your institution/school's canvas site</li>
                                <li>Click "Account" in the top left<br/><img src="src/assets/account.png"/></li>
                                <li>Click "Settings"<br/><img src="src/assets/settings.png"/></li>
                                <li>Scroll down to the bottom of the page</li>
                                <li>Find the button that says "New Access Token" and click it<br/><img src="src/assets/accessToken.png"/></li>
                                <li>Add Canvas Quest to the purpose, and don't enter en expiration date</li>
                                <li>Copy the token, paste it on this page and hit connect!</li>
                            </ol>

                    </Typography>
                </CardContent>
            </Card>
            
        </div>
    );
}

