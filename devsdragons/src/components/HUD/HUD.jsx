import { useState } from 'react'; 
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from '@mui/material';  // MUI components for layout and buttons
import { Home, AccountCircle, Settings, ListAlt, AddCircleOutline, Groups, Face } from '@mui/icons-material';  // MUI icons for visuals
import { Link } from 'react-router-dom';  // Link from React Router to enable navigation between pages


const HUD = () => {

  
  const [anchorEl, setAnchorEl] = useState(null);  // anchorEl refers to the element that opens the menu
  const isMenuOpen = Boolean(anchorEl);  // Boolean state to check if the menu is open

  // Function to open the menu, triggered when the user clicks on the account icon
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);

  // Function to close the menu
  const handleMenuClose = () => setAnchorEl(null);

  // JSX that defines the structure of the HUD
  return (
    // AppBar is a Material UI component that represents a bar at the top of the page
    <AppBar position="fixed" sx={{ top: 0, bottom: 'auto' }}>  {/* 'fixed' keeps the bar fixed at the top */}
      {/* Toolbar is a container that helps align content inside the AppBar */}
      <Toolbar sx={{ justifyContent: 'space-between' }}>  {/* 'justifyContent: space-between' spreads out the icons evenly */}
        
        {/* IconButton is a clickable button with an icon; 'Link' allows navigation without reloading the page */}
        <IconButton component={Link} to="/" color="inherit">  {/* Links to the Home page */}
          <Home />  {/* MUI icon for Home */}
          <Typography variant="caption">Home</Typography>  {/* 'Typography' adds text next to the icon */}
        </IconButton>

        {/* Icon for navigating to the avatar page */}
        <IconButton component={Link} to="/avatar" color="inherit">  {/* Links to the Quests page */}
          <Face />  
          <Typography variant="caption">Avatar</Typography>  
        </IconButton>

        {/* Icon for navigating to the guilds page */}
        <IconButton component={Link} to="/guilds" color="inherit">  
          <Groups />  
          <Typography variant="caption">Guilds</Typography> 
        </IconButton>

        {/* Icon for navigating to the create quests page */}
        <IconButton component={Link} to="/create-quests" color="inherit">  
          <AddCircleOutline />  
          <Typography variant="caption">Create Quests</Typography>  
        </IconButton>

        {/* Icon for navigating to the 'My Quests' page */}
        <IconButton component={Link} to="/my-quests" color="inherit">  
          <ListAlt />  
          <Typography variant="caption">My Quests</Typography>  
        </IconButton>

        {/* Account icon with a dropdown menu that leads AccountPage and SettingsPage*/}
        <IconButton onClick={handleMenuOpen} color="inherit">  
          <AccountCircle />  
          <Typography variant="caption">Account</Typography>  
        </IconButton>

        {/* MUI's Menu component is the dropdown that appears when the user clicks the account icon */}
        <Menu
          anchorEl={anchorEl}  // The element that the menu is anchored to (the Account icon)
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}  // Where the menu starts (above and to the right of the icon)
          keepMounted  // Ensures the menu is kept in the DOM even when not displayed, for performance optimization 
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}  // Where the menu aligns itself after opening 
          open={isMenuOpen}  // Boolean state to check if the menu should be open 
          onClose={handleMenuClose}  // Function to close the menu when user clicks out of it
        >
          {/* Each MenuItem is an option in the dropdown menu */}
          <MenuItem component={Link} to="/settings" onClick={handleMenuClose}>  {/* Links to the Settings page */}
            <Settings fontSize="small" />                                       {/* MUI icon for settings */}
            Settings                                                            {/* Text for the settings option */}
          </MenuItem>
          <MenuItem component={Link} to="/account" onClick={handleMenuClose}>   {/* Links to the Account page */}
            <AccountCircle fontSize="small" />                                  {/* MUI icon for account */}
            Account                                                             {/* Text for the account option */}
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default HUD