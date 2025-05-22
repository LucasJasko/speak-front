import { createContext, useContext, useEffect, useLayoutEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import axios from "axios";

const AuthContext = createContext({ token: undefined });

interface AuthContextContent {
  id: any;
  setId: Dispatch<SetStateAction<any>>;
  token: any;
  setToken: Dispatch<SetStateAction<any>>;
}

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth doit être utilisé dans AuthProvider");
  }

  return authContext;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // ici le accessToken de navigation coté front stocké dans la mémoire PC de l'utilisateur, plus safe que via cookies
  const [token, setToken] = useState<undefined | null | string>(undefined);
  const [id, setId] = useState();
  const context: AuthContextContent = { id, setId, token, setToken };
  // Le token par défaut n'est pas définit donc une requête doit être envoyé pour déterminer son statut

  useEffect(() => {
    const fetchToken = async () => {
      try {
        // La requête de récupération du token reste à écrire
        const res = await axios.get("mon/api");
        // Si le token est défini alors l'utilisateur est authentifié
        setToken(res.data.accessToken);
      } catch {
        // Si le token est null, alors l'utilisateur n'est pas authentifié
        setToken(null);
      }
    };

    fetchToken();
  }, []);

  // LayoutEffect ici en tant qu'intercepteur bloque le reste du rendu si les conditions ne sont pas remplies
  useLayoutEffect(() => {
    const authInterceptor = axios.interceptors.request.use((config): any => {
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

        if (err.response.status === 403 && err.response.data.message === "unauthorized") {
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
  });

  return <AuthContext value={context}>{children}</AuthContext>;
};

export const useAuthContext = () => useContext(AuthContext);
