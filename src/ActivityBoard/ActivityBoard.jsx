import { Box, Container, Grid, Typography } from "@mui/material";
import AddTask from "./AddTask";
import KanbanCard from "./KanbanCard";
import p1 from "./BgImg/p1.jpg";
import p2 from "./BgImg/p2.jpg";
import p3 from "./BgImg/p3.jpg";
import p4 from "./BgImg/p4.jpg";
import p5 from "./BgImg/p5.jpg";
import mountain1 from "./BgImg/mountain1.jpg";
import tree from "./BgImg/tree.jpg";
import sky from "./BgImg/sky.jpg";

import React, { useState } from "react";
import { taskData } from "./task";
//Icons

const BGIMG = [
  { name: "Nature", file: p1 },
  { name: "Moun", file: p2 },
  { name: "Grass", file: p3 },
  { name: "Window", file: p4 },
  { name: "Thought", file: p5 },
  { name: "Mountain1", file: mountain1 },
  { name: "Tree", file: tree },
  { name: "Sky", file: sky },
];

const handleDrop = (event, tasks, setTasks, targetType) => {
  event.preventDefault();
  const droppedTask = event.dataTransfer.getData("task");
  const droppedTaskId = event.dataTransfer.getData("id");
  const droppedStatus = event.dataTransfer.getData("status");

  // Find the dropped task
  const updatedTasks = tasks.map((task) => {
    if (task?.id === droppedTaskId) {
      return { ...task, status: targetType };
    }
    return task;
  });

  setTasks(updatedTasks);
};

const kanbanCardTypes = ["To Do", "In-Progress", "Done"];

function ActivityBoard() {
  const [tasks, setTasks] = useState(taskData);
  const [bgImg, setBgImg] = useState(p1);

  return (
    <Box
      sx={{
        height: "auto",p:1,
        backgroundImage: `url(${bgImg})`,
        backgroundPosition: "center",
      }}
    >
      <Container sx={{ pt: 2 }}>
        <AddTask tasks={tasks} setTasks={setTasks} />
        <Box display={"flex"} p={1}>
          <Grid container spacing={2}>
            {kanbanCardTypes.map((v, i) => (
              <Grid
                item
                xs={4}
                key={i}
                sx={{
                  minHeight: 500,
                  overflow: "auto",
                }}
              >
                <Box
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => handleDrop(event, tasks, setTasks, v)}
                >
                  <KanbanCard type={v} tasks={tasks} setTasks={setTasks} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
        <BgTemplate setBgImg={setBgImg} bgImg={bgImg} />
      </Container>
    </Box>
  );
}

export default ActivityBoard;

const BgTemplate = ({ setBgImg ,bgImg}) => {
  return (
    <Box display="flex" justifyContent="center">
      <Box
        sx={{
          width: 800,
          height: 100,
          backgroundColor: "#0000004f",
          // position: "absolute",
          // bottom: 15,
          borderRadius: 2,
          m:8,
          p:"1px"
        }}
      >
        <Box display="flex">
          {BGIMG?.map((b, i) => (
            <Box
              sx={{
                p: 1,
                height: 80,
                width: 100,
              }}
              onClick={() => setBgImg(b?.file)}
            >
              <img
                style={{ borderRadius: 12,cursor:"pointer" }}
                src={b?.file}
                alt="icon"
                height="100%"
                width="100%"
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
