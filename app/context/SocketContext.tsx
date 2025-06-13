import { createContext, useContext, useEffect, type Dispatch, type ReactNode, type SetStateAction } from "react";
import useAPI from "~/hook/useAPI";
import { useAuthContext } from "./AuthContext";
import { useParams } from "react-router";

const SocketContext = createContext({});

export const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { typeID, convID } = useParams();
  const { accessToken } = useAuthContext();
  const context = {};

  useEffect(() => {
    if (accessToken) {
      async function handleConnexion() {
        const res = await useAPI("/socket", { token: accessToken });
        console.log(res);

        if (res) {
          let socket = new WebSocket("ws://localhost:8060");

          socket.onopen = (e: Event) => {
            console.log({
              type: "join",
              sender: "Browser",
              text: "Connected to the chat server",
            });
          };
          socket.onmessage = (e: Event) => {};
          socket.onclose = (e: Event) => {};
          socket.onerror = (e: Event) => {
            console.log({
              error: "Erreur de connexion",
            });
          };
        }
      }
      handleConnexion();
    }
  }, [accessToken]);

  return <SocketContext value={context}>{children}</SocketContext>;
};

export const useMobileContext = () => useContext(SocketContext);
