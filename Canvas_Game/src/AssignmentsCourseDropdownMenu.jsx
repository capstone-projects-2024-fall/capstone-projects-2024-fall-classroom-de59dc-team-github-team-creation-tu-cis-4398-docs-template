import React from "react";

import {courses} from './data/mockAssignmentsData.js';

/*pick which class you want to see assignments from: CourseDropdownMenu*/ 

const CourseDropdownMenu = (props) => {

    //sets courseValue var to whatever is selected from dropdown menu 
    const onCourseSelectionChanged = (e) => {
        //console.log(e.target.value);  //testing
        props.courseValueSelected(e.target.value); 
    }

    return (
        <div className="ClassDropdown">
                <div className="dropdown-content">
                    <select onChange={onCourseSelectionChanged}>
                        {courses.map((course) => (
                                <option key={course} value={course}>{course}</option> 
                        ))}  {/*value: decides which one was clicked*/}
                        <option key="All" value="All">View All</option>    
                    </select>
                </div>
        </div>
    );

}
export default CourseDropdownMenu