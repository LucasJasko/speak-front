import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import useAPI from "~/hook/useAPI";
import { useAuthContext } from "./AuthContext";
import type { messageContent } from "~/interfaces/MessageContent";
import type { SocketContextContent } from "~/interfaces/SocketContextContent";
import { useParams } from "react-router";

const SocketContext = createContext<SocketContextContent>({
  openMessage: null,
  closeMessage: null,
  errorMessage: null,
  newMessage: null,
  setNewMessage: () => {},
  socketRef: null,
});

export const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { accessToken, id } = useAuthContext();
  const { convID } = useParams();
  const socketRef = useRef<WebSocket | null>(null);

  const [openMessage, setOpenMessage] = useState<null | messageContent>(null);
  const [closeMessage, setCloseMessage] = useState<null | messageContent>(null);
  const [errorMessage, setErrorMessage] = useState<null | messageContent>(null);
  const [newMessage, setNewMessage] = useState<null | messageContent>(null);

  useEffect(() => {
    if (!accessToken) return;

    async function handleConnexion() {
      const res = await useAPI("/socket", { token: accessToken });

      if (res) {
        let socket = new WebSocket("ws://localhost:8060");
        socketRef.current = socket;

        socket.onopen = (e: Event) => {
          const message: messageContent = {
            messageInfos: {
              date: Date.now().toString(),
              type: "join",
              sender: id?.toString(),
              target: convID?.toString(),
            },
            authorName: "Speak",
            authorSurname: "",
            authorMessage: {
              messageText: "Connexion établie",
            },
          };

          console.log("Connexion socket ouverte", e);
          setOpenMessage(message);
          socketRef.current?.send(JSON.stringify(message));
        };

        socket.onmessage = (e: MessageEvent) => {
          setNewMessage(JSON.parse(e.data));
        };

        socket.onclose = (e: CloseEvent) => {
          const message: messageContent = {
            messageInfos: {
              date: Date.now().toString(),
              type: "close",
              sender: id?.toString(),
            },
            authorName: "Speak",
            authorSurname: "",
            authorMessage: {
              messageText: "Connexion socket fermée",
            },
          };

          console.log("Connexion socket fermée", e);
          setCloseMessage(message);
        };

        socket.onerror = (e: Event) => {
          const message: messageContent = {
            messageInfos: {
              date: Date.now().toString(),
              type: "error",
              sender: id?.toString(),
            },
            authorName: "Speak",
            authorSurname: "",
            authorMessage: {
              messageText: "Erreur WebSocket",
            },
          };

          console.error("Erreur WebSocket", e);
          setErrorMessage(message);
        };
      }

      window.addEventListener("beforeunload", () => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
          socketRef.current.close(1001, "Page rechargée ou fermée");
        }
      });

      return () => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
          socketRef.current.close(1000, "Client déconnecté");
        }
      };
    }

    handleConnexion();
  }, [accessToken]);

  const context: SocketContextContent = { openMessage, closeMessage, errorMessage, newMessage, setNewMessage, socketRef };

  return <SocketContext value={context}>{children}</SocketContext>;
};

export const useSocketContext = () => useContext(SocketContext);
