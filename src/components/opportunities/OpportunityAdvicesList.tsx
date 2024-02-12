import React from 'react';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Paper,
  Divider,
  IconButton
} from "@mui/material";
import WarningIcon from '@mui/icons-material/Warning';
import { ArrowDownward, ArrowRight, TipsAndUpdates } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const opportinityNotifications = [
  {
    id: 1,
    relatedOpportunityId: "1",
    type: "Warning",
    text: "L'opportunité chez 'CGI' au poste d'Analyste développeur n'a pas été mise à jour depuis plus de deux semaines. Pensez à relancer le recruteur.",
  },
  {
    id: 2,
    relatedOpportunityId: "2",
    type: "Advice",
    text: "Vous avez plus de 4 opportunités en cours. Pensez à prendre des notes pour ne pas vous emmêler les pinceaux.",
  },
  // ...autres notifications
];





const OpportunityAdvicesList = () => {

  const navigate = useNavigate();


  const handleNotificationClick = (notification) => {
    navigate(notification.relatedOpportunityId);
  }

  
const getIconForNotificationType = (notification) => {
  switch(notification.type){
    case "Warning": return  <WarningIcon color="info" />
    case "Advice": return <TipsAndUpdates color="info" />
    default: return <></>;
  }
}

  
  return (
  
    <Box sx={{ position: 'sticky', top: 0 }}>
      <List>
        {opportinityNotifications.map((notification) => (
          <>
          <ListItemButton onClick={() => handleNotificationClick(notification)} key={notification.id}
          >
            <ListItemIcon>
              {getIconForNotificationType(notification)}
            </ListItemIcon>
            <ListItemText primary={notification.text} />
          </ListItemButton>
          <Divider/>
          </>
        ))}
      </List>
    </Box>
 
  );
};

export default OpportunityAdvicesList;
