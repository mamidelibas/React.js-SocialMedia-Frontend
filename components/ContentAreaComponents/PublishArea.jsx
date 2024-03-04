import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookie from "js-cookie";
import { youtubeParser } from "@/utils/youtubeUrlParser";

export default function PublishArea() {
  const [inputValue, setInputValue] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const [embedVideo, setEmbedVideo] = useState({
    url: "",
    show: false,
  });

  const handleImageChange = (event) => {
    if (!event) return setSelectedImage(null);
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const publishPost = () => {
    /*   

  const requestBody = {
      content: inputValue,
      image: selectedImage
    } 
    
  */

    const formData = new FormData();
    formData.append("content", inputValue);
    formData.append("image", selectedImage);
    formData.append("embedVideo", youtubeParser(embedVideo.url));

    axios
      .post("http://localhost:3000/publications/publish", formData, {
        headers: {
          Authorization: `Bearer ${Cookie.get("user_token")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setInputValue("");
          setEmbedVideo({
            url: "",
            show: false,
          });
          handleImageChange(null);
          dispatch({
            type: "REFETCH_CONTENT",
            payload: true,
          });
        }
      });
  };

  return (
    <>
      <div className="border-2 rounded-lg">
        <div className="p-3">
          <input
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="What are you publish?"
            className="w-full py-3 px-2 bg-transparent border-2 rounded-lg"
          />

          {embedVideo.show && (
            <input
              type="text"
              value={embedVideo.url}
              onChange={(event) =>
                setEmbedVideo({
                  ...embedVideo,
                  url: event.target.value,
                })
              }
              placeholder="Paste a YouTube link"
              className="w-full py-3 px-2 mt-4 bg-transparent border-2 rounded-lg"
            />
          )}
        </div>

        <div className="flex md:flex-row flex-col md:gap-0 gap-5 justify-between p-3 items-center border-t-2">
          <div className="flex gap-5">
            <label htmlFor="image-input">
              <PhotoOutlinedIcon
                style={{
                  color: "#B0B0B0",
                  fontSize: "1.7rem",
                  cursor: "pointer",
                }}
              />
            </label>

            <input
              type="file"
              id="image-input"
              accept="image/*"
              onChange={(event) => {
                handleImageChange(event);
              }}
              style={{ display: "none" }}
            />

            <VideocamOutlinedIcon
              style={{
                color: "#B0B0B0",
                fontSize: "1.7rem",
              }}
            />
            <InsertLinkOutlinedIcon
              onClick={() => {
                setEmbedVideo({
                  url: "",
                  show: !embedVideo.show,
                });
              }}
              style={{
                color: "#B0B0B0",
                fontSize: "1.7rem",
                cursor: "pointer",
              }}
            />

            <span className="text-gray-800 italic">
              {selectedImage && selectedImage?.name}
            </span>
            {selectedImage && (
              <button
                className="text-rose-500"
                onClick={() => {
                  handleImageChange(null);
                }}
              >
                X
              </button>
            )}
          </div>

          <div>
            <button className="border-2 px-4 py-1 rounded-full mr-3">
              Draft
            </button>
            <button
              className="bg-rose-500 px-4 py-1 rounded-full text-white"
              onClick={() => publishPost()}
            >
              Post Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
