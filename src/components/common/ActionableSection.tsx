import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Collapse,
  Grid,
  TextField,
  InputAdornment,
  ListItem,
  Chip,
} from "@mui/material";
import {
  Tune,
  Search,
  ExpandLess,
  ExpandMore,
  AddBox,
  Close,
  FilterAlt,
} from "@mui/icons-material";

interface ActionableSectionProps {
  sectionTitle: string;
  isExpanded?: boolean;
  children: React.ReactNode;
  onSearch?: (searchText: string) => void;
  onFilter?: () => void;
  onAddElement?: () => void;
}


interface CollectionFilter{

  propertyName: string,
  value: string
}

const ActionableSection = ({
  sectionTitle,
  isExpanded,
  children,
  onSearch,
  onFilter,
  onAddElement,
}: ActionableSectionProps) => {
  const [localIsExpanded, setLocalIsExpanded] = useState(isExpanded ?? false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState<CollectionFilter[]>([])


  
  const handleExpandClick = () => {
    setLocalIsExpanded(!localIsExpanded);
  };

  const handleSearchIconClick = () => {
    setIsSearchBarOpen(!isSearchBarOpen);
    setLocalIsExpanded(true);
  };

  const handleSearch = (e) => {
    if (onSearch) onSearch(searchText);
    setLocalIsExpanded(true);
  };

  const handleFilter = (e) => {
    if(onFilter) onFilter();
    setLocalIsExpanded(true);
  }

  const handleAdd =(e) => {
    if(onAddElement) onAddElement();
    setLocalIsExpanded(true);
  }

  return (
    <>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            color="info.main"
            fontWeight={500}
            variant="h5"
            flexGrow={1}
          >
            {sectionTitle}
          </Typography>
          <Box>
            {onSearch && (
              <>
                {isSearchBarOpen && (
                  <TextField
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    variant="standard"
                    size="small"
                    sx={{ marginRight: 3 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Search onClick={handleSearch} />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
                <IconButton onClick={handleSearchIconClick}>
                  {isSearchBarOpen ? <Close color="primary" /> : <Search  />}
                </IconButton>
              </>
            )}
            {onFilter && (
              <IconButton onClick={handleFilter}>
                <Tune color={filters && filters.length > 0? "primary" : undefined} />
              </IconButton>
            )}
            {onAddElement && (
              <IconButton onClick={handleAdd}>
                <AddBox />
              </IconButton>
            )}
            <IconButton onClick={handleExpandClick}>
              {localIsExpanded ? (
                <ExpandLess />
              ) : (
                <ExpandMore color="primary" />
              )}
            </IconButton>
          </Box>
        </Box>
      </Grid>
      <Collapse
        sx={{ width: "100%" }}
        in={localIsExpanded}
        timeout="auto"
        unmountOnExit
      >
        {(searchText || (filters && filters.length > 0))
        && (
        <Box>
        <ListItem>
          {searchText 
          &&

          <Chip
              icon={<Search/>}
              color="primary"
              label={searchText}
              onDelete={() => setSearchText('')}
              sx={{marginX: 1}}
            />

          }
           {filters  &&

            filters.map(
              (item) => 
              
                <Chip
                icon={<FilterAlt/>}
                label={item.value}
                onDelete={(e) => setFilters(filters.filter(c => c.propertyName != item.propertyName))}
                sx={{marginX: 1}}              />
              
            )
         
           
           }
           
          </ListItem>     
        </Box>
        )
      }
       
        {children}
      </Collapse>
    </>
  );
};

export default ActionableSection;
