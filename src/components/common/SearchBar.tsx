import React, { FC, ReactElement } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';



const SearchBar = ({placeholder, onSearch}) => {

  const handleSearch = (e) => {
    onSearch(e.target.value)
  }

  return (
    <Paper
      component="form"
      elevation={2}
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder= {placeholder?? "Entrez votre recherche ici"}
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton onClick={handleSearch} type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchBar;