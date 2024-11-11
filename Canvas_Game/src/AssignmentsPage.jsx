


//maybe a drop down menu to switch between classes
//get classes
    //get assignments in classes 
        //list info for each assignment 




//maybe demo is just 3 classes in mock assignment card 
    //maybe add an extra assignment in one of the classes so you can break them up into categories
    

//outline 
    //Assignments Nav bar: title, settings btn, back to main menu btn 
    //class list bar -> when selected, draw up info
        //scroll menu broken up into categories 
            //category 1 
                //assignment -> display assignment info
            //category 2 
                //assignment -> display assignment info

//TEST TO RUN AsSIGNMENTS PAge



import { useState } from "react"; 

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


import AssignmentsPageNavBar from './AssignmentsPageNavBar.jsx';
import AssignmentsList from './AssignmentsList.jsx';
import AssignmentsListDUMMY from './AssignmentsListDUMMYComp.jsx';
import CourseDropdownMenu from "./AssignmentsCourseDropownMenu";
import GameMapInProgressBar from './GameMapInProgressBar.jsx';
import React from "react";

const AssignmentsPage = () => {
    //sets theme 
   /* const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    //adjusts based on device size
    const isXlDevices = useMediaQuery("(min-width: 1260px)");
    const isMdDevices = useMediaQuery("(min-width: 724px)");
    const isXsDevices = useMediaQuery("(max-width: 436px)");


    //mock assignments  //going to query database and gather this data, this is just a mockup
    const [assignments, setAssignments] = useState([
        { id: 1, title: "Discussion Week 4", course: "CIS 4331", category: "Discussions", due_date: "September 28 at 11:59"},
        { id: 2, title: "Research Paper", course: "ENG 102", category: "Assignments", due_date: "October 2 at 11:59"},
        { id: 3, title: "Lab 4", course: "CIS 4345", category: "Labs", due_date: "October 3 at 11:59"},
        { id: 4, title: "Project Setup", course: "CIS 4398", category: "Assignments", due_date: "October 10 at 11:59"},
        { id: 5, title: "Yoga Discussion 2", course: "DANC 1807", category: "Discussions", due_date: "October 12 at 11:59"},
        { id: 6, title: "Team Formation", course: "CIS 4398", category: "Assignments", due_date: "Ocober 20 at 11:59"}
    ])

    const [course, setCourse] = useState(["CIS 4331", "ENG 102", "CIS 4345", "CIS 4398", "DANC 1807"])
    const [category, setCategory] = useState(["Discussions", "Assignments", "Labs"])
*/


    return (
        <>
            <Box m="20px">
                {/*<div className="AssignmentsPage">
                    <AssignmentsPageNavBar></AssignmentsPageNavBar>
                    
                </div>*/}
                <div className="courseDropdown">
                    <CourseDropdownMenu></CourseDropdownMenu>
                </div>

                <div className = "AssignmentsListDummy">
                    <AssignmentsListDUMMY></AssignmentsListDUMMY>
                </div>
                <div>
                    <GameMapInProgressBar></GameMapInProgressBar>
                </div>

                {/*<div className="AssignmentList">
                    <AssignmentsList assignments = {assignments} course = {course} category = {category}></AssignmentsList>
                </div>*/}
            </Box>
        </>
    ); 
}
export default AssignmentsPage