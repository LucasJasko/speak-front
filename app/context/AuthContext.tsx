import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";
import useAPI from "~/hook/useAPI";
import type { AuthContextType } from "~/interfaces/AuthContextType";
import type { LoginResponse } from "~/interfaces/LoginResponse";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  let location = useLocation();
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState<undefined | string | null>(undefined);
  const [id, setId] = useState<number>(0);
  const [keyPair, setKeyPair] = useState<CryptoKeyPair | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  const login = (newId: number, newToken: string) => {
    setId(newId);
    setAccessToken(newToken);
    setError(null);
  };

  const logout = () => {
    setAccessToken(null);
    setId(0);
  };

  const fetchAccessToken = async () => {
    setIsLoading(true);
    try {
      const { data } = await useAPI<LoginResponse>("/auth");
      setId(data.UID);
      setAccessToken(data.accessToken);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erreur d’authentification.");
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (location.pathname != "/auth") {
      fetchAccessToken();
    }
  }, []);

  useEffect(() => {
    // TODO window.crypto n'est accessible que via https, donc à terme trouver un moyen de mettre en place d'encoder les messages coté client
    const generate = async () => {
      // const pair = await window.crypto.subtle.generateKey(
      //   {
      //     name: "RSA-OAEP",
      //     modulusLength: 2048,
      //     publicExponent: new Uint8Array([1, 0, 1]),
      //     hash: "SHA-256",
      //   },
      //   true,
      //   ["encrypt", "decrypt"]
      // );
      // setKeyPair(pair);
      // console.log(pair);
    };
    generate();

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
        fetchAccessToken,
        login,
        logout,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext>
  );
};
