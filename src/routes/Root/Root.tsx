import Devools from "@/tools/Devools";
import { useEffect } from "react";
import toast from "react-hot-toast";

import { Outlet, useNavigate } from "react-router-dom";

export default function Root() {
  const navigate = useNavigate();

  useEffect(() => {
    const page = localStorage.getItem("page_type");

    if (page == "carbonfootprint") {
      navigate("/carbonfootprint");
    } else if (page == "pledge") {
      navigate("/pledge");
    } else if (page == "interactive-qa") {
      navigate("/interactive-qa");
    }
    if (page == null) {
      toast("Choose from the Options Bellow");
      navigate("/");
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
