import Avatar from "@mui/material/Avatar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Cookie from "js-cookie";
import { useRouter } from "next/router";

export default function PopularProfileCard() {
  const currentUser = useSelector((state) => state.user);
  const [userData, setUserData] = useState([]);
  const router = useRouter();

  const getUserData = async () => {
    const response = await axios.get("http://localhost:3000/users/", {
      headers: {
        Authorization: `Bearer ${Cookie.get("user_token")}`,
      },
    });

    setUserData(response.data);
  };

  useEffect(() => {
    getUserData();
  }, []);

  //   http://localhost:3000/users/follow/12345     --> 12345 yerine takip edilecek kullanıcının ID'si gelir

  const userFollowOrUnfollow = async (id) => {
    const serviceUrl = `http://localhost:3000/users/follow/${id}`;
    const response = await axios.post(
      serviceUrl,
      {},
      {
        headers: {
          Authorization: `Bearer ${Cookie.get("user_token")}`,
        },
      }
    );

    if (response.status === 200) {
      getUserData();
    }
  };

  return (
    <>
      {userData?.users?.map((user) => {
        return (
          <div>
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-3">
                <Avatar alt="Remy Sharp" src={user.avatar} />
                <div>
                  <span
                    className="text-sm font-semibold cursor-pointer"
                    onClick={() => {
                      router.push("/" + user.username);
                    }}
                  >
                    @{user.username}
                  </span>
                  <div className="flex gap-1 text-gray-400">
                    <span>{user?.userFollowers?.length || 0} Followers</span>
                  </div>
                </div>
              </div>

              <div className="text-gray-400 text-sm">
                {user?.userFollowers.includes(currentUser.user._id) ? (
                  <button
                    className="bg-gray-400 text-white rounded-full px-3 py-1"
                    onClick={() => userFollowOrUnfollow(user._id)}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    className="bg-rose-500 text-white rounded-full px-3 py-1"
                    onClick={() => userFollowOrUnfollow(user._id)}
                  >
                    Follow
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
