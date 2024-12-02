import React from "react";

import GenerateAssignmentCard from "./GenerateAssignmentCard.jsx";

/*Lists Items based on Category input: CategorizedAssignmentList*/
    //need an on/off settings toggle for categories 

const CategorizedAssignmentsList = (props) => {

    const cat = props.cat; 
    const assignmentsList = props.assList; //might wanna change name 

    //filters assignments by category --> might have to change for db call (maybe use inmap filter)
    const filterByCat = (newCat) =>{
        return assignmentsList.filter(assignments=>assignments.category===newCat); 
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
