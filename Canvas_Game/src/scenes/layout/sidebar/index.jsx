/* eslint-disable react/prop-types */
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import React from 'react';
import { useContext, useState, useEffect } from "react";
import { tokens } from "../../../theme";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import {
  // AssignmentIndOutlined,
  AssignmentOutlined,
  // BarChartOutlined,
  // CalendarTodayOutlined,
  // ContactsOutlined,
  DashboardOutlined,
  // DonutLargeOutlined,
  // GamepadOutlined,
  // GamepadRounded,
  // GamepadSharp,
  GamepadTwoTone,
  HelpOutlineOutlined,
  //MapOutlined,
  MenuOutlined,
  //PeopleAltOutlined,
  PersonOutlined,
  // ReceiptOutlined,
  // Shop2Outlined,
  // ShopOutlined,
  StoreOutlined,
  // TimelineOutlined,
  // WavesOutlined,
} from "@mui/icons-material";
import avatar from "../../../assets/avatar.webp";
import logo from "../../../assets/WizardLogo.png";
import Item from "./Item";
import { ToggledContext } from "../../../App";

const SideBar = ({email}) => {
  const { toggled, setToggled } = useContext(ToggledContext) || {}; // Ensure context is not null
  const [collapsed, setCollapsed] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [profile, setProfile] = useState({ 
      name: "Loading...",   
      nickname: "", 
      picture_url: "" 
    });
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/user?email=${email}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setProfile({
            name: data.name || "Unknown User",
            last_name: data.last_name || "Unknown Last Name",
            nickname: data.nickname || "No Nickname",
            picture_url: data.picture_url || "",

          });
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      };
  
      if (email) {
        fetchUserData();
      }
    }, [email]);

  return (
    <Sidebar
      backgroundColor={colors.greenAccent[600]}
      rootStyles={{
        border: 0,
        height: "100%",
      }}
      collapsed={collapsed}
      onBackdropClick={() => setToggled && setToggled(false)} // Ensure setToggled is defined
      toggled={toggled}
      breakPoint="md"
    >
      <Menu
        menuItemStyles={{
          button: { ":hover": { background: "transparent" } },
        }}
      >
        <MenuItem
          rootStyles={{
            margin: "10px 0 20px 0",
            color: colors.primary[100],
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                alignItems="center"
                gap="12px"
                sx={{ transition: ".3s ease" }}
              >
                <img
                  style={{ width: "30px", height: "30px", borderRadius: "8px" }}
                  src={logo}
                  alt="Argon"
                />
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  textTransform="capitalize"
                  color={colors.primary[100]}
                >
                  Canvas Quest
                </Typography>
              </Box>
            )}
            <IconButton onClick={() => setCollapsed(!collapsed)}>
              <MenuOutlined />
            </IconButton>
          </Box>
        </MenuItem>
      </Menu>
      {!collapsed && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            mb: "25px",
          }}
        >
          <Avatar
            alt="avatar"
            src={profile.picture_url || "/path/to/default/avatar.jpg"}
            // src={avatar}
            sx={{ width: "100px", height: "100px" }}
          />
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h3" fontWeight="bold" color={colors.primary[100]}>
            {profile.name} {profile.last_name}
            </Typography>
            <Typography
              variant="h6"
              fontWeight="500"
              color={colors.primary[100]}
            >
              {profile.nickname}
            </Typography>
          </Box>
        </Box>
      )}

      <Box mb={5} pl={collapsed ? undefined : "5%"}>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Dashboard"
            path="/"
            colors={colors.primary[100]}
            icon={<DashboardOutlined />}
          />
        </Menu>
        {/* <Typography
          variant="h6"
          color={colors.gray[900]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {!collapsed ? "Data" : " "}
        </Typography>{" "} */}
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Game"
            path="/game"
            colors={colors.primary[100]}
            icon={<GamepadTwoTone />}
          />
          <Item
            title="Profile"
            path="/userProfile"
            colors={colors.primary[100]}
            icon={<PersonOutlined />}
          />
          <Item
            title="Assignment"
            path="/AssignmentsPage"
            colors={colors.primary[100]}
            icon={<AssignmentOutlined />}
          />
          <Item
            title="Store"
            path="/store"
            colors={colors.primary[100]}
            icon={<StoreOutlined />}
          />
          <Item
            title="Help"
            path="/help"
            colors={colors.primary[100]}
            icon={<HelpOutlineOutlined />}
          />
        </Menu>
        {/* <Typography
          variant="h6"
          color={colors.gray[900]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {!collapsed ? "Pages" : " "}
        </Typography>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Profile Form"
            path="/form"
            colors={colors}
            icon={<PersonOutlined />}
          />
          <Item
            title="Calendar"
            path="/calendar"
            colors={colors}
            icon={<CalendarTodayOutlined />}
          />
          <Item
            title="FAQ Page"
            path="/faq"
            colors={colors}
            icon={<HelpOutlineOutlined />}
          />
        </Menu>
        <Typography
          variant="h6"
          color={colors.gray[300]}
          sx={{ m: "15px 0 5px 20px" }}
        >
          {!collapsed ? "Charts" : " "}
        </Typography>
        <Menu
          menuItemStyles={{
            button: {
              ":hover": {
                color: "#868dfb",
                background: "transparent",
                transition: ".4s ease",
              },
            },
          }}
        >
          <Item
            title="Bar Chart"
            path="/bar"
            colors={colors}
            icon={<BarChartOutlined />}
          />
          <Item
            title="Pie Chart"
            path="/pie"
            colors={colors}
            icon={<DonutLargeOutlined />}
          />
          <Item
            title="Line Chart"
            path="/line"
            colors={colors}
            icon={<TimelineOutlined />}
          />
          <Item
            title="Geography Chart"
            path="/geography"
            colors={colors}
            icon={<MapOutlined />}
          />
          <Item
            title="Stream Chart"
            path="/stream"
            colors={colors}
            icon={<WavesOutlined />}
          />
        </Menu> */}
      </Box>
    </Sidebar>
  );
};

export default SideBar;
