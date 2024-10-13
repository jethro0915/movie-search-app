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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<PageLayout />} end>
      <Route index element={<Home />} />
      <Route path="collections" element={<Collections />} />
      <Route path="history" element={<History />} />
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
