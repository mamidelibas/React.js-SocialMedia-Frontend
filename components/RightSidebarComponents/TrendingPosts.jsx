import axios from "axios";
import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import Avatar from "@mui/material/Avatar";
import { dateFormatter } from "@/utils/dateFormatter";
import { useRouter } from "next/router";

export default function TrendingPosts() {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const router = useRouter();
  useEffect(() => {
    axios
      .get("http://localhost:3000/publications/popular", {
        headers: {
          Authorization: `Bearer ${Cookie.get("user_token")}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setTrendingPosts(response.data);
        }
      });
  }, []);

  return (
    <>
      <div className="flex flex-col gap-8">
        {trendingPosts?.publications?.map((content) => {
          return (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Avatar>C</Avatar>
                <div className="flex flex-col">
                  <span
                    className="text-gray-600 text-sm cursor-pointer"
                    onClick={() => {
                      router.push(`/${content.user[0].username}`);
                    }}
                  >
                    @{content.user[0].username}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {dateFormatter(content.createdAt)}
                  </span>
                </div>
              </div>

              {/*      {content?.images && content?.images.length > 0 && (
                <img
                  className="rounded"
                  src={process.env.NEXT_PUBLIC_CDN_URL + content.images[0]}
                  alt=""
                />
              )} */}

              <span className="text-gray-600">{content.content}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}
