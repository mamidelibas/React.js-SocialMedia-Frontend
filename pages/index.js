import Header from "@/components/Header";
import HeaderMobile from "@/components/Header-Mobile";
import LeftSidebar from "@/components/LeftSidebar";
import ContentArea from "@/components/ContentArea";
import RightSidebar from "@/components/RightSidebar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Cookie from "js-cookie";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    let userToken = Cookie.get("user_token");

    if (!userToken) {
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="md:block hidden">
            <Header user={user} />
          </div>

          <div className="md:hidden block">
            <HeaderMobile />
          </div>

          <div className="flex md:p-12 p-4 gap-20">
            <div className="w-1/5 md:block hidden">
              <LeftSidebar />
            </div>
            <div className="md:w-3/5 w-full">
              <ContentArea />
            </div>
            <div className="w-1/5 md:block hidden">
              <RightSidebar />
            </div>
          </div>
        </>
      )}
    </>
  );
}
