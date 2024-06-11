import React from 'react';
import { List, ListItem, ListItemText, Drawer, Typography } from '@mui/material';
import { styled } from '@mui/system';

const SidebarContainer = styled(Drawer)(({ theme }) => ({
  width: 200,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 200,
    boxSizing: 'border-box',
  },
}));

function Sidebar({ platforms, setSelectedPlatform }) {
  return (
    <SidebarContainer variant="permanent" anchor="left">
      <Typography variant="h6" sx={{ paddingBottom: '10px', fontWeight: 'bold', paddingLeft: '10px', paddingTop: '10px' }}>
        Platforms
      </Typography>
      <List>
        {platforms.map(platform => (
          <ListItem button key={platform} onClick={() => setSelectedPlatform(platform)}>
            <ListItemText primary={platform} />
          </ListItem>
        ))}
      </List>
    </SidebarContainer>
  );
}

export default Sidebar;