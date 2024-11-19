import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import PageLayout from "./components/layout/PageLayout";
import Home from "./page/Home";
import Collections from "./page/Collections";
import History from "./page/History";
import ThemeProvider from "./context/ThemeProvider";
import MovieDetail from "./page/MovieDetail";
import Search from "./page/Search";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<PageLayout />} end>
      <Route index element={<Home />} />
      <Route path="collections" element={<Collections />} />
      <Route path="history" element={<History />} />
      <Route path="search" element={<Search />} />
      <Route path="movies/:movieId" element={<MovieDetail />} />
    </Route>
  )
);

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
