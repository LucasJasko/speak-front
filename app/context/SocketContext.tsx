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
  const { typeID, convID } = useParams();
  const { accessToken, id } = useAuthContext();
  const { name, surname } = useSettingsContext();

  const socketRef = useRef<WebSocket | null>(null);

  const [openMessage, setOpenMessage] = useState<null | messageContent>(null);
  const [closeMessage, setCloseMessage] = useState<null | messageContent>(null);
  const [errorMessage, setErrorMessage] = useState<null | messageContent>(null);
  const [newMessage, setNewMessage] = useState<null | messageContent>(null);

  const context: SocketContextContent = { openMessage, closeMessage, errorMessage, newMessage, setNewMessage, socketRef };

  useEffect(() => {
    if (!accessToken) return;

    async function handleConnexion() {
      const res = await useAPI("/socket", { token: accessToken });
      console.log(res);

      if (res) {
        let socket = new WebSocket("ws://localhost:8060");
        socketRef.current = socket;

        socket.onopen = (e: Event) => {
          setOpenMessage({
            messageInfos: {
              date: Date.now().toString(),
              type: "join",
              sender: name + " " + surname,
            },
            authorName: "Speak",
            authorMessage: {
              messageText: "Connexion établie",
            },
          });
        };
        socket.onmessage = (e: MessageEvent) => {
          console.log("nouveau message");

          setNewMessage(JSON.parse(e.data));
        };

        socket.onclose = (e: CloseEvent) => {
          console.log("Connexion socket fermée", e);
          setCloseMessage(null);
          // "Fermeture de la connexion."
        };

        socket.onerror = (e: Event) => {
          console.error("Erreur WebSocket", e);
          setErrorMessage(null);
          // "Erreur de communication avec le serveur."
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

  return <SocketContext value={context}>{children}</SocketContext>;
};

export const useSocketContext = () => useContext(SocketContext);
