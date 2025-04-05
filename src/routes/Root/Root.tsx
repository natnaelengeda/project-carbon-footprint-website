import { useEffect } from "react";
import { useSocket } from "@/context/SocketProvider";

// Tools
import Devools from "@/tools/Devools";

import { Outlet, useNavigate, useLocation, } from "react-router-dom";

// Toast
import toast from "react-hot-toast";

export default function Root() {
  const navigate = useNavigate();
  const location = useLocation();
  const socket = useSocket();
  const queryParams = new URLSearchParams(location.search);
  const room = queryParams.get('room');

  useEffect(() => {
    if (location.pathname != "/") {
      switch (location.pathname) {
        case "interactive-qa":
          navigate("/interactive-qa");
          localStorage.setItem("page_type", "interactive-qa");
          return;
        case "/carbonfootprint/questions":
          if (room) {
            localStorage.setItem("room", room);
          }
          localStorage.setItem("page_type", "carbonfootprint");
          localStorage.setItem("page_mode", "questions");
          socket?.emit("page_mode", JSON.stringify({
            page_type: "carbonfootprint",
            page_mode: "questions",
            unique_code: room
          }));
          navigate("/carbonfootprint/questions");
          return;
        case "/carbonfootprint/answers":
          if (room) {
            localStorage.setItem("room", room);
          }
          localStorage.setItem("page_type", "carbonfootprint");
          localStorage.setItem("page_mode", "answers");
          socket?.emit("page_mode", JSON.stringify({
            page_type: "carbonfootprint",
            page_mode: "answers",
            unique_code: room
          }));
          navigate("/carbonfootprint/answers");
          return;
        case "/pledge":
          navigate("/pledge");
          localStorage.setItem("page_type", "pledge");
          return;
        case "/qanew":
          navigate("/qanew");
          localStorage.setItem("page_type", "qanew");
          return;
        default:
          break;
      }

    } else {
      const page = localStorage.getItem("page_type");
      const mode = localStorage.getItem("page_mode");

      if (page == "carbonfootprint") {
        if (mode == "questions") {
          navigate("/carbonfootprint/questions");
        } else if (mode == "answers") {
          navigate("/carbonfootprint/answers");
        }
        // navigate("/carbonfootprint");
      } else if (page == "pledge") {
        navigate("/pledge");
      } else if (page == "interactive-qa") {
        navigate("/interactive-qa");
      } else if (page == "pledgeStat") {
        navigate("/pledgeStat");
      }

      if (page == null) {
        toast("Choose from the Options Bellow");
        navigate("/");
      }
    }
  }, []);


  return (
    <div
      className="relative w-full h-full min-h-screen flex flex-col items-start justify-start">
      <Outlet />
      <Devools />
    </div>
  )
}
