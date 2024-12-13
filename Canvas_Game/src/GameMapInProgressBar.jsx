import React from "react";
//import DraggableList from "react-draggable-lists";
import { Box, Card, CardContent, Typography, CardActions, Button, useTheme } from '@mui/material';
import {assignments} from './data/mockAssignmentsData.js'; 

//import "./styles.css";

/*const listItems = [
  "Entertainment",
  "Private Time",
  "Rest",
  "Meal",
  "Exercise",
  "Work",
  "Home Projects",
  "Family"
];*/

/*const onMoveEnd = newList => {
  console.log(newList);
}*/

/*class GameMapInProgressBar extends React.Component {
  render() {
    return (
        <div width={300}>
          <DraggableList width={300} height={50} rowSize={1} onMoveEnd={onMoveEnd}>
            {assignments.map((assignment) => (
              <li key={assignment.id}>{assignment.title}</li>
            ))}
          </DraggableList>
        </div>
    );
  }
}

export default GameMapInProgressBar;*/
import { tokens } from "./theme";


const GameMapInProgressBar = () =>{
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    //render() {
            return (
                <div className="GMInProgressBar">
                    <h1>In Progress: </h1>
                    {assignments.map((assignment) => (
                                    <Card 
                                      key={assignment.id}
                                      style={{ 
                                        marginBottom: 8, 
                                        backgroundColor: colors.gray[700], 
                                        color: colors.gray[100],
                                        padding: '10px',
                                        borderRadius: '8px',
                                        cursor: 'grab', 
                                      }}
                                    >
                                      <CardContent>
                                        <Typography variant="h5">{assignment.title}</Typography>
                                        <Typography color="textSecondary">{assignment.due_date}</Typography>
                                      </CardContent>
                                    </Card>
                    ))}
                </div>
            );
     //   }
  }
  
  export default GameMapInProgressBar;
  


/*import "./styles.css";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const getItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

export default function App() {
  const [items, setItems] = React.useState(getItems(10));
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(reorderedItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={"droppable"}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {items.map((item, idx) => (
              <Draggable key={item.id} draggableId={item.id} index={idx}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}*/
