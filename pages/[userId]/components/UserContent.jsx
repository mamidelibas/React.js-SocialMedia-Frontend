import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import Image from "next/image";
import { dateFormatter } from "@/utils/dateFormatter";
import axios from "axios";

export default function UserContent({
  contentData,
  userData,
  getUserData,
  currentUser,
}) {
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
            Authorization: "Bearer " + Cookie.get("user_token"),
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          getUserData();
        }
      });
  };

  return (
    <>
      <h2 className="py-3 text-xl font-bold">
        Total Contents: {contentData?.length || 0}
      </h2>
      <div className="flex flex-col gap-5">
        {contentData.map((content) => {
          return (
            <Card variant="outlined">
              <CardHeader
                avatar={<Avatar aria-label="recipe">{userData.name[0]}</Avatar>}
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={userData.name + " " + userData.lastname}
                subheader={dateFormatter(content.createdAt)}
              />
              <CardContent>
                <Image
                  alt="avatar"
                  src="https://picsum.photos/1200/250"
                  height={250}
                  width={1200}
                  className="w-full my-5 rounded"
                />
                <Typography variant="body2" color="text.secondary">
                  {content.content}
                </Typography>
              </CardContent>
              <CardActions className="flex items-center gap-10 text-xl">
                {content?.likes?.includes(currentUser._id) ? (
                  <button
                    className="text-red-500 flex items-center gap-3"
                    onClick={() => {
                      likeContent(content._id);
                    }}
                  >
                    <FavoriteIcon />
                    <span>{content?.likes?.length || 0}</span>
                  </button>
                ) : (
                  <button
                    className="text-gray-500 flex items-center gap-3"
                    onClick={() => {
                      likeContent(content._id);
                    }}
                  >
                    <FavoriteBorderIcon />
                    <span>{content?.likes?.length || 0}</span>
                  </button>
                )}

                <button className="text-blue-400 flex items-center gap-3">
                  <ModeCommentIcon />
                  <span>0</span>
                </button>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </>
  );
}
