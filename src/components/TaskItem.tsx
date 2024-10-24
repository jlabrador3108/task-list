import React from "react";
import { ListItem, ListItemText, IconButton, Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { green } from "@mui/material/colors";
import { TaskItemProps } from "../types/type";

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  completeTask,
  deleteTask,
}) => {
  return (
    <ListItem
      style={{
        backgroundColor: task.completed ? green[200] : "#f8f9fa",
        marginBottom: "0.5rem",
        borderRadius: "4px",
        transition: "background-color 0.3s",
        height: "40px"
      }}
      
    >
      <ListItemText
        primary={task.title}
        style={{
          textDecoration: task.completed ? "line-through" : "none",
        }}
        primaryTypographyProps={{ color: "text.secondary" }}
      />
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <IconButton edge="end" onClick={() => completeTask(task.id)}>
          <CheckIcon color={task.completed ? "success" : "secondary"} />
        </IconButton>
        <IconButton edge="end" onClick={() => deleteTask(task.id)}>
          <DeleteIcon color="error" />
        </IconButton>
      </Box>
    </ListItem>
  );
};

export default TaskItem;
