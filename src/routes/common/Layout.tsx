// src/components/Layout.tsx
import React from "react";
import {
  Box,
  Drawer,
  List,
  Typography,
  Divider,
  Button,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper
} from "@mui/material";
import FolderCopyRoundedIcon from "@mui/icons-material/FolderCopyRounded";
import JoinInnerRoundedIcon from "@mui/icons-material/JoinInnerRounded";
import NewspaperRoundedIcon from "@mui/icons-material/NewspaperRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";

const drawerWidth = "18%";
const navItems = [
  {
    label: "Mon Dashboard",
    route: "/dashboard",
    icon: <DashboardRoundedIcon />,
  },
  {
    label: "Mes opportunités",
    route: "/opportunities",
    icon: <JoinInnerRoundedIcon />,
  },
  {
    label: "Mes fiches",
    route: "/process-notes",
    icon: <NewspaperRoundedIcon />,
  },
  {
    label: "Mes documents",
    route: "/documents",
    icon: <FolderCopyRoundedIcon />,
  },
];
const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const location = useLocation();

  const isSelected = (item): boolean => {
    return location.pathname.includes(item.route);
  };
  const handleLogout = () => {
    dispatch(logout());
  };

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
          <Divider sx={{ height: "15%" }} />
          <List>
            {navItems.map((item) => {
              return (
                <ListItemButton
                  key={item.route}
                  onClick={() => {
                    navigate(item.route);
                  }}
                  selected={isSelected(item)}
                  sx={{
                    "&.Mui-selected": {
                      bgcolor: (theme) =>
                        `${theme.palette.primary.main}!important`, // Override the background color when selected
                      color: "white",
                      "& .MuiListItemIcon-root": {
                        color: "white", // Override the icon color when selected
                      },
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              );
            })}
          </List>
          <Divider />
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              bottom: 0,
              width: "100%",
              p: 2,
            }}
          >
            <Button onClick={handleLogout} variant="contained" color="primary">
              Se Déconnecter
            </Button>
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
