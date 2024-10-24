import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Bedtime, LightMode } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { IconApp } from "../assets/icons/Icons";

interface NavbarProps {
  mode: "light" | "dark";
  toggleMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ mode, toggleMode }) => {
  const theme = useTheme();
  return (
    <AppBar
      position="static"
      style={{ backgroundColor: theme.palette.primary.main }}
    >
      <Toolbar color="primary">
        <IconApp />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 1 }}>
          Gestión de Tareas
        </Typography>
        <IconButton sx={{ ml: 1 }} onClick={toggleMode} color="inherit">
          {mode === "light" ? <Bedtime /> : <LightMode />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
