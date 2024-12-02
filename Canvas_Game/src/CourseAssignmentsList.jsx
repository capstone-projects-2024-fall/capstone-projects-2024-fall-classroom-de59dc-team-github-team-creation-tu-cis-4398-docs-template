import React from "react";

import {assignments, categories, courses} from './data/mockAssignmentsData.js';
import CategorizedAssignmentsList from './CategorizedAssignmentsList.jsx';


/*Makes a categorized list of assignments for a class: CourseAssignmentsList 
    //should be sorted by most recent date 
    //new assignments should be added when they are created in canvas, but thats true for the whole program 
*/

const CourseAssignmentsList= (props) => {    //could do: {courseValueSelected}
    //list with header and cards

    const course = props.courseValueSelected; 

    //filters assignments by course --> might have to change for db call (maybe use inmap filter)
    const filterByCourse = (newCourse) =>{
        if(newCourse == 'All'){
            return assignments; 
        }
        return assignments.filter(assignments=>assignments.course===newCourse); 
    };

    const filteredAssignments = filterByCourse(course);


    return(
        <>
                <h1>{props.courseValueSelected}</h1>
                <ul className="AssignmentsList1">
                    {categories.map((category) => (  //for all categories in categories array, category = cat[i]

                        <li className='category-list' key ={category}>
                            <h2>{category}</h2>    
                            <CategorizedAssignmentsList cat={category} assList = {filteredAssignments}></CategorizedAssignmentsList>  {/*creates a categorized assignmment list*/} 
                        
                        </li>

                    ))}
                </ul>
                
        </>
    )
}
export default CourseAssignmentsList


                        /*<ul> //uncomment when you get program to actually work
                            {assignments.map((assignment) => (
                                if(category === assignment.category){
                                    <li key = {assignment.id}> 
                                        <h2>{assigment.title}</h2>
                                        <p>{assigment.due_date}</p>
                                    </li>
                                }
                                //for all assignments in category, add info to list ->
                                //<AssignmentListItem thisCat = {catgory} assignments = {assignments}></AssignmentListItem>
                            ));
                            }
                            
                            </ul>*/


/**********extra notes**********************************
 *               //tried to do it with useState
 * 
 *               //const [cat, setCat] = useState("Assignments"); 
                //setCat("Assignments"); 

                /*const filterByCat = (cat) =>{
                    return assignments.filter(assignments=>assignments.category==cat); 
                };*/

                //const filteredAssignments = filterByCat(cat); 
                //const [filteredAssignments, setFilteredAssignments] = useState(assignments);


 //               ----->return()
  
                    {/*categories.map((category) => (  //for all categories in key
                        
                        <div className='category-list' key ={category}>
                            <h1>{category}</h1>    
                            
                            
                            {/*this should be a separate component*/}
                            {/*setFilteredAssignments(filterByCat(category))}

                            {filteredAssignments.map((assignmentItem) => (
                                <div className = 'assItem' key = {assignmentItem.id}>
                                    <h2>{assignmentItem.title}</h2>
                                </div>
                            ))}

                        </div>

                    ))*/}
 