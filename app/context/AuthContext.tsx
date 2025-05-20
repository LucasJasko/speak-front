import { createContext, useContext } from "react";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth doit être utilisé dans AuthProvider");
  }

  return authContext;
};
