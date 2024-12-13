import React from "react";
import {useState, useEffect} from "react"

import {assignments, categories, courses} from './data/mockAssignmentsData.js';
import CategorizedAssignmentsList from './CategorizedAssignmentsList.jsx';


/*Makes a categorized list of assignments for a class: CourseAssignmentsList 
    //should be sorted by most recent date 
    //new assignments should be added when they are created in canvas, but thats true for the whole program 
*/

const CourseAssignmentsList= (props) => {    //could do: {courseValueSelected}
    //list with header and cards
    
    const course= props.courseValueSelected;
    const email=props.email;

    
    const[assignmentList, setAssignmentList] = useState([])

    // Fetch all assignments from the backend
    useEffect(() => {
        const fetchAllAssignmentsFromDB = async () => {
            try {
                const response = await fetch(`http://localhost:5000/getAllAssignmentsFromDb?email=${email}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }

                const data = await response.json();
                
                const assList = []

                data.assignments.forEach((task) => {
                    assList.push({
                        id: task.id,
                        assignment_id: task.assignment_id, //id
                        user_id: task.user_id,
                        assignment_name: task.assignment_name,
                        assignment_description: task.assignment_description,
                        due_at: task.due_at,
                        course_id: task.course_id, 
                        submission_types: task.submission_types,
                        points_possible: task.points_possible,  //took out published !! dont really need it 
                        in_game_status: task.in_game_status,    //"Undecided", "To Do", "In Progress", "Done"
                        is_submitted: task.is_submitted,    
                        assignment_url: task.assignment_url,
                    })
                });
                console.log(assList)
                setAssignmentList(assList);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchAllAssignmentsFromDB();
    }, [email]);


    //automatically sort into quizzes/tests if has that tag, let user change if
        //if user changes it -> can change several and submit -> onChange -> update data in db &rerender page
            //if user clicks change settings, small dropdown menu will be on assignment card to change category of every assignment
    const  categoryNames = ['Assignments', 'Tests/Quizzes']

    //filters assignments by course --> might have to change for db call (maybe use inmap filter)
    const filterByCourse = (newCourseId) =>{
        if(newCourseId == 111){
            console.log("newCourseI")
            return assignmentList; 
        }
        return assignmentList.filter(assignmentList=>assignmentList.course_id==newCourseId); 

    };

    const filteredAssignments = filterByCourse(course);   //returns a list of assignments by course
    console.log(filteredAssignments)

    return(
        <>
                {/*<h1>{props.courseValueSelected}</h1>*/}
                <ul className="AssignmentsList1">
                    {categoryNames.map((categoryName) => (  //for all categories in categories array, category = cat[i]

                        <li className='category-list' key ={categoryName}>
                            <h2>{categoryName}</h2>    
                            <CategorizedAssignmentsList cat={categoryName} assList = {filteredAssignments}></CategorizedAssignmentsList>  {/*creates a categorized assignmment list*/} 
                        </li>

                    ))}
                </ul>
                
        </>
    )
}
export default CourseAssignmentsList



/**********extra notes**********************************
 *               //tried to do it with useState
 * 
 *               //const [cat, setCat] = useState("Assignments"); 
                //setCat("Assignments"); 

                /*const filterByCat = (cat) =>{
                    return assignments.filter(assignments=>assignments.category==cat); 
                };*/

                //const filteredAssignments = filterByCat(cat); 
                //const [filteredAssignments, setFilteredAssignments] = useState(assignments);*/
 