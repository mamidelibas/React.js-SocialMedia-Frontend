import Logo from "@/public/logo.png";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";

export default function Header({ user }) {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  return (
    <header className="flex justify-between px-7 py-6 border-b-2 border-gray-200">
      <Image alt="logo" src={Logo} height={55} />
      <TextField
        id="outlined-basic"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          dispatch({
            type: "SET_SEARCH",
            payload: e.target.value,
          });
        }}
        placeholder="Search now..."
        sx={{
          width: "750px",
          borderRadius: "500px",
        }}
        InputProps={{
          style: {
            borderRadius: "1000px",
          },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <div className="flex items-center gap-3">
        <HeadsetMicIcon
          sx={{
            fontSize: 42,
            color: "#374151",
            border: "1px solid #e5e7eb",
            padding: "5px",
            borderRadius: "50%",
          }}
        />
        <NotificationsIcon
          sx={{
            fontSize: 42,
            color: "#374151",
            border: "1px solid #e5e7eb",
            padding: "5px",
            borderRadius: "50%",
          }}
        />

        <Link
          href={`/${user?.user?.username}`}
          className="flex items-center gap-2"
        >
          <span className="text-xl font-bold ml-7">
            {user?.user?.name + " " + user?.user?.lastname}
          </span>
          <Avatar sx={{ bgcolor: deepPurple[500] }}>
            {user?.user?.name[0]}
            {user?.user?.lastname[0]}
          </Avatar>
        </Link>

        <ExpandMoreIcon sx={{ fontSize: 28 }} />
      </div>
    </header>
  );
}
