import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import AddTask from "./AddTask";
import mountain1 from "./BgImg/mountain1.jpg";
import p1 from "./BgImg/p1.jpg";
import p2 from "./BgImg/p2.jpg";
import p3 from "./BgImg/p3.jpg";
import p4 from "./BgImg/p4.jpg";
import p5 from "./BgImg/p5.jpg";
import sky from "./BgImg/sky.jpg";
import tree from "./BgImg/tree.jpg";
import KanbanCard from "./KanbanCard";
import { taskData } from "./task";
//Icons

const BGIMG = [
  { name: "None", file: null },
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

const kanbanCardTypes = ["To Do", "In-Progress", "Done"];

function ActivityBoard() {
  const [tasks, setTasks] = useState(taskData);
  const [bgImg, setBgImg] = useState(null);
  const [bgNoneColor, setBgNoneColor] = useState("#000");

  return (
    <Box
      sx={{
        height: "auto",
        p: 1,
        backgroundPosition: "center",
        backgroundImage: bgImg ? `url(${bgImg})` : "none",
        backgroundColor: bgImg ? "transparent" : bgNoneColor,
      }}
    >
      <Container sx={{ pt: 2 }}>
        <AddTask tasks={tasks} setTasks={setTasks} />
        <Box display={"flex"} p={1}>
          <Grid container spacing={2}>
            {kanbanCardTypes.map((v, i) => (
              <Grid
                item
                xs={12}
                sm={4}
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
        <BgTemplate
          setBgImg={setBgImg}
          bgImg={bgImg}
          setBgNoneColor={setBgNoneColor}
        />
      </Container>
    </Box>
  );
}

export default ActivityBoard;

const BgTemplate = ({ setBgImg, bgImg, setBgNoneColor }) => {
  return (
    <Box display="flex" justifyContent="center">
      <Box
        sx={{
          width: 800,
          backgroundColor: "#0000004f",
          borderRadius: 2,
          m: 6,
          border: !bgImg ? "1px solid #e7e7e7" : "none",
          display: "flex",
          justifyContent: "start",
          overflow: "auto",
          overflowX: "auto",
        }}
      >
        <Box display="flex" justifyContent={"center"} alignItems="center">
          {BGIMG?.map((b, i) => (
            <>
              <Box
                sx={{
                  m: 1,
                  height: 80,
                  width: 100,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: !bgImg ? "1px solid #e7e7e7" : "none",
                  borderRadius: 4,
                  cursor: "pointer",
                  overflow: "hidden",
                }}
                onClick={() => setBgImg(b?.file)}
              >
                {b?.name === "None" ? (
                  <Box
                    onClick={() => setBgImg(b?.file)}
                    display="flex"
                    justifyContent={"center"}
                    alignItems="center"
                  >
                    <DoNotDisturbAltIcon
                      sx={{
                        color: "#FFF",
                      }}
                    />
                    <Typography display={bgImg && "none"}>
                      <input
                        type="color"
                        onChange={(e) => setBgNoneColor(e.target.value)}
                      />
                    </Typography>
                  </Box>
                ) : (
                  <img src={b?.file} alt="icon" height="100%" width="100%" />
                )}
              </Box>
            </>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
