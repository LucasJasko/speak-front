import { createContext, useContext, useEffect, useLayoutEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import useAPI from "~/hook/useAPI";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextType {
  accessToken: string | null | undefined;
  id: number | null | undefined;
  error: string | null;
  isLoading: boolean;
  login: (newId: number, newToken: string) => void;
  logout: () => void;
  fetchToken: () => Promise<void>;
}

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<undefined | string | null>(undefined);
  const [id, setId] = useState<undefined | number | null>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const login = (newId: number, newToken: string) => {
    setId(newId);
    setAccessToken(newToken);
    setError(null);
  };

  const logout = () => {
    setAccessToken(null);
    setId(null);
  };

  const fetchToken = async () => {
    setIsLoading(true);
    try {
      const res: any = await useAPI("/auth");
      login(res.UID, res.accessToken);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erreur d’authentification.");
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  // TODO définir message d'erreur et interpréter selon réponse

  return (
    <AuthContext
      value={{
        accessToken,
        id,
        error,
        isLoading,
        fetchToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext>
  );
};
