import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  createTheme,
  ThemeProvider,
  CssBaseline,
  CircularProgress,
  Box,
  Button,
  Alert,
  Snackbar,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import { blue, grey } from "@mui/material/colors";
import { TASKS_PER_PAGE, useTaskStore } from "./store/task";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  const [mode, setMode] = useState<"dark" | "light">(() => {
    const storedTheme = localStorage.getItem("theme");
    const value: "dark" | "light" = storedTheme
      ? storedTheme === "light"
        ? "light"
        : "dark"
      : "light";
    return value;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
    "all"
  );

  const {
    tasks,
    addTask,
    completeTask,
    deleteTask,
    fetchTasks,
    currentPage,
    setCurrentPage,
    loading,
    error,
    clearError,
  } = useTaskStore((state) => state);

  const theme = createTheme({
    palette: {
      mode: mode,
      ...(mode === "light"
        ? {
            primary: blue,
            secondary: { main: grey[600] },
            background: {
              default: grey[100],
              paper: grey[200],
            },
            text: {
              primary: grey[900],
              secondary: grey[700],
            },
          }
        : {
            primary: blue,
            secondary: { main: grey[600] },
            background: {
              default: grey[900],
              paper: grey[800],
            },
            text: {
              primary: "#ffffff",
              secondary: grey[700],
            },
          }),
    },
  });

  const toggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    localStorage.setItem("theme", newMode);
    setMode(newMode);
  };

  useEffect(() => {
    if (tasks.length === 0) fetchTasks();
  }, [fetchTasks]);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(tasks.length / TASKS_PER_PAGE)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    clearError();
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  const searchedTasks = filteredTasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * TASKS_PER_PAGE;
  const endIndex = startIndex + TASKS_PER_PAGE;
  const currentTasks = searchedTasks.slice(startIndex, endIndex);

  return (
    <ThemeProvider theme={theme} defaultMode="light">
      <CssBaseline />
      <Navbar mode={mode} toggleMode={toggleMode} />
      {loading && (
        <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
          <CircularProgress />
        </Container>
      )}
      <Container
        maxWidth="sm"
        style={{
          marginTop: "0.8rem",
        }}
      >
        <Paper
          elevation={1}
          style={{
            padding: "0.4rem",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "space-around",
            gap: "10px",
          }}
        >
          <TextField
            label="Buscar tarea"
            variant="outlined"
            fullWidth
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              "& .MuiInputLabel-root": {
                color: theme.palette.text.primary,
              },
            }}
          />
          <FormControl fullWidth>
            <Select
              labelId="filter-label"
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value as "all" | "completed" | "incomplete")
              }
              size="small"
            >
              <MenuItem value="all">Todas</MenuItem>
              <MenuItem value="completed">Completadas</MenuItem>
              <MenuItem value="incomplete">Incompletas</MenuItem>
            </Select>
          </FormControl>
        </Paper>
      </Container>
      <Container maxWidth="lg" style={{ marginTop: "0.8rem" }}>
        <Paper elevation={3} style={{ padding: "1rem", borderRadius: "8px" }}>
          <AddTaskForm addTask={addTask} />
          <TaskList
            tasks={currentTasks}
            completeTask={completeTask}
            deleteTask={deleteTask}
          />
          <Box display="flex" justifyContent="space-between" sx={{ mt: 1 }}>
            <Button
              variant="contained"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 1 }}>
              {currentPage} de{" "}
              {Math.ceil(searchedTasks.length / TASKS_PER_PAGE)}
            </Typography>
            <Button
              variant="contained"
              onClick={handleNextPage}
              disabled={
                currentPage === Math.ceil(searchedTasks.length / TASKS_PER_PAGE)
              }
            >
              Siguiente
            </Button>
          </Box>
        </Paper>

        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
};

export default App;
