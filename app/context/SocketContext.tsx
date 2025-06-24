import { createContext, useContext, useEffect, useRef, useState, type Dispatch, type ReactNode, type RefObject, type SetStateAction } from "react";
import useAPI from "~/hook/useAPI";
import { useAuthContext } from "./AuthContext";
import { useParams } from "react-router";
import type { messageContent } from "~/components/MessageArea/Message/Message";
import { useSettingsContext } from "./SettingsContext";

const noop = () => {};
const SocketContext = createContext<SocketContextContent>({
  openMessage: null,
  closeMessage: null,
  errorMessage: null,
  newMessage: null,
  setNewMessage: noop,
  socketRef: null,
});

interface SocketContextContent {
  socketRef: RefObject<WebSocket | null> | null;
  openMessage: null | messageContent;
  closeMessage: null | messageContent;
  errorMessage: null | messageContent;
  newMessage: null | messageContent;
  setNewMessage: Dispatch<SetStateAction<null | messageContent>>;
}

export const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { accessToken, id } = useAuthContext();
  const socketRef = useRef<WebSocket | null>(null);

  const [openMessage, setOpenMessage] = useState<null | messageContent>(null);
  const [closeMessage, setCloseMessage] = useState<null | messageContent>(null);
  const [errorMessage, setErrorMessage] = useState<null | messageContent>(null);
  const [newMessage, setNewMessage] = useState<null | messageContent>(null);

  useEffect(() => {
    if (!accessToken) return;

    async function handleConnexion() {
      const res = await useAPI("/socket", { token: accessToken });
      console.log(res);

      if (res) {
        let socket = new WebSocket("ws://localhost:8060");
        socketRef.current = socket;

        socket.onopen = (e: Event) => {
          const message = {
            messageInfos: {
              isFromSocket: true,
              date: Date.now().toString(),
              type: "join",
              sender: id?.toString(),
            },
            authorName: "Speak",
            authorSurname: "",
            authorMessage: {
              messageText: "Connexion établie",
            },
          };
          setOpenMessage(message);
          if (socketRef.current?.OPEN) {
            socketRef.current?.send(JSON.stringify(message));
          }
        };

        socket.onmessage = (e: MessageEvent) => {
          setNewMessage(JSON.parse(e.data));
        };

        socket.onclose = (e: CloseEvent) => {
          const message = {
            messageInfos: {
              isFromSocket: true,
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
          const message = {
            messageInfos: {
              isFromSocket: true,
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

      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.close(1000, "Client déconnecté");
      }
    }
    handleConnexion();
  }, [accessToken]);

  const context: SocketContextContent = { openMessage, closeMessage, errorMessage, newMessage, setNewMessage, socketRef };

  return <SocketContext value={context}>{children}</SocketContext>;
};

export const useSocketContext = () => useContext(SocketContext);
