import { CheckCircleIcon, ExclamationCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import styles from "./Notification.module.css";

export default function Notification({ ...props }) {
  const { variant, infoMessage, onClose } = { ...props };

  useState(() => {
    if (variant || infoMessage) {
      setTimeout(() => onClose(), 4000);
    }
  }, [variant, infoMessage]);

  return (
    <div className={`${styles.notification} ${styles[variant]}`}>
      <div className={styles["notification__icon"]}>
        {variant === "success" ? <CheckCircleIcon /> : <ExclamationCircleIcon />}
      </div>
      <p className={styles["notification__message"]}>{infoMessage}</p>
      <button type="button" className={styles["notification__button"]} onClick={() => onClose()}>
        {<XMarkIcon className={styles["notification__button-icon"]} />}
      </button>
    </div>
  );
}
