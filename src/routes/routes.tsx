import { createBrowserRouter } from "react-router-dom";

// Root
import Root from "./Root";

// Pages
import Home from "../pages/home";
import CarbonFootPrint from "@/pages/carbonfootprint";
import InteractiveQA from "@/pages/interactiveqa";
import Pledge from "@/pages/pledge";

// Test
import Test from "@/pages/test";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/carbonfootprint",
        element: <CarbonFootPrint />
      },
      {
        path: "/interactive-qa",
        element: <InteractiveQA />
      },
      {
        path: "/pledge",
        element: <Pledge />
      },


      // Test
      {
        path: "/test",
        element: <Test />
      }
    ]
  }
]);