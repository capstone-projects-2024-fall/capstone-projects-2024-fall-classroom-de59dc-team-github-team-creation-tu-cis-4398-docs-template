import React from "react";
import { useState, useEffect } from "react"; 

//formatting --> more options on dashboard and userprofile
import {
    Box,
    // Button,
    // IconButton,
    // Typography,
    useMediaQuery,
    useTheme,
  } from "@mui/material";
import { tokens } from "./theme";

//imported components
import CourseDropdownMenu from './AssignmentsCourseDropdownMenu.jsx';
import CourseAssignmentsList from './CourseAssignmentsList.jsx'; 

/*pick course you want to look at, assignments are displayed in a categorised list, can adjust settings*/
    //settings:should have toggle if you dont want categories --> can do that later/ also should be able to change/add categories

const AssignmentsPage = ({email}) => {      //gonna get assignments from backend by email
    //sets theme 
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    //adjusts based on device size
    const isXlDevices = useMediaQuery("(min-width: 1260px)");
    const isMdDevices = useMediaQuery("(min-width: 724px)");
    const isXsDevices = useMediaQuery("(max-width: 436px)");

    //function to get course selection from dropdown menu
    const[courseValueId, setCourseValue] = useState(); 
    
    //send to CourseDropdownMenu to change courseValue var to whatever is selected from the dropdown menu 
    const onCourseSelectedFromCDM = (selectedCourseId) =>{ 
        setCourseValue(selectedCourseId); 
        console.log(courseValueId); //testing 
    }

    
    
    //on assignmentsPage being clicked on - call up course_name and course_id's w/ this.user_id
        //need to GET: course_name, course_id from back end 




    //when course selected -> pass that into courseAssignmentsList
    //when courseAssignmentsList is invoked -> call up assignments list in that function 

    return (
        <>
            <Box m="20px">
                <div className="AssignmentList">
                    <CourseDropdownMenu courseValueSelected = {onCourseSelectedFromCDM} email = {email}></CourseDropdownMenu>
                    <CourseAssignmentsList courseValueSelected = {courseValueId} email = {email}></CourseAssignmentsList>
                </div>

                {/*<div>
                    <GameMapInProgressBar></GameMapInProgressBar>
                </div>*/}
       
            </Box>
        </>
    ); 
}
export default AssignmentsPage



//OUTLINE/NOTES

//outline 
    //Assignments Nav bar: title, settings btn, back to main menu btn 

//TEST TO RUN AsSIGNMENTS PAGE