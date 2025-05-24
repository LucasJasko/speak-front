import { createContext, useContext, useEffect, useLayoutEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import axios from "axios";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextType {
  token: string | null | undefined;
  id: number | null | undefined;
  login: (newId: number, newToken: string) => void;
  logout: () => void;
}

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<undefined | string | null>(undefined);
  const [id, setId] = useState<undefined | number | null>();

  const login = (newId: number, newToken: string) => {
    setId(newId);
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
    setId(null);
  };

  useEffect(() => {
    // TODO IL FAUT QUAND MEME STOCKER LE TOKEN EN COOKIE HTTP ONLY
    const fetchToken = async () => {
      // const res = await axios
      //   .get("http://alert-mns-back/api/auth", {
      //     withCredentials: true,
      //   })
      //   .then((response) => console.log(response));
      try {
        // La requête de récupération du token reste à écrire
        // console.log(res);
        // Si le token est défini alors l'utilisateur est authentifié
        // setToken(res.data.accessToken);
      } catch {
        // Si le token est null, alors l'utilisateur n'est pas authentifié
        // setToken(null);
      }
    };

    fetchToken();
  }, []);

  // LayoutEffect ici en tant qu'intercepteur bloque le reste du rendu si les conditions ne sont pas remplies
  useLayoutEffect(() => {
    const authInterceptor = axios.interceptors.request.use((config: any) => {
      config.headers.Authorization = !config._retry && token ? `Bearer ${token}` : config.headers.Authorization;
      return config;
    });

    return () => {
      axios.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = axios.interceptors.response.use(
      (res) => res,
      async (err) => {
        const originalRequest = err.config;

        if (err.response.status === 401 && err.response.data.message === "unauthorized") {
          try {
            const res = await axios.get("api/refreshToken");

            setToken(res.data.accessToken);

            originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
            originalRequest._retry = true;

            return axios(originalRequest);
          } catch {
            setToken(null);
          }
        }

        return Promise.reject(err);
      }
    );

    return () => {
      axios.interceptors.response.eject(refreshInterceptor);
    };
  }, [token]);

  return <AuthContext value={{ token, id, login, logout }}>{children}</AuthContext>;
};
