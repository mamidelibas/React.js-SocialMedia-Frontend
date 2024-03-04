import Header from "./components/Header";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MailIcon from "@mui/icons-material/Mail";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useEffect, useState } from "react";
import UserContent from "./components/UserContent";
import UserFollowers from "./components/UserFollowers";
import UserFollowing from "./components/UserFollowing";
import { usePathname } from "next/navigation";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";

export default function UserPage() {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("contents");
  const pathname = usePathname();
  const [user, setUser] = useState([]);
  const currentUser = useSelector((state) => state.user).user;

  const getUserData = async () => {
    const userApi = "http://localhost:3000/users" + pathname;
    axios
      .get(userApi)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setUser(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (pathname) {
      getUserData();
    }
  }, [pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <CircularProgress />
        </div>
      ) : (
        <>
          <Header
            userData={user}
            currentUser={currentUser}
            getUserData={getUserData}
          />

          <div className="flex p-10 gap-10">
            <div className="flex flex-col w-1/5 bg-gray-100 rounded px-3 py-4">
              <h2 className="text-2xl text-purple-700 font-bold">About</h2>
              <div className="flex flex-col">
                <div
                  className="flex items-center w-full gap-5 p-5 pl-0"
                  style={{
                    borderBottom: "1px solid #e5e5e5",
                  }}
                >
                  <PersonIcon
                    className="text-purple-700"
                    style={{
                      fontSize: "1.8rem",
                    }}
                  />
                  <h4>
                    {user.name} {user.lastname}
                  </h4>
                </div>

                <div
                  className="flex items-center w-full gap-5 p-5 pl-0"
                  style={{
                    borderBottom: "1px solid #e5e5e5",
                  }}
                >
                  <GroupIcon
                    className="text-purple-700"
                    style={{
                      fontSize: "1.8rem",
                    }}
                  />
                  <h4>{user?.userFollowers?.length || 0} Followers</h4>
                </div>

                <div
                  className="flex items-center w-full gap-5 p-5 pl-0"
                  style={{
                    borderBottom: "1px solid #e5e5e5",
                  }}
                >
                  <PersonAddIcon
                    className="text-purple-700"
                    style={{
                      fontSize: "1.8rem",
                    }}
                  />
                  <h4>{user?.following?.length} Following</h4>
                </div>

                <div className="flex items-center w-full gap-5 p-5 pl-0">
                  <MailIcon
                    className="text-purple-700"
                    style={{
                      fontSize: "1.8rem",
                    }}
                  />
                  <h4>{user.email}</h4>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-10 w-4/5 bg-gray-100 rounded px-3 py-4">
              <div className="w-full">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="secondary tabs example"
                >
                  <Tab value="contents" label="Contents" />
                  <Tab value="followers" label="Followers" />
                  <Tab value="following" label="Following" />
                </Tabs>
              </div>

              <div className="w-full">
                {value === "contents" && (
                  <UserContent
                    contentData={user.publications}
                    userData={user}
                    getUserData={getUserData}
                    currentUser={currentUser}
                  />
                )}

                {value === "followers" && (
                  <UserFollowers followers={user.userFollowers} />
                )}

                {value === "following" && (
                  <UserFollowing following={user.following} />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
