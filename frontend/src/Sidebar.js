import React from 'react';
import { List, ListItem, ListItemText, Drawer, Typography } from '@mui/material';
import { styled } from '@mui/system';

const SidebarContainer = styled(Drawer)(({ theme }) => ({
  width: 250,
  padding: '20px 10px',
  backgroundColor: '#f4f4f4',
  '& .MuiListItem-root': {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#ddd',
    },
  },
}));

function Sidebar({ platforms, setSelectedPlatform }) {
  return (
    <SidebarContainer variant="permanent">
      <Typography variant="h6" sx={{ paddingBottom: '10px', fontWeight: 'bold' }}>
        Platforms
      </Typography>
      <List>
        {platforms.map(platform => (
          <ListItem key={platform} onClick={() => setSelectedPlatform(platform)}>
            <ListItemText primary={platform} />
          </ListItem>
        ))}
      </List>
    </SidebarContainer>
  );
}

export default Sidebar;