import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

export default function Header({ userData, currentUser, getUserData }) {
  const router = useRouter();
  const followUser = async () => {
    const followApi = "http://localhost:3000/users/follow/" + userData._id;

    const response = await axios.post(
      followApi,
      {},
      {
        headers: {
          Authorization: "Bearer " + Cookie.get("user_token"),
        },
      }
    );

    if (response.status === 200) {
      getUserData();
    }
  };

  return (
    <>
      <div className="">
        <div className="relative">
          <button
            onClick={() => {
              router.push("/");
            }}
            className="absolute px-3 py-2 bg-purple-700 m-5 rounded-full border border-gray-500 flex items-center gap-3"
          >
            <ArrowBackIcon />
            <span>Back to Home</span>
          </button>

          <img
            src="https://picsum.photos/1200/250"
            className="rounded-b-xl w-full"
          />
          <div
            className="absolute"
            style={{
              top: "50%",
              left: "10%",
            }}
          >
            <img src="https://picsum.photos/250/250" className="rounded-full" />
          </div>
          <div className="flex justify-around items-center w-full p-10 pl-32">
            <div>
              <h2 className="text-3xl text-purple-700 font-bold">
                @{userData.username}
              </h2>
              <h4 className="text-purple-700">UI/UX Designer</h4>
            </div>
            <div>
              {userData.userFollowers.filter(
                (user) => user.username === currentUser.username
              )?.length > 0 ? (
                <button
                  className="bg-gray-500 text-white px-5 py-3 rounded-full"
                  onClick={() => {
                    followUser();
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  className={`text-white px-5 py-3 rounded-full ${
                    userData.username === currentUser.username
                      ? "bg-gray-300"
                      : "bg-purple-700"
                  }`}
                  disabled={currentUser.username === userData.username}
                  onClick={() => {
                    followUser();
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
