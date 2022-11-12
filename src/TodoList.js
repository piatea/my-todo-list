import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Checkbox, ListItemIcon, ListItemText, Typography } from "@mui/material";

const TodoList = ({ todos, toggleTodo }) => {
  
  return(
    (todos.length === 0) ? <Typography>No task is to do.</Typography> :
    <List>
      { todos.map((todo) => {
        const labelId = `checkbox-list-label-${todo.id}`;
        const handleTodoClick = () => {
          toggleTodo(todo.id);
        };
        return(
          <ListItem
            key={todo.id}
          >
            <ListItemButton onClick={handleTodoClick}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={todo.status}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby' : labelId}}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={todo.name} />
            </ListItemButton>
          </ListItem> 
        );
      })}
    </List>
    
  );
};

export default TodoList;