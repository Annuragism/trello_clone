import {
  Avatar,
  Box,
  Button,
  Checkbox,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useRef } from "react";
import Dialog from "@mui/material/Dialog";
//Icons
import Del from "./delete.png";
import fire1 from "./fire1.jpg";
const LabelList = [
  { color: "red", name: "red", id: 1 },
  { color: "yellow", name: "yellow", id: 2 },
  { color: "pink", name: "pink", id: 3 },
  { color: "cyan", name: "cyan", id: 4 },
];
//Task
const Task = ({ name = "Task Name", type = null, t, tasks, setTasks }) => {
  const { hot, priority, label_color } = t;
  const tastRef = useRef(t);
  const [selectedTask, setSelectedTask] = useState(t);

  const [open, setOpen] = useState(false);

  const handleDragStart = (event, task, status, id) => {
    event.dataTransfer.setData("task", task);
    event.dataTransfer.setData("status", status);
    event.dataTransfer.setData("id", id);
  };

  const handelTaskDelete = (taskDetails) => {
    const filtedTasks = tasks?.filter((v) => v?.id !== taskDetails.id);
    setTasks(filtedTasks);
  };

  const handleClose = () => {
    setOpen(false);
  };

 

  const ColorLabelsStyle = ({
    color,
    selectedLable,
    setSelectedLablel,
    index,
  }) => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: selectedLable === index && "#e7e7e7",
          height: 30,
          width: 30,
          p: 1,
          m: 1,
          borderRadius: selectedLable === index && "50%",
        }}
      >
        <IconButton onClick={(e) => setSelectedLablel(index)}>
          <Box
            sx={{
              backgroundColor: color,
              height: 20,
              width: 20,
              borderRadius: "50%",
            }}
          ></Box>
        </IconButton>
      </Box>
    );
  };

   const handelUpdate = () => {
     console.log(selectedTask);
     let filteredTask = tasks?.filter(v=>v.id !== selectedTask.id)
     setTasks([...filteredTask,selectedTask]);
     handleClose();
   };
  return (
    <>
      <Box
        sx={{
          border: "1px solid #e7e7e7",
          borderLeft: "none",
          borderRadius: 2,
          m: 1,
          p: 2,
          position: "relative",
          backgroundImage: hot && `url(${fire1})`,
          backgroundSize: hot && "contain",
        }}
        draggable
        onDragStart={(event) => handleDragStart(event, name, type, t?.id)}
        onClick={() => {
          tastRef.current = t;
            setSelectedTask(t);
          setOpen(true);
        }}
      >
        {label_color && (
          <Box
            sx={{
              height: "100%",
              width: "5px",
              backgroundColor: label_color,
              position: "absolute",
              left: 0,
              top: 0,
              borderTopLeftRadius: 9,
              borderBottomLeftRadius: 9,
            }}
          ></Box>
        )}
        <Box display={"flex"} justifyContent="space-between">
          <Typography
            sx={{
              color: hot ? "#FFF" : "#3c3c3c",
            }}
          >
            {name}
          </Typography>
          <Typography
            sx={{
              color: "#fff",
              padding: "2px",
              borderRadius: 4,
              background:
                priority === "p1"
                  ? "#d72222cc"
                  : priority === "p2"
                  ? "#209ea1e0"
                  : "#3737f4d6",
              textAlign: "center",
              width: "25px",
              fontWeight: "600",
              textTransform: "capitalize",
            }}
          >
            {priority}
          </Typography>
        </Box>
        <Box display={"flex"} justifyContent="space-between" mt={1}>
          <Typography
            sx={{
              color: hot ? "#FFF" : "#b0b0b0",
            }}
          >
            {t?.desc}
          </Typography>
          <IconButton onClick={() => handelTaskDelete(t)}>
            <Avatar
              variant="square"
              src={Del}
              sx={{
                height: "20px",
                width: "20px",
              }}
            />
          </IconButton>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle>Update Task</DialogTitle>
        <DialogContent>
          <Box>
            {tastRef.current && (
              <>
                <Box>
                  <Typography>Title</Typography>
                  <TextField
                    fullWidth
                    value={selectedTask.name}
                    onChange={(e) =>
                      setSelectedTask((prevState) => ({
                        ...prevState,
                        name: e.target.value,
                      }))
                    }
                  />
                </Box>
                <Box>
                  <Typography>Description</Typography>
                  <TextField
                    fullWidth
                    value={selectedTask.desc}
                    onChange={(e) =>
                      setSelectedTask((prevState) => ({
                        ...prevState,
                        desc: e.target.value,
                      }))
                    }
                  />
                </Box>
                <Box>
                  <Typography>Hot</Typography>
                  <Checkbox
                    checked={selectedTask.hot}
                    onChange={(e) =>
                      setSelectedTask((prevState) => ({
                        ...prevState,
                        hot: e.target.checked,
                      }))
                    }
                  />
                </Box>
                <Box>
                  <Typography>Priority</Typography>

                  <Select
                    size="small"
                    fullWidth
                    value={selectedTask.priority}
                    onChange={(e) =>
                      setSelectedTask((prevState) => ({
                        ...prevState,
                        priority: e.target.value,
                      }))
                    }
                  >
                    <MenuItem value="p1">P1</MenuItem>
                    <MenuItem value="p2">P2</MenuItem>
                    <MenuItem value="p3">P3</MenuItem>
                  </Select>
                </Box>
                <Box
                  display="flex"
                  justifyContent={"space-evenly"}
                  alignItems={"center"}
                  m={1}
                >
                  <Typography>Label</Typography>
                  {LabelList?.map((c, i) => (
                    <ColorLabelsStyle
                      index={c.id}
                      color={c?.color}
                      selectedLable={
                        selectedTask.label_color === c.color && c.id
                      }
                      setSelectedLablel={() =>
                        setSelectedTask((prevState) => ({
                          ...prevState,
                          label_color: c.color,
                        }))
                      }
                    />
                  ))}
                </Box>
              </>
            )}
          </Box>
          <Button variant="contained" onClick={handelUpdate}>
            Update
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Task;
