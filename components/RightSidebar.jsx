import { useEffect, useState } from "react";
import CardDesign from "./RightSidebarComponents/CardDesign";
import PopularProfileCard from "./RightSidebarComponents/popularProfileCard";
import TrendingPosts from "./RightSidebarComponents/TrendingPosts";
import axios from "axios";
import Cookie from "js-cookie";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import moment from "moment";

export default function RightSidebar() {
  const [allUsersModal, setAllUsersModal] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [sortMethod, setSortMethod] = useState("default");

  const getAllUsers = async () => {
    await axios
      .get("http://localhost:3000/users/all", {
        headers: {
          Authorization: `Bearer ${Cookie.get("user_token")}`,
        },
      })
      .then((response) => {
        setAllUsers(response.data.users);
        setAllUsersModal(true);
      });
  };

  /* 
  

  const users = [
    {
      name: "y",
      userFollowers: ["1"]
    },
    {
      name: "x",
      userFollowers: ["1", "2"]
    }
  ]
  const sortedNumber = numbers.sort((a, b) => b - a )
  */

  useEffect(() => {
    switch (sortMethod) {
      case "name":
        const sortedByName = [...allUsers].sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        );
        setAllUsers(sortedByName);
        break;
      case "follower":
        const sortedByFollowerCount = [...allUsers].sort((a, b) =>
          a.userFollowers.length > b.userFollowers.length ? -1 : 1
        );
        setAllUsers(sortedByFollowerCount);
        break;
      case "register":
        const sortedByRegisterDate = [...allUsers].sort((a, b) =>
          moment(a.createdAt).isBefore(b.createdAt) ? 1 : -1
        );
        setAllUsers(sortedByRegisterDate);
        break;
      default:
        break;
    }
  }, [sortMethod]);

  return (
    <div className="flex flex-col gap-10">
      <CardDesign
        cardTitle="Popular Profiles"
        cardActions={
          <button
            className="text-rose-500 font-bold text-md"
            onClick={() => {
              getAllUsers();
            }}
          >
            See All
          </button>
        }
        cardComponent={<PopularProfileCard />}
      />

      <CardDesign
        cardActions={
          <span className="text-rose-500 font-bold text-md">See All</span>
        }
        cardTitle="Trending Post"
        cardComponent={<TrendingPosts />}
      />

      <Modal
        open={allUsersModal}
        onClose={() => {
          setAllUsersModal(false);
        }}
      >
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            backgroundColor: "white",
            padding: 4,
            height: 500,
            overflow: "scroll",
          }}
        >
          <div className="p-5 flex flex-col gap-5">
            <h2 className="text-xl text-center">All Users List</h2>

            <div className="mb-10">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sortMethod}
                  label="Age"
                  onChange={(event) => {
                    setSortMethod(event.target.value);
                  }}
                >
                  <MenuItem value="default" disabled>
                    Sort User
                  </MenuItem>
                  <MenuItem value="name">Sort by name</MenuItem>
                  <MenuItem value="follower">Sort by follower count</MenuItem>
                  <MenuItem value="register">Sort by register date</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="flex flex-col gap-5">
              {allUsers?.map((user) => {
                return (
                  <div className="flex items-center gap-3">
                    <img
                      src="https://picsum.photos/300/300"
                      className="rounded-full w-10 h-10"
                    />

                    <div>
                      <h2>
                        {user.name} {user.lastname}
                      </h2>
                      <h4>{user?.userFollowers?.length || 0} followers</h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
