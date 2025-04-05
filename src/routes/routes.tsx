import { createBrowserRouter } from "react-router-dom";

// Root
import Root from "./Root";

// Pages
import Home from "../pages/home";
import CarbonFootPrint from "@/pages/carbonfootprint";
import Answers from "@/pages/carbonfootprint/components/answers";
import Questions from "@/pages/carbonfootprint/components/questions";
import InteractiveQA from "@/pages/interactiveqa";

// Test
import Test from "@/pages/test";
import QANew from "@/pages/qanew";

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
        children: [
          {
            path: "/carbonfootprint",
            element: <CarbonFootPrint />
          },
          {
            path: "/carbonfootprint/questions",
            element: <Questions />
          },
          {
            path: "/carbonfootprint/answers",
            element: <Answers />
          }
        ]
      },
      {
        path: "/interactive-qa",
        element: <InteractiveQA />
      },

      // Test
      {
        path: "/test",
        element: <Test />
      },
      {
        path: "/qanew",
        element: <QANew />,
      }
    ]
  }
]);