import { createContext, useContext, useEffect, useLayoutEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { useNavigate } from "react-router";
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
  const navigate = useNavigate();
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

  useEffect(() => {
    fetchToken();
  }, []);

  useEffect(() => {
    // TODO Vérifier si le refresh token corrspond bien à celui stocké en bae
    // TODO vérifier lors de l'accès à l'appli si il y a un refresh token. Si oui alors le comparer à celui stocké en base, et donc connecter directement.
    if (accessToken === null && !isLoading) {
      navigate("/auth");
    }
  }, [accessToken, isLoading]);

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
