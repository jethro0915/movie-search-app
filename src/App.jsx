import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import PageLayout from "./components/layout/PageLayout";
import Home from "./page/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<PageLayout />} end>
      <Route index element={<Home />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
