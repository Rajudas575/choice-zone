import React, { useState } from "react";
import { Drawer, IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useNavigate } from "react-router";

const Navbar = ({ DrawerList }: any) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  const navigate = useNavigate();
  return (
    <div className="h-[10vh] flexs-center px-5 border-b border-gray-300">
      <div className="flex items-center gap-3">
        <IconButton onClick={() => toggleDrawer(true)} color="primary">
          <Menu color="primary" />
        </IconButton>
        <h1
          onClick={() => navigate("/")}
          className="logo text-xl cursor-pointer">
          Choice Bazaar
        </h1>
      </div>
      <Drawer open={open} onClose={() => toggleDrawer(false)}>
        <DrawerList toggleDrawer={toggleDrawer} />
      </Drawer>
    </div>
  );
};

export default Navbar;
