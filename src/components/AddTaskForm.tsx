import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { AddTaskFormProps } from "../types/type";
import { useTheme } from "@mui/material/styles";

const AddTaskForm: React.FC<AddTaskFormProps> = ({ addTask }) => {
  const [taskName, setTaskName] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const theme = useTheme();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!taskName) {
      setError(true);
      return;
    }
    setError(false);
    addTask({ id: Date.now(), title: taskName, completed: false });
    setTaskName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom="1rem"
      >
        <TextField
          label="Nueva Tarea..."
          variant="outlined"
          value={taskName}
          onChange={(e) => {
            if (error) setError(false);
            setTaskName(e.target.value);
          }}
          fullWidth
          error={error}
          helperText={error ? "La tarea no puede estar vacía" : ""}
          style={{ marginRight: "8px" }}
          sx={{
            "& .MuiInputLabel-root": {
              color: theme.palette.text.primary,
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ height: "56px" }}
        >
          Agregar
        </Button>
      </Box>
    </form>
  );
};

export default AddTaskForm;
