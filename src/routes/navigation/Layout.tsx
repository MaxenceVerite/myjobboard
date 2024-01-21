// src/components/Layout.tsx
import React from "react";
import {
  Box,
  Drawer,
  List,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import FolderCopyRoundedIcon from "@mui/icons-material/FolderCopyRounded";
import JoinInnerRoundedIcon from "@mui/icons-material/JoinInnerRounded";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthState } from "../../store/slices/authSlice";

const drawerWidth = "18%";
const navItems = [
  {
    label: "Mon Dashboard",
    route: "/dashboard",
    icon: <DashboardRoundedIcon />,
  },
  {
    label: "Ma recherche d'opportunités",
    route: "/opportunities",
    icon: <JoinInnerRoundedIcon />,
  },
  {
    label: "Mes fiches process",
    route: "/process-notes",
    icon: <NewspaperRoundedIcon />,
  },
  {
    label: "Mon espace documents",
    route: "/documents",
    icon: <FolderCopyRoundedIcon />,
  },
];
const Layout = () => {
  const navigate = useNavigate();


  const handleLogin = ()=> {
    navigate("/login");
  }
  const user = useSelector((state: { auth: AuthState }) => state.auth.user);

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          height="100%"
        >
          <Typography variant="h6" noWrap component="div" sx={{ mt: "12%" }}>
            MyJobBoard
          </Typography>
          <Divider sx={{height: "15%"}} />
          <List>
            {navItems.map((item) => {
              return (
                <Button
                  onClick={() => {
                    navigate(item.route);
                  }}
                  startIcon={item.icon}
                  fullWidth
                >
                  {item.label}
                </Button>
              );
            })}
          </List>
          <Divider />
          <Box sx={{ position: "absolute", display:"flex", justifyContent:"center",  bottom: 0, width: "100%", p: 2 }}>
            {user ? (
              <Typography variant="body1" >Bonjour, <b>{user.name}</b></Typography>
            ) : (
              <Button onClick={handleLogin} endIcon={<PersonRoundedIcon/>} color="inherit" fullWidth>
                Se connecter
                
              </Button>
            )}
          </Box>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
     
    </Box>
  );
};

export default Layout;
