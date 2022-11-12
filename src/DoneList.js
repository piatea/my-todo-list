import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Checkbox, ListItemIcon, ListItemText, Typography } from "@mui/material";

const DoneList = ({ dones, toggleDone }) => {
  
  return(
    (dones.length === 0) ? <Typography>No task is done.</Typography> :
    <List>
      { dones.map((done) => {
        const labelId = `checkbox-list-label-${done.id}`;
        const handleDoneClick = () => {
          toggleDone(done.id);
        };
        return(
          <ListItem
            key={done.id}
          >
            <ListItemButton onClick={handleDoneClick}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={done.status}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby' : labelId}}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={done.name} />
            </ListItemButton>
          </ListItem> 
        );
      })}
    </List>
  );
};

export default DoneList;