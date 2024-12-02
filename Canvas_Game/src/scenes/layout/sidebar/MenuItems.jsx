
import React from 'react';
import { Menu, MenuItem } from "react-pro-sidebar";
import { DashboardOutlined, GamepadTwoTone, PersonOutlined, AssignmentOutlined, StoreOutlined, HelpOutlineOutlined } from "@mui/icons-material";
import Item from "./Item";

const MenuItems = ({ colors }) => {
  return (
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
        colors={colors}
        icon={<DashboardOutlined />}
      />
      <Item
        title="Game"
        path="/game"
        colors={colors}
        icon={<GamepadTwoTone />}
      />
      <Item
        title="Profile"
        path="/userProfile"
        colors={colors}
        icon={<PersonOutlined />}
      />
      <Item
        title="Assignment"
        path="/assignment"
        colors={colors}
        icon={<AssignmentOutlined />}
      />
      <Item
        title="Store"
        path="/store"
        colors={colors}
        icon={<StoreOutlined />}
      />
      <Item
        title="Help"
        path="/help"
        colors={colors}
        icon={<HelpOutlineOutlined />}
      />
    </Menu>
  );
};

export default MenuItems;