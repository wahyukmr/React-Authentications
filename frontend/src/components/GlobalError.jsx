/* eslint-disable react/prop-types */
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

export default function GlobalError() {
  const navigate = useNavigate();
  const errorInfo = useRouteError();

  if (!isRouteErrorResponse(errorInfo)) null;

  return (
    <div className="global-error">
      <h1>{errorInfo.status}</h1>
      <h2>{errorInfo.statusText}</h2>
      <p>{errorInfo.error?.message ?? "Something went wrong!!"}</p>
      <button onClick={() => navigate("/")}>Back to Home Page</button>
    </div>
  );
}
