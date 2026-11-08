import { createBrowserRouter } from "react-router-dom";

import { HomePage } from "../pages/home/HomePage";
import { HistoryPage } from "../pages/history/HistoryPage";
import { CreatePage } from "../pages/create/ui/CreatePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/history",
    element: <HistoryPage />,
  },
  {
    path: "/create",
    element: <CreatePage />,
  },
]);