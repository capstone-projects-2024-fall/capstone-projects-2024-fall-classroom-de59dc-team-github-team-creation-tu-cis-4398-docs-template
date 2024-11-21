import React from "react";
import { useState } from "react"; 

//formatting --> more options on dashboard and userprofile
/*import {
    Box,
    // Button,
    // IconButton,
    // Typography,
    useMediaQuery,
    useTheme,
  } from "@mui/material";
import { tokens } from "./theme";
*/

//old imports
import AssignmentsPageNavBar from './AssignmentsPageNavBar.jsx';
import AssignmentsList from './AssignmentsList.jsx';
import AssignmentsListDUMMY from './AssignmentsListDUMMYComp.jsx';

//imported components
import AssignmentsList2Try from './AssignmentsList2Try.jsx'; 
import CourseDropdownMenu from './AssignmentsCourseDropdownMenu.jsx';

/*pick course you want to look at, assignments are displayed in a categorised list, can adjust settings*/
    //settings:should have toggle if you dont want categories --> can do that later/ also should be able to change/add categories

const AssignmentsPage = () => {
    //sets theme 
    //const theme = useTheme();
    //const colors = tokens(theme.palette.mode);
    //adjusts based on device size
    /*const isXlDevices = useMediaQuery("(min-width: 1260px)");
    const isMdDevices = useMediaQuery("(min-width: 724px)");
    const isXsDevices = useMediaQuery("(max-width: 436px)");*/

    //function to get course selection from dropdown menu
    const[courseValue, setCourseValue] = useState(''); 
    
    //send to CourseDropdownMenu to change courseValue var to whatever is selected from the dropdown menu 
    const onCourseSelectedFromCDM = (selectedCourse) =>{ 
        setCourseValue(selectedCourse); 
        console.log(courseValue); //testing 
    }


    return (
        <>
            <Box m="20px">
                <div className="AssignmentList">
                    <CourseDropdownMenu courseValueSelected = {onCourseSelectedFromCDM}></CourseDropdownMenu>
                    <AssignmentsList2Try courseValueSelected = {courseValue}></AssignmentsList2Try>
                </div>

                {/*<div className = "AssignmentsListDummy">
                    <AssignmentsListDUMMY></AssignmentsListDUMMY>
                </div>
                <div>
                    <GameMapInProgressBar></GameMapInProgressBar>
                </div>*/}


                {/*<div className="AssignmentsPage">
                    <AssignmentsPageNavBar></AssignmentsPageNavBar>
                    
                </div>*/}
                {/*<div className="courseDropdown">
                    <CourseDropdownMenu></CourseDropdownMenu>
                </div>*/}


                {/*<div className="AssignmentList">
                    <AssignmentsList assignments = {assignments} course = {course} category = {category}></AssignmentsList>
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