import Logo from "@/public/logo.png";
import { useState } from "react";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import MenuIcon from "@mui/icons-material/Menu";

export default function HeaderMobile() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <header className="flex justify-between items-center px-3 py-6 border-b-2 border-gray-200">
      <Image alt="logo" src={Logo} height={45} />

      <div className="flex items-center gap-3">
        <MenuIcon sx={{ fontSize: 28 }} onClick={() => setIsDrawerOpen(true)} />
      </div>

      {isDrawerOpen && (
        <div className="fixed z-50 top-0 left-0 bg-gray-200 w-full h-full p-6">
          <div className="flex justify-between items-center w-full">
            <h1>User Menu</h1>
            <span
              className="bg-gray-300 p-3 rounded"
              onClick={() => setIsDrawerOpen(false)}
            >
              X
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
