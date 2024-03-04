// UserMenu.js
import React from "react";
import { Menu, MenuItem, ListItemIcon, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/slices/authSlice";

const UserMenu = ({ anchorEl, handleClose }) => {
  const dispatch = useDispatch();

  const handleProfile = () => {

    handleClose();
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };

  return (
    <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          '& .MuiPaper-root': { 
            width: 200, 
            marginLeft: '-16px', 
            marginTop: '20px', 
          }
        }}
      >
      <MenuItem onClick={handleProfile}>
        <ListItemIcon>
          <PersonIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit">Mon profil</Typography>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <ExitToAppIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit">Déconnexion</Typography>
      </MenuItem>
    </Menu>
  );
};

export default UserMenu;
