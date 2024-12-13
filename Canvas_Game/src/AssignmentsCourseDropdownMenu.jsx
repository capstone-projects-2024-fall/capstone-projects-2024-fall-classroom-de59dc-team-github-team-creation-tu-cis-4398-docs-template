import React from "react";
import {useState, useEffect} from "react"; 

//import {courses} from './data/mockAssignmentsData.js';

/*pick which class you want to see assignments from: CourseDropdownMenu*/ 

const CourseDropdownMenu = (props) => {

    
    const email = props.email

    const [courseNameList, setCourseNameList]= useState([]) 
    const [coureNameHeader, setCourseNameHeader] = useState()

    useEffect(() => {
    /* fetch course names from backend */
    const fetchCourses = async () => {
        try {
            const response = await fetch(`http://localhost:5000/coursesFromDb?email=${email}`);  //fetches {python function} from backend and sends email as a query param
            if (!response.ok) {
                throw new Error('Failed to fetch courses');
            }
          
            const data = await response.json(); //gets data from backend
            //console.log(data)   //testing testing
            
            const getCourseNameList = []

            data.courses.forEach((course) => {    //for each course in data, course is:
                getCourseNameList.push({
                    course_name: course.course_name,
                    course_id: course.course_id
                })
            });

            getCourseNameList.push({course_name: "All Courses", course_id: 111});  //add an all courses category - JUST MADE THE COURSE ID UP cause it doesnt matter  
            setCourseNameList(getCourseNameList); //put list into global list

        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };
  
    fetchCourses();
    console.log(courseNameList)   //testing
    }, [email]);


    //sets courseValue var to whatever is selected from dropdown menu 
    const onCourseSelectionChanged = (e) => {
        //console.log(e.target.value);  //testing
        props.courseValueSelected(e.target.value); 
    }


    return (
        <div className="ClassDropdown">
                <div className="dropdown-content">
                    <select onChange={onCourseSelectionChanged}>
                        {courseNameList.map((courseName) => (
                                <option key={courseName.course_id} value={courseName.course_id}>{courseName.course_name}</option>  
                        ))}  {/*value: decides which one was clicked*/}
                        <option key="All" value="All">View All</option>    
                    </select>
                </div>
        </div>
    );

}
export default CourseDropdownMenu