import { createContext, useContext, useEffect, useLayoutEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import axios from "axios";
import useAPI from "~/hook/useAPI";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextType {
  accessToken: string | null | undefined;
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
  const [accessToken, setAccessToken] = useState<undefined | string | null>(undefined);
  const [id, setId] = useState<undefined | number | null>();

  const login = (newId: number, newToken: string) => {
    setId(newId);
    setAccessToken(newToken);
  };

  const logout = () => {
    setAccessToken(null);
    setId(null);
  };

  useEffect(() => {
    console.log(id);
    console.log(accessToken);
    console.log(document.cookie);

    const fetchToken = async () => {
      try {
        const res = await useAPI("/auth", { json: { access_key: accessToken, id } });
        console.log(res);

        // setToken(res.data.accessToken);
      } catch {
        // Si le token est null, alors l'utilisateur n'est pas authentifié
        // setToken(null);
      }
    };

    fetchToken();
  }, [accessToken]);

  // useLayoutEffect(() => {
  //   const authInterceptor = axios.interceptors.request.use((config: any) => {
  //     config.headers.Authorization = !config._retry && accessToken ? `Bearer ${accessToken}` : config.headers.Authorization;
  //     return config;
  //   });

  //   return () => {
  //     axios.interceptors.request.eject(authInterceptor);
  //   };
  // }, [accessToken]);

  // useLayoutEffect(() => {
  //   const refreshInterceptor = axios.interceptors.response.use(
  //     (res) => res,
  //     async (err) => {
  //       const originalRequest = err.config;

  //       if (err.response.status === 401 && err.response.data.message === "unauthorized") {
  //         try {
  //           const res = await axios.get("api/refreshToken");

  //           setAccessToken(res.data.accessToken);

  //           originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
  //           originalRequest._retry = true;

  //           return axios(originalRequest);
  //         } catch {
  //           setAccessToken(null);
  //         }
  //       }

  //       return Promise.reject(err);
  //     }
  //   );

  //   return () => {
  //     axios.interceptors.response.eject(refreshInterceptor);
  //   };
  // }, [accessToken]);

  return <AuthContext value={{ accessToken, id, login, logout }}>{children}</AuthContext>;
};
