import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import PageLayout from "./components/layout/PageLayout";
import Home from "./page/Home";
import Collections from "./page/Collections";
import ThemeProvider from "./context/ThemeProvider";
import AuthProvider from "./context/AuthProvider";
import { HelmetProvider } from "react-helmet-async";
import Movies from "./page/Movies";
import MovieDetail from "./page/MovieDetail";
import Search from "./page/Search";
import Login from "./page/Login";
import { Toaster } from "@/components/ui/toaster";
import PageNotFound from "./page/PageNotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<PageLayout />}>
        <Route index element={<Home />} />
        <Route path="collections" element={<Collections />} />
        <Route path="search" element={<Search />} />
        <Route path="movies" element={<Movies />} />
        <Route path="movies/:movieId" element={<MovieDetail />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <HelmetProvider>
          <RouterProvider router={router} />
          <Toaster />
        </HelmetProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
