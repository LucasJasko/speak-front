import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import useAPI from "~/hook/useAPI";

export const AuthProvider = ({ children }: any) => {
  // ici le accessToken de navigation coté front stocké dans la mémoire PC de l'utilisateur, plus safe que via cookies
  const [token, setToken] = useState<any>(undefined);
  // Le token par défaut n'est pas définit donc une requête doit être envoyé pour déterminer son statut

  useEffect(() => {
    const fetchMe = async () => {
      try {
        // La requête de récupération du token reste à écrire
        const res = await axios.get("mon/api");
        // Si le token est défini alors l'utilisateur est authentifié
        setToken(res);
      } catch {
        // Si le token est null, alors l'utilisateur n'est pas authentifié
        setToken(null);
      }
    };

    fetchMe();
  }, []);

  // LayoutEffect ici en tant qu'intercepteur bloque le reste du rendu si les conditions ne sont pas remplies
  useLayoutEffect(() => {
    const authInterceptor = axios.interceptors.request.use((config): any => {
      // config.headers.Authorization = !config._retry && token ? `Bearer ${token}` : config.headers.Authorization;
      return config;
    });

    return () => {
      axios.interceptors.request.eject(authInterceptor);
    };
  }, [token]);
};
