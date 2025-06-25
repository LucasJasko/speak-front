import type { Dispatch, SetStateAction } from "react";

export interface AuthContextType {
  accessToken: string | null | undefined;
  id: number | null | undefined;
  error: string | null;
  isLoading: boolean;
  login: (newId: number, newToken: string) => void;
  logout: () => void;
  fetchAccessToken: () => Promise<any>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
