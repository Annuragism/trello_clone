import {
  Box, Divider, Paper, Typography
} from "@mui/material";

import React from "react";
import Task from "./Task";

//Styles
const todoStyles = { backgroundColor: "#673ab769" };
const inProgressStyles = { backgroundColor: "#ffa50073" };
const doneStyles = { backgroundColor: "#8bc34a80" };

const KanbanCard = ({ type, tasks, setTasks }) => {
  const cardStyles =
    type === "To Do"
      ? todoStyles
      : type === "In-Progress"
      ? inProgressStyles
      : doneStyles;

  const handleDrop = (event, tasks, setTasks, targetType) => {
    event.preventDefault();
    const droppedTaskId = event.dataTransfer.getData("id");

    // Find the dropped task
    const updatedTasks = tasks.map((task) => {
      if (task?.id === droppedTaskId) {
        return { ...task, status: targetType };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  return (
    <Paper
    elevation={12}
      sx={{
        overflow: "hidden",
        border:"1px solid #000"
      }}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => handleDrop(event, tasks, setTasks, type)}
    >
      <Typography
        align="center"
        sx={{
          color: "#3c3c3c",
          fontWeight: 800,
          p: 1,
          ...cardStyles,
        }}
      >
        {type}
      </Typography>
      <Divider />
      <Box py={1}>
        <Box
          mt={1}
          sx={{
            maxHeight: 500,
            minHeight: 500,
            overflow: "auto",
          }}
        >
          {tasks.filter((task) => task.status === type).length > 0 ? (
            tasks
              .filter((task) => task.status === type)
              .map((task, index) => (
                <Task
                  key={index}
                  name={task.name}
                  type={type}
                  t={task}
                  tasks={tasks}
                  setTasks={setTasks}
                />
              ))
          ) : (
            <Typography align="center">No Task Found</Typography>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default KanbanCard;
