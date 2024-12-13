import React from "react";

import GenerateAssignmentCard from "./GenerateAssignmentCard.jsx";

/*Lists Items based on Category input: CategorizedAssignmentList*/
    //need an on/off settings toggle for categories 
    //NEED TO LET USER CHANGE CAT - would change in db

const CategorizedAssignmentsList = (props) => {

    const cat = props.cat; 
    const assignmentsList = props.assList; //might wanna change name 

    //filters assignments by category --> might have to change for db call (maybe use inmap filter)
    const filterByCat = (newCat) =>{    //automatically sorts by quix/test vs nonquiz/test  -> cat can be changed by user 
        if(newCat == 'None'){   //if categories are turned off  //NEED A WAY TO TURN THEM OFF
            return assignmentsList; 
        }
        else if(newCat == 'Tests/Quizzes'){
            return assignmentsList.filter(assignments=>assignments.submission_types==='online_quiz,'); 
        }
        return assignmentsList.filter(assignments=>assignments.submission_types!== 'online_quiz,')
    };

    const filteredAssignments = filterByCat(cat); 


    return(
        <>
            <div className='filteredAssList'>
                {filteredAssignments.map((assignmentItem) => (
                            <div className = 'assItem' key = {assignmentItem.id}>
                                <GenerateAssignmentCard assignment = {assignmentItem}></GenerateAssignmentCard>
                            </div>
                ))}
            </div>
        </>
    )


}
export default CategorizedAssignmentsList
