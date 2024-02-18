import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import GlobalError from "./components/GlobalError";
import LogInPage from "./pages/LogIn";
import Root from "./pages/Root";
import SignUpPage from "./pages/SignUp";
import UserInfoPage from "./pages/UserInfo";

export default function MainRoutes() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} errorElement={<GlobalError />}>
        <Route
          index={true}
          element={<PrivateRoute userElement={<UserInfoPage />} />}
        />
        <Route path="login" element={<LogInPage />} />
        <Route path="signup" element={<SignUpPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}
