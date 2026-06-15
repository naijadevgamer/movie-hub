import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import ErrorBoundary from "../components/common/ErrorBoundary";
import HomePage from "../pages/HomePage";
import SearchPage from "../pages/SearchPage";
import MovieDetailsPage from "../pages/MovieDetailsPage";
import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <DashboardLayout />
      </ErrorBoundary>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/search",
    element: (
      <ErrorBoundary>
        <SearchPage />
      </ErrorBoundary>
    ),
  },
  {
    path: "/movie/:id",
    element: (
      <ErrorBoundary>
        <MovieDetailsPage />
      </ErrorBoundary>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
