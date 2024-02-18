import { useEffect } from "react";
import useToken from "./useToken";

export default function useUser() {
  const [token] = useToken();

  const getPayloadFromToken = (token) => {
    if (!token) return null;
    const encodedPayload = token.split(".")[1];
    return JSON.parse(atob(encodedPayload));
  };

  const user = getPayloadFromToken(token);

  useEffect(() => {
    getPayloadFromToken(token);
    return () => {};
  }, [token]);

  return user;
}
