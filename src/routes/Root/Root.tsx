import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div 
    className="w-full h-full min-h-screen flex flex-col items-start justify-start">
      <Outlet />
    </div>
  )
}
