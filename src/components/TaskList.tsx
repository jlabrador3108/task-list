import React from "react";
import { List } from "@mui/material";
import TaskItem from "./TaskItem";
import { TaskListProps } from "../types/type";

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  completeTask,
  deleteTask,
}) => {
  return (
    <List>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          completeTask={completeTask}
          deleteTask={deleteTask}
        />
      ))}
    </List>
  );
};

export default TaskList;
