// src/components/Layout.tsx
import React, { useState } from "react";
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
  Paper,
  AppBar,
  Toolbar,
  InputBase,
  IconButton,
  Badge,
  Container,
  TextField,
  InputAdornment,
} from "@mui/material";

import FolderCopyRoundedIcon from "@mui/icons-material/FolderCopyRounded";

import AssignmentIcon from '@mui/icons-material/Assignment';
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SearchIcon from "@mui/icons-material/SearchRounded";
import StarIcon  from "@mui/icons-material/Star";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";

import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import LogoTwoLines from "../../components/common/LogoTwoLines";
import UserMenu from "../../components/common/menu/UserMenu";


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
    icon: <StarIcon />,
  },
  {
    label: "Mes fiches",
    route: "/sheets",
    icon: <AssignmentIcon />,
  },
  {
    label: "Mes documents",
    route: "/documents",
    icon: <FolderCopyRoundedIcon />,
  },
];

const Layout = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const location = useLocation();

  const isSelected = (item:any): boolean => {
    return location.pathname.includes(item.route);
  };

  const selected = (): any => {
    const [foundItem] = navItems.filter((c) =>
      location.pathname.includes(c.route)
    );
    return foundItem;
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
          backgroundColor: "primary",
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
          paddingTop="14%"
          sx={(theme) => ({ backgroundColor: theme.palette.primary.main })}
        >
          <LogoTwoLines />
          <Divider sx={{ height: "15%" }} />
          <List sx={{ width: "100%" }}>
            {navItems.map((item) => {
              return (
                <ListItemButton
                  key={item.route}
                  onClick={() => {
                    navigate(item.route);
                  }}
                  selected={isSelected(item)}
                  sx={{
                    color: "common.white",
                    justifyContent: "end",
                    marginRight: "10%",
                    paddingLeft: 10,
                    "&:hover":{
                      backgroundColor: "success.main"
                    },
                    "& .MuiListItemIcon-root": {
                      color: "common.white",
                    },
                    "&.Mui-selected": {
                      bgcolor: "common.white",
                      color: "primary.main",
                      "& .MuiListItemIcon-root": {
                        color: "primary.main",
                      },
                      "&:hover":{
                        backgroundColor: 'common.white'
                      }
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              );
            })}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="xl">
          <Box marginBottom="5%" marginTop="3%">
          <Toolbar disableGutters sx={{ paddingLeft: "0px" }}>
  <Typography
    fontWeight="500"
    color="primary.main"
    flexGrow="1"
    variant="h4"
    gutterBottom
  >
    {selected()?.label}
  </Typography>

  <Box color='primary.main' sx={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}> 
  <TextField
    fullWidth
    name="globalSearch"
    placeholder="Rechercher ..."
    id="globalSearch"
    variant="standard"
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <SearchIcon  />
        </InputAdornment>
      ),
    }}
    sx = {{
     marginRight: "5%"
    }}
  />
    <IconButton
        aria-label="compte utilisateur"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <PersonIcon />
      </IconButton>
      <UserMenu anchorEl={anchorEl} handleClose={handleClose} />
    <IconButton color="inherit" sx={{ mx: 1 }}> 
      <Badge badgeContent={4} color="success">
        <NotificationsIcon fontSize="large" />
      </Badge>
    </IconButton>
  </Box>
</Toolbar>
          </Box>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
