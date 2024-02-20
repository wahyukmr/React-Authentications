/* eslint-disable react/prop-types */
import { ShieldExclamationIcon } from "@heroicons/react/20/solid";
import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router-dom";
import styles from "./GlobalError.module.css";

export default function GlobalError() {
  const navigate = useNavigate();
  const errorInfo = useRouteError();

  if (!isRouteErrorResponse(errorInfo)) return null;

  return (
    <div className={styles["global-error"]}>
      <ShieldExclamationIcon className={styles["global-error__icon"]} />
      <h1 className={styles["global-error__h1"]}>{errorInfo.status}</h1>
      <h2>{errorInfo.statusText}</h2>
      <p>{errorInfo.error?.message ?? "Something went wrong!!"}</p>
      <button
        className={styles["global-error__button"]}
        type="button"
        onClick={() => navigate("/")}
      >
        Back to Home Page
      </button>
    </div>
  );
}
