import Avatar from "@mui/material/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Cookie from "js-cookie";
import { useRouter } from "next/router";

export default function PostCard({
  avatar,
  fullname,
  username,
  createdOn,
  content,
  commentCount,
  likes,
  contentId,
  image,
  embedVideo,
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const currentUser = useSelector((state) => state.user);

  const likeContent = async (contentId) => {
    const serviceUrl = "http://localhost:3000/publications/action/" + contentId;
    axios
      .post(
        serviceUrl,
        {
          action: "like",
        },
        {
          headers: {
            Authorization: `Bearer ${Cookie.get("user_token")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: "REFETCH_CONTENT",
            payload: true,
          });
        }
      });
  };

  return (
    <>
      <div className="mt-10 flex flex-col gap-5 pb-10 border-b-2">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <Avatar alt="Remy Sharp" src={avatar} />
            <div>
              <span
                className="text-lg font-semibold cursor-pointer"
                onClick={() => {
                  router.push("/" + username);
                }}
              >
                {fullname}
              </span>
              <div className="flex gap-1 text-gray-400">
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    router.push("/" + username);
                  }}
                >
                  @{username}
                </span>
                <span>•</span>
                <span>{createdOn}</span>
              </div>
            </div>
          </div>

          <div className="text-gray-400">
            <MoreVertIcon />
          </div>
        </div>

        {image && image?.length > 0 && (
          <div className="flex justify-center">
            <img
              src={process.env.NEXT_PUBLIC_CDN_URL + image}
              alt="content"
              className="w-full rounded-lg"
            />
          </div>
        )}

        {embedVideo && (
          <iframe
            width="966"
            height="543"
            className="rounded-lg"
            src={"https://www.youtube.com/embed/" + embedVideo}
            title="KALT&#39;ın Podcast&#39;i - Sizin İçin Size Rağmen"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        )}

        <div>
          <p>{content}</p>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-10">
            {likes?.includes(currentUser.user._id) ? (
              <button
                className="text-rose-500"
                onClick={() => likeContent(contentId)}
              >
                <FavoriteIcon />
                <span className="ml-2">{likes?.length || 0}</span>
              </button>
            ) : (
              <button
                className="text-rose-500"
                onClick={() => likeContent(contentId)}
              >
                <FavoriteBorderIcon />
                <span className="ml-2">{likes?.length || 0}</span>
              </button>
            )}

            <div className="text-gray-400">
              <TextsmsOutlinedIcon />
              <span className="ml-2">{commentCount}</span>
            </div>
          </div>
          <div className="text-gray-400">
            <SendOutlinedIcon />
            <span className="ml-2">Share</span>
          </div>
        </div>
      </div>
    </>
  );
}
