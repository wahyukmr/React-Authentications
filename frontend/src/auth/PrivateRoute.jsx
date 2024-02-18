import { Navigate } from "react-router-dom";
import useUser from "./useUser";

// eslint-disable-next-line react/prop-types
export default function PrivateRoute({ userElement }) {
  const isLoggedIn = useUser();

  return isLoggedIn ? userElement : <Navigate to={"login"} replace />;
}
