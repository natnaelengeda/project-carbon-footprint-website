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

  useEffect(() => {
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
  }, []);

  const checkPledge = () => {
    const localSot = localStorage.getItem("page_type");

    if (localSot == "pledge") {
      return null;
    } else {
      if (location.pathname == "/pledge") {
        console.log(location)
        navigate("/pledge");
        localStorage.setItem("page_type", "pledge");
      }
    }
  }

  const changeCarbonFootprintPage = () => {
    console.log(location.pathname);
    const queryParams = new URLSearchParams(location.search);
    const room = queryParams.get('room');

    if (room) {
      if (location.pathname == "/carbonfootprint/questions") {
        localStorage.setItem("page_type", "carbonfootprint");
        localStorage.setItem("page_mode", "questions");
        localStorage.setItem("room", room);

        socket?.emit("page_mode", JSON.stringify({
          page_type: "carbonfootprint",
          page_mode: "questions",
          unique_code: room
        }));
      }

      if (location.pathname == "/carbonfootprint/answers") {
        localStorage.setItem("page_type", "carbonfootprint");
        localStorage.setItem("page_mode", "answers");
        localStorage.setItem("room", room);

        socket?.emit("page_mode", JSON.stringify({
          page_type: "carbonfootprint",
          page_mode: "answers",
          unique_code: room
        }));
      }

    }
  }

  const checkPledgeStat = () => {
    if (location.pathname == "/pledgeStat") {
      localStorage.setItem("page_type", "pledgeStat");
      navigate("/pledgeStat");
    }
  }

  useEffect(() => {
    checkPledge();
    changeCarbonFootprintPage();
    checkPledgeStat();
  }, [location.pathname]);

  return (
    <div
      className="relative w-full h-full min-h-screen flex flex-col items-start justify-start">
      <Outlet />
      <Devools />
    </div>
  )
}
