import PublishArea from "./ContentAreaComponents/PublishArea";
import PostCard from "./ContentAreaComponents/PostCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { dateFormatter } from "@/utils/dateFormatter";
import { useSelector, useDispatch } from "react-redux";
//import Pagination from '@mui/material/Pagination';
import InfiniteScroll from "react-infinite-scroll-component";
import { useRef } from "react";
import Cookie from "js-cookie";

export default function ContentArea() {
  const [contentData, setContentData] = useState([]);
  const dispatch = useDispatch();
  const contentPing = useSelector((state) => state.contentPing.renew);
  const searchValue = useSelector((state) => state.search.search);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const refElm = useRef(null);

  const getMoreContent = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/publications?search=${searchValue}&page=${
          currentPage + 1
        }`,
        {
          headers: {
            Authorization: `Bearer ${Cookie.get("user_token")}`,
          },
        }
      );

      if (response.status === 200) {
        setContentData((prevData) => [
          ...prevData,
          ...response.data.publications,
        ]);

        setCurrentPage((prevPage) => prevPage + 1);
        setHasMore(currentPage < totalPageCount);
      }
    } catch (e) {
      setHasMore(false);
    }
  };

  /*   const handleChange = (event, value) => {
    setCurrentPage(value);
  }; */

  useEffect(() => {
    const getContents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/publications?search=${searchValue}&page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${Cookie.get("user_token")}`,
            },
          }
        );

        if (response.status === 200) {
          console.log(response.data);
          setContentData(response.data.publications);
          setTotalPageCount(response.data.totalPages);
          dispatch({
            type: "REFETCH_CONTENT",
            payload: false,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (contentPing) {
      getContents();
    }
  }, [contentPing]);

  const handleClick = (e) => {
    console.log("tıklandı");
  };

  useEffect(() => {
    refElm.current.addEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    const getContents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/publications?search=${searchValue}&page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${Cookie.get("user_token")}`,
            },
          }
        );

        if (response.status === 200) {
          setContentData(response.data.publications);
          setTotalPageCount(response.data.totalPages);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getContents();
  }, [searchValue]);

  return (
    <div ref={refElm}>
      <PublishArea />

      <InfiniteScroll
        dataLength={contentData?.length}
        next={() => getMoreContent()}
        hasMore={hasMore}
        loader={
          hasMore && (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          )
        }
      >
        {contentData?.map((content) => {
          return (
            <PostCard
              avatar="C"
              fullname={content.user[0].name + " " + content.user[0].lastname}
              username={content.user[0].username}
              createdOn={dateFormatter(content.createdAt)}
              content={content.content}
              contentId={content.id}
              likeCount={content?.likes?.length || 0}
              commentCount={0}
              image={content.images}
              embedVideo={content.embedVideo}
              likes={content.likes}
            />
          );
        })}
      </InfiniteScroll>
      {/*  <Pagination count={totalPageCount} page={currentPage} onChange={handleChange} className="mt-10" /> */}
    </div>
  );
}
